---
title: Service クラス
category: php
createdAt: 2025-10-12
updatedAt: 2026-10-03
sortNumber: 502
path: "/documents/ghostphp/502_service_class"
---

<nuxt-content-wrapper>

`Service` クラスは、アプリケーションのサービス層を形成する基底クラスであり、トランザクション制御を提供する。

> v4.0での変更点:
> - `render()` メソッドは廃止された（テンプレート描画はControllerの責務。[501_service_template.md](501_service_template.md)参照）
> - コンストラクタで `Session` を生成しなくなった（必要なら継承先のコンストラクタでDI注入する）
> - `setToken()` / `checkToken()` は **`@deprecated`**。CSRF関連の実装は `Controller` 側（[305_controller_class.md](305_controller_class.md)）に移動しており、Service側のメソッドは後方互換のために残されているだけである（2026年末に削除予定）
> - トランザクションが**入れ子に対応**した。DB接続がリクエスト内で1本に共有されるようになったため（[401_database_connect.md](401_database_connect.md)）、
>   あるServiceがトランザクション中に別のServiceを呼んだ場合、内側のServiceは外側のトランザクションに参加し、確定・取り消しは外側（開始したService）だけが行う
> - DBエラーは Repository から例外のまま投げられる。エラー処理とロールバックは Service の責務である（[402_repository_class.md](402_repository_class.md)）

## 1. コード

```php
<?php

namespace app\aura;

use app\aura\Template;
use app\aura\Repository;
use app\aura\utils\Session;

class Service {
    private Repository $repository;
    private bool $ownsTransaction = false;

    public function __construct() {
        $this->repository = new Repository();
    }

    /**
     * @deprecated Moved to Controller::setToken(). This method will be removed by the end of 2026.
     */
    public function setToken(string $form_name): string {
        $csrf_token = bin2hex(random_bytes(32));
        $_SESSION['csrf_token'][$form_name] = $csrf_token;
        return $csrf_token;
    }

    /**
     * @deprecated Moved to Controller::checkToken(). This method will be removed by the end of 2026.
     */
    public function checkToken(string $form_name): bool {
        if (!isset($_SESSION['csrf_token'][$form_name])) {
            return false;
        }
        return $_POST["csrf_token"] === $_SESSION['csrf_token'][$form_name];
    }

    public function beginTransaction(): bool {
        $pdo = $this->repository->getPdo();

        if ($pdo->inTransaction()) {
            return false; // 外側のトランザクションに参加する
        }

        $pdo->beginTransaction();
        $this->ownsTransaction = true;
        return true;
    }

    public function commit(): bool {
        if (!$this->ownsTransaction) {
            return false; // 自分が開始したトランザクションではない
        }

        $this->repository->getPdo()->commit();
        $this->ownsTransaction = false;
        return true;
    }

    public function rollBack(): bool {
        if (!$this->ownsTransaction) {
            return false; // 自分が開始したトランザクションではない
        }

        $pdo = $this->repository->getPdo();
        // 既に終了している場合に二重ロールバックで落ちないようにする
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        $this->ownsTransaction = false;
        return true;
    }
}
```

## 2. コード説明
- プロパティ
  - `$repository`
    - `Repository` インスタンスを保持し、トランザクション処理時にPDOを直接操作する（PDOはリクエスト内で共有されているため、他の全Repositoryと同じ接続）
  - `$ownsTransaction`
    - 現在のトランザクションを**このインスタンスが開始したか**を表すフラグ。`commit()` / `rollBack()` を実行してよいかの判定に使う

- メソッド
  - `__construct()`
    - `Repository` を初期化する（`getPdo()` 経由でトランザクション制御に使うため）
  - `setToken($form_name)` / `checkToken($form_name)`
    - **非推奨**。新規実装では `Controller::setToken()` / `Controller::checkToken()` を使うこと
  - `beginTransaction()`
    - PDOのトランザクションを開始し、処理をアトミックにする。開始した場合は `true` を返す
    - 共有接続で既にトランザクションが始まっている場合（外側のServiceが開始済みなど）は、新たに開始せずそれに参加し、`false` を返す
  - `commit()`
    - 自分が開始したトランザクションを確定する。参加しているだけの場合は何もせず `false` を返す（確定は外側のServiceに任せる）
  - `rollBack()`
    - 自分が開始したトランザクションをロールバックし、一貫性を保持する。参加しているだけの場合は何もせず `false` を返す
    - 内側のServiceで失敗した場合は、`rollBack()` ではなく例外を投げて外側に知らせ、外側のServiceがロールバックする
    - トランザクションが既に終了している場合でも、二重ロールバックでエラーにならないようにしている

- 入れ子の例
  ```php
  // 外側: PostService::create() が beginTransaction() → true（開始した）
  //   内側: 別のServiceが beginTransaction() → false（参加）
  //         内側の commit() → false（何もしない）
  // 外側: commit() → true（ここで内側の更新も含めてまとめて確定）
  //       失敗時は外側の rollBack() で、内側の更新も含めてまとめて取り消し
  ```

## 3. 使い方 / 利用例
基底クラス `Service` を継承する。v4.0ではコンストラクタで依存（Repository・Logger・Session等）をDIで受け取るのが標準スタイルである。

```php
<?php

namespace app\services;

use app\aura\Service;
use app\aura\Logger;
use app\aura\https\Redirect;
use app\aura\utils\Session;
use app\requests\PostRequest;
use app\entities\PostEntity as Post;
use app\repositories\PostRepository;
use app\repositories\UserRepository;

class PostService extends Service {

    public function __construct(
        private Logger $logger,
        private PostRepository $postRepository,
        private UserRepository $userRepository,
        private Session $session
    ) {
        parent::__construct();
    }

    public function create(PostRequest $postRequest): bool {
        $this->beginTransaction();

        try {
            $post = $this->makePost($postRequest);
            $result = $this->postRepository->createPost($post);

            if (!$result) {
                throw new \Exception('Post creation failed.');
            }

            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->rollBack();
            $this->logger->error($e->getMessage());
            return false;
        }
    }

    public function makePost(PostRequest $postRequest): Post {
        $post = new Post();

        if (!empty($postRequest->input('id'))) {
            $post->setId($postRequest->input('id'));
        }
        $post->setUserId($postRequest->input('user_id'));
        $post->setTitle($postRequest->input('title'));
        $post->setBody($postRequest->input('body'));

        return $post;
    }
}
```

- サービスの戻り値（`bool` / `array` / `Entity`）は Controller 側で受け取り、画面描画やリダイレクトの判断に使う。**画面遷移（`Redirect::to()`）の判断はControllerに委ねる。** 以前は `PostService::index()` が未サインイン時に `Redirect::to()` の戻り値（`null`）を返していたが、Controller側では「未サインイン」と「投稿0件（空配列）」を区別できず、0件のときもサインイン画面へ飛ばしてしまっていた。現在はサインイン判定をControllerで行い、Serviceは常に配列を返す。
- コンストラクタ引数は `Router::make()` が再帰的にDI解決するため、コントローラーからServiceを `new` する必要はない（[304_router_class.md](304_router_class.md)）。

#### ■ POST処理時のトランザクション制御（トークン検証はController側で実施済みという前提）
```php
public function create(PostRequest $postRequest): bool {
    $this->beginTransaction();

    try {
        $post = $this->makePost($postRequest);
        $result = $this->postRepository->createPost($post);

        if (!$result) {
            throw new \Exception('Post creation failed.');
        }

        $this->commit();
        return true;
    } catch (\Exception $e) {
        $this->rollBack();
        return false;
    }
}
```

</nuxt-content-wrapper>
