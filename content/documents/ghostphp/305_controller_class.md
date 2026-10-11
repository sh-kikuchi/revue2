---
title: Controller クラス
description: v4.0で新設されたコントローラー基底クラス
category: php
createdAt: 2026-09-15
updatedAt: 2026-10-03
sortNumber: 305
path: "/documents/ghostphp/305_controller_class"
---

<nuxt-content-wrapper>

> **v4.0で新設** されたクラス。旧ドキュメント（`docs/`）ではコントローラー層自体が存在せず、
> ルートが直接サービスを呼び出していた。v4.0では `Controller` がHTTPリクエストとビジネスロジック（Service）の橋渡しを担う。

`Controller` は `controllers/` 配下の全コントローラーの基底クラスであり、
CSRFトークンの発行・検証など、コントローラー共通の機能を提供する。

## 1. コード

```php
<?php
namespace app\aura;

use app\aura\https\Redirect;
use app\aura\https\HttpRequest;
use app\aura\https\Validator;

abstract class Controller {

    protected HttpRequest $request;
    protected Redirect $redirect;
    protected Validator $validator;

    public function __construct() {
        $this->request   = new HttpRequest();
        $this->redirect  = new Redirect();
        $this->validator = new Validator();
    }

    public function setToken(string $form_name): string {
        $csrf_token = bin2hex(random_bytes(32));
        $_SESSION['csrf_token'][$form_name] = $csrf_token;
        return $csrf_token;
    }

    public function checkToken(string $form_name): bool {
        if (!isset($_SESSION['csrf_token'][$form_name])) {
            return false;
        }
        return $_POST["csrf_token"] === $_SESSION['csrf_token'][$form_name];
    }

    public function generateCsrfToken(): string {
        $csrf_token = bin2hex(random_bytes(32));
        $_SESSION['csrf_token'] = $csrf_token;
        return $csrf_token;
    }

    public function validateCsrfToken(string $token): bool {
        return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
    }
}
```

## 2. コード説明

- プロパティ
  - `$request` : `HttpRequest` インスタンス
  - `$redirect` : `Redirect` インスタンス（現状インスタンスとしては使われず、`Redirect::to()` は静的呼び出しで使うことが多い）
  - `$validator` : `app\aura\https\Validator` インスタンス（フォームごとの `FormRequest` を使わず、コントローラー内で手動検証したい場合に利用できる）。v4.0 で `app\aura\utils\Validator` から差し替えた（`utils\Validator` は `@deprecated`。[604_validator_class.md](604_validator_class.md) 参照）

- メソッド
  - `setToken(string $form_name)` / `checkToken(string $form_name)`
    - フォーム名をキーにしたCSRFトークンの発行・検証。**v2.x系では `Service` 側にあったが、v4.0では `Controller` に移動した**（`Service` 側の同名メソッドは `@deprecated` 扱い。[502_service_class.md](502_service_class.md) 参照）
  - `generateCsrfToken()` / `validateCsrfToken(string $token)`
    - フォーム名に依存しない単一のCSRFトークンを扱うバリエーション。`hash_equals()` でタイミング攻撃対策済み

- `Controller` を継承するクラスは、コンストラクタで自身のService等をDIで受け取り、`parent::__construct()` を呼ぶ必要がある（呼ばないと `$request` 等が初期化されない）。

## 3. 使い方 / 利用例

```php
<?php

namespace app\controllers;

use app\aura\Controller;
use app\aura\Template;
use app\aura\https\Redirect;
use app\services\PostService;
use app\services\UserService;
use app\requests\PostRequest;

class PostController extends Controller {
    private PostService $post_service;
    private UserService $home_service;

    public function __construct(PostService $postService, UserService $UserService) {
        parent::__construct(); // Controllerの初期化を忘れずに呼ぶ

        $this->post_service = $postService;
        $this->home_service = $UserService;
    }

    public function showCreateForm(): void {
        if (!$this->home_service->checkSign()) {
            Redirect::to('signin');
            return;
        }

        $template = new Template('post/form', [
            'csrf' => $this->setToken('post_create'),
            'errors' => $_SESSION['ERROR_MESSAGES'] ?? null,
        ]);

        $template->render();
    }

    public function create(PostRequest $post_request): void {
        if (!$this->checkToken('post_create')) {
            echo 'Invalid token.';
            return;
        }

        if (!$this->post_service->create($post_request)) {
            Redirect::to('post/create');
            return;
        }

        Redirect::to('post');
    }
}
```

コントローラーのコンストラクタ引数（`PostService`, `UserService` など）は、`Router::resolve()` がリフレクションで自動生成する（[304_router_class.md](304_router_class.md)）。
そのため、`new PostController(...)` を自分で直接書く必要はなく、`index.php` で `[PostController::class, 'create']` をルートに登録するだけでよい。

</nuxt-content-wrapper>
