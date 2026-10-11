---
title: Router クラス
description: HTTPリクエストのルーティングと依存解決・バリデーションを管理するクラス
category: php
createdAt: 2025-10-12
updatedAt: 2026-09-15
sortNumber: 304
path: "/documents/ghostphp/304_router_class"
---

<nuxt-content-wrapper>

`Router` クラスは、HTTPリクエストを解析し、登録されたルートに基づいて対応するコールバックを実行する。

> v4.0での最大の変更点: `put()` / `delete()` メソッドが廃止され、GET/POSTのみになった。
> 一方で、コールバックとして `[Controller::class, 'method']` の配列を登録できるようになり、
> **コントローラーのコンストラクタ引数（DI）と、メソッド引数の `FormRequest` を自動解決**する機能が追加された。
> これがv4.0の中核的な変更である。

## 1. コード

```php
<?php

namespace app\aura\routes;

use app\aura\https\HttpRequest;

class Router {
    public HttpRequest $httpRequest;
    protected array $routes = [];

    public function __construct(HttpRequest $httpRequest) {
        $this->httpRequest = $httpRequest;
    }

    public function get(string $path, mixed $callback): void {
        $this->routes['get'][$path] = $callback;
    }

    public function post(string $path, mixed $callback): void {
        $this->routes['post'][$path] = $callback;
    }

    /**
     * Creates an instance and automatically resolves constructor dependencies.
     */
    private function make(string $className): object {
        $reflection = new \ReflectionClass($className);
        $constructor = $reflection->getConstructor();

        if ($constructor === null) {
            return new $className();
        }

        $dependencies = [];

        foreach ($constructor->getParameters() as $parameter) {
            if ($parameter->allowsNull()) {
                $dependencies[] = null;
                continue;
            }

            $type = $parameter->getType();

            if (!$type instanceof \ReflectionNamedType || $type->isBuiltin()) {
                continue;
            }

            // クラス型の引数は再帰的に解決する
            $dependencies[] = $this->make($type->getName());
        }

        return $reflection->newInstanceArgs($dependencies);
    }

    public function resolve(): void {
        $path = $this->httpRequest->getPath();
        $httpMethod = $this->httpRequest->getMethod();

        $callback = $this->routes[$httpMethod][$path] ?? false;

        if ($callback === false) {
            http_response_code(404);
            echo 'Not found';
            return;
        }

        if (\is_array($callback)) {
            [$className, $methodName] = $callback;

            // 1. コントローラー本体をDIで生成
            $service = $this->make($className);

            $reflection = new \ReflectionMethod($className, $methodName);
            $args = [];

            foreach ($reflection->getParameters() as $parameter) {
                $type = $parameter->getType();

                if (!$type) {
                    continue;
                }

                // 組み込み型（int, string...）はリクエストの入力値から取得
                if ($type instanceof \ReflectionNamedType && $type->isBuiltin()) {
                    $args[] = $this->httpRequest->input($parameter->getName());
                    continue;
                }

                // クラス型（FormRequest）はfill() → validate()
                $parameterClassName = $type->getName();
                $instance = new $parameterClassName();

                if ($instance) {
                    $inputData = $this->httpRequest->all();
                    $inputData['_files'] = $this->httpRequest->files();

                    $instance->fill($inputData);

                    $errorMessages = $instance->validate();

                    if (!empty($errorMessages)) {
                        if ($this->httpRequest->isJson()) {
                            http_response_code(400);
                            header('Content-Type: application/json');
                            echo json_encode(['errorMessages' => $errorMessages]);
                            return;
                        }

                        if (session_status() === PHP_SESSION_NONE) {
                            session_start();
                        }

                        $_SESSION['ERROR_MESSAGES'] = $errorMessages;
                        header('Location: ' . $_SERVER['HTTP_REFERER']);
                        return;
                    }
                }

                $args[] = $instance;
            }

            // 2. 検証を通過した場合のみコントローラーメソッドを実行
            echo $service->$methodName(...$args);
            return;
        }

        // コールバックがクロージャ等の場合は従来通り
        echo \call_user_func($callback);
    }
}
```

## 2. コード説明

- プロパティ
  - `$httpRequest` : 現在の HTTP リクエスト（`HttpRequest`）
  - `$routes` : 登録されたルート一覧（HTTPメソッドごと）

- メソッド
  - `get($path, $callback)` / `post($path, $callback)` : ルート登録。`$callback` はクロージャ、または `[ControllerClass::class, 'methodName']`
  - `make(string $className)`（private）
    - リフレクションでコンストラクタ引数を調べ、クラス型の引数は再帰的に `make()` してインスタンス化する簡易DIコンテナ
    - 組み込み型やnull許容の引数はスキップ／`null`を渡す
  - `resolve()`
    - 現在のリクエストに一致するコールバックを検索。無ければ404を返す
    - コールバックが配列 `[Controller::class, 'method']` の場合：
      1. `make()` でコントローラーをDI解決してインスタンス化
      2. 対象メソッドの引数をリフレクションで走査
      3. 組み込み型の引数 → `$httpRequest->input($parameterName)` から値を取得（**引数名とフォームの入力名を一致させる必要がある**）
      4. クラス型の引数（`FormRequest`）→ 空インスタンスを生成し、`fill()` でリクエストデータ（`_files` を含む）を詰め、`validate()` を実行
      5. 検証エラーがあれば、JSONリクエストなら400を返し、それ以外はエラーを `$_SESSION['ERROR_MESSAGES']` に格納して `HTTP_REFERER` へリダイレクトし、**コントローラーメソッドは呼び出さずに終了する**
      6. 検証OKならコントローラーメソッドを実行し、戻り値を `echo` する
    - コールバックがクロージャ等の場合は、従来通り `call_user_func()` で実行する

- 注意点
  - `put()` / `delete()` は無い。フォーム側は `POST` + 隠しフィールド（`update`/`delete` 等）で表現するか、必要であれば `Router` にメソッドを追加して拡張する
  - `FormRequest` の検証エラー時は `HTTP_REFERER` に依存してリダイレクトするため、リファラを送らないクライアント（一部のAPIクライアント等）からのアクセスでは想定通り動作しない場合がある

## 3. 使い方 / 利用例
- `use app\aura\routes\Router;` でクラスを読み込む。

```php
use app\aura\routes\Router;
use app\aura\https\HttpRequest;
use app\controllers\PostController;

$request = new HttpRequest();
$router  = new Router($request);

// クロージャ登録（依存解決なし）
$router->get('', function () { include "templates/welcome.php"; });

// コントローラー登録（DI + FormRequest自動検証）
$router->get('post', [PostController::class, 'index']);
$router->post('post/create', [PostController::class, 'create']);

// 現在のリクエストに応じたルートを解決
$router->resolve();
```

```php
// PostController::create(PostRequest $post_request) のように書いておけば、
// Routerが自動でPostRequestを生成・fill・validateしてから呼び出す
class PostController extends Controller {
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

</nuxt-content-wrapper>
