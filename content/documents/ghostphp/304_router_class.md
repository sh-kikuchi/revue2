---
title: Router クラス
description: HTTPリクエストのルーティングを管理するクラス
category: php
createdAt: 2025-10-12
updatedAt: 2025-10-12
sortNumber: 304
path: "/documents/ghostphp/304_router_class"
---

<nuxt-content-wrapper>

`Router` クラスは、HTTPリクエストを解析し、登録されたルートに基づいて対応するコールバックを実行する。GET, POST, PUT, DELETE メソッドに対応しており、簡単にルート登録と解決が可能。

## 1. コード

```php
<?php

namespace app\aura\routes;

use app\aura\https\Request;

class Router {
    public Request $request;
    protected array $routes = [];

    public function __construct(Request $request) {
        $this->request = $request;
    }

    public function get($path, $callback) {
        $this->routes['get'][$path] = $callback;
    }

    public function post($path, $callback) {
        $this->routes['post'][$path] = $callback;
    }

    public function put($path, $callback) {
        $this->routes['put'][$path] = $callback;
    }

    public function delete($path, $callback) {
        $this->routes['delete'][$path] = $callback;
    }

    public function resolve() {
        $path   = $this->request->getPath();
        $method = $this->request->getMethod();
        $callback = $this->routes[$method][$path] ?? false;
        
        if ($callback === false) {
            echo "Not found";
            exit;
        }

        echo call_user_func($callback);
    }
}
```

## 2. コード説明

- プロパティ 
  - $request : 現在の HTTP リクエスト
  - $routes : 登録されたルート一覧（HTTPメソッドごと）
  
- メソッド
  - get($path, $callback) : GET ルート登録
  - post($path, $callback) : POST ルート登録
  - put($path, $callback) : PUT ルート登録
  - delete($path, $callback) : DELETE ルート登録
  - resolve() : 現在のリクエストを解決して対応するコールバックを実行
  - 未登録ルートの場合は "Not found" を表示して処理終了
  - 必要に応じてカスタマイズし、404/500 ページなどにリダイレクト可能

## 3. 使い方 / 利用例
- `use app\aura\routes\Router;` でクラスを読み込む。
```php
use app\aura\routes\Router;
use app\aura\https\Request;

$request = new Request();
$router  = new Router($request);

// GETルート登録
$router->get('home', function() {
    return 'ホームページです';
});

// POSTルート登録
$router->post('signup', function() {
    return 'サインアップ処理';
});

// 現在のリクエストに応じたルートを解決
$router->resolve();

```

</nuxt-content-wrapper>