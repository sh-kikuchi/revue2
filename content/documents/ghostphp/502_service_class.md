---
title: Service クラス
category: php
createdAt: 2025-10-12
updatedAt: 2025-10-12
sortNumber: 502
path: "/documents/ghostphp/502_service_class"
---

<nuxt-content-wrapper>

`Service` クラスは、アプリケーションのサービス層を形成する基底クラスであり、  セッション管理、CSRFトークン発行、テンプレート描画、トランザクション制御といった  アプリ全体で共通する機能を提供する。

## 1. コード

```php
<?php

namespace app\aura;

use app\aura\Template;
use app\aura\Repository;
use app\aura\utils\Session;

class Service {

    private Repository $repository;

    private bool $inTransaction = false;

    public function __construct() {
        $this->repository = new Repository(); 
        $session  = new Session();
    }

    function setToken(string $form_name): string {
        $csrf_token = bin2hex(random_bytes(32));
        $_SESSION['csrf_token'][$form_name] = $csrf_token;

        return $csrf_token;
    }

    function checkToken(string $form_name): bool {
        if (!isset($_SESSION['csrf_token'][$form_name])) {
            return false;
        }

        return $_POST["csrf_token"] === $_SESSION['csrf_token'][$form_name];
    }

    function render(): mixed {
        $template = new Template;

        return $template->render();
    }
    
    public function beginTransaction(): bool {
        if ($this->inTransaction) {
            return false;
        }

        $this->repository->getPdo()->beginTransaction();
        $this->inTransaction = true;
        return true;
    }

    public function commit(): bool {
        if (!$this->inTransaction) {
            return false;
        }

        $this->repository->getPdo()->commit();
        $this->inTransaction = false;
        return true;
    }

    public function rollBack(): bool {
        if (!$this->inTransaction) {
            return false;
        }

        $this->repository->getPdo()->rollBack();
        $this->inTransaction = false;
        return true;
    }

}
```

## 2. コード説明
- プロパティ
  - $repository
    - Repositoryインスタンスを保持。
    - トランザクション処理時にPDOを直接操作する。
  - $inTransaction
    - トランザクション中かどうかを判定するフラグ。

- メソッド
  - __construct()
    - RepositoryとSessionを初期化。
  
  - setToken($form_name)
    - 指定フォーム名に紐づくCSRFトークンを生成。
    - $_SESSION['csrf_token'][$form_name] に格納する。
    - 
  - checkToken($form_name)
    - POSTされたトークンとセッション内トークンを照合。
    - 不正アクセスや二重送信を防ぐ。

  - render()
    - Templateクラスを利用してビューファイルを描画。
    - コントローラから直接HTMLを返す用途に使用。
  
  - beginTransaction()
    - PDOのトランザクションを開始し、処理をアトミックにする。
    - $inTransactionがtrueの場合は再実行を防止。

  - commit()
    - 現在のトランザクションを確定。
    - 
  - rollBack()
  - エラー発生時などにロールバックし、一貫性を保持。

## 3. 使い方 / 利用例
基底クラス `Service` を継承する
```php
<?php

namespace app\services;

use app\aura\Service;
use app\aura\Template;
use app\aura\https\Redirect;
use app\aura\utils\Session;
use app\form_classes\PostRequest;
use app\entities\PostEntity as Post;
use app\repositories\PostRepository;

class PostService extends Service {

    public function __construct() {
        parent::__construct();
        new Session;
    }

    public function showCreateForm() {
        $template = new Template(
            'post/form',
            [
                'csrf' => $this->setToken('post_create'),
                'signin_user' => $_SESSION['signin_user'] ?? null,
                'errors' => $_SESSION['errors'] ?? null,
                'old' => $_SESSION['old'] ?? null
            ]
        );
        unset($_SESSION['errors'], $_SESSION['old']);
        return $template->render();
    }

    public function create() {
        if (!$this->checkToken('post_create')) {
            echo 'Invalid token.';
            return false;
        }

        $this->beginTransaction();

        try {
            $postRepo = new PostRepository();
            $post = $this->makePost($_POST);
            $result = $postRepo->createPost($post);

            if (!$result) {
                throw new \Exception('Post creation failed.');
            }

            $this->commit();
            Redirect::to('post');
        } catch (\Exception $e) {
            $this->rollBack();
            Redirect::error(500);
        }
    }

    public function makePost(array $post_form): Post {
        $post = new Post();
        $post_request = new PostRequest($post_form);

        if ($post_request->getId() !== null) {
            $post->setId($post_request->getId());
        }
        $post->setUserId($post_request->getUserId());
        $post->setTitle($post_request->getTitle());
        $post->setBody($post_request->getBody());

        return $post;
    }
}

```

#### ■ 画面描画
```php
$template = new Template(
    'post/form',
    [
        'csrf' => $this->setToken('post_create'),
        'errors' => $_SESSION['errors'] ?? null,
        // その他データ
    ]
);
return $template->render();
```

#### ■ POST処理時のトークン検証とトランザクション制御
```php
public function create() {
    if (!$this->checkToken('post_create')) {
        echo 'Invalid token.';
        return false;
    }

    $this->beginTransaction();

    try {
        $post = new PostRepository();
        $postEntity = $this->makePost($_POST);
        $result = $post->createPost($postEntity);

        if (!$result) {
            throw new \Exception('Post creation failed.');
        }

        $this->commit();
        Redirect::to('post');
    } catch (\Exception $e) {
        $this->rollBack();
        Redirect::error(500);
    }
}
```

</nuxt-content-wrapper>