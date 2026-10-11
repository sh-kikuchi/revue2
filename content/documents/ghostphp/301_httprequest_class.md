---
title: HttpRequest クラス
category: php
createdAt: 2025-10-12
updatedAt: 2026-09-15
sortNumber: 301
path: "/documents/ghostphp/301_httprequest_class"
---

<nuxt-content-wrapper>

> このドキュメントは旧 `301_request_class.md`（`app\aura\https\Request`）に対応する更新版である。
> v4.0では、生のHTTP情報を扱うクラスは `HttpRequest` に名称・役割が変わり、
> 「FormRequestの基底クラス」としての `Request` は別クラスとして新設された（[306_request_validation.md](306_request_validation.md)）。

`HttpRequest` クラスは、HTTPリクエストそのもの（パス・メソッド・入力値・アップロードファイル）を表現するクラスである。
`App` / `Router` が保持し、リクエストパスやメソッドの取得、JSON判定、入力値の一括取得に使用される。

## 1. コード

```php
<?php

namespace app\aura\https;

class HttpRequest {

    public function getPath(): string {
        preg_match(
            '|' . dirname($_SERVER['SCRIPT_NAME']) . '/([\w%/]*)|',
            $_SERVER['REQUEST_URI'],
            $matches
        );

        $path = $matches[1] ?? '';

        $position = strpos($_SERVER['REQUEST_URI'], '?');

        if ($position === false) {
            return $path;
        }

        return substr($path, 0, $position);
    }

    public function getMethod(): string {
        return strtolower($_SERVER['REQUEST_METHOD']);
    }

    public function isJson(): bool {
        $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
        return str_contains($contentType, 'application/json');
    }

    public function all(): array {
        // API (JSON)
        if ($this->isJson()) {
            $json = file_get_contents('php://input');
            $jsonData = json_decode($json, true);
            return \is_array($jsonData) ? $jsonData : [];
        }

        // WEB (Form)
        return [...$_GET, ...$_POST];
    }

    public function input(string $key): mixed {
        return $this->all()[$key] ?? null;
    }

    public function files(): array {
        return $_FILES ?? [];
    }
}
```

## 2. コード説明

- メソッド
  - `getPath()`
    - 現在のリクエストURIからパス部分を取得。クエリパラメータは除外される。
  - `getMethod()`
    - HTTPリクエストメソッドを取得（GET、POSTなど）。小文字で返却される。
  - `isJson()`
    - `Content-Type` ヘッダーが `application/json` を含むかどうかを判定する。
  - `all()`
    - JSONリクエストの場合は `php://input` をデコードして返す。
    - フォームリクエストの場合は `$_GET` と `$_POST` をマージして返す（POSTが優先）。
  - `input(string $key)`
    - `all()` から指定キーの値を1件取得する（存在しなければ `null`）。
  - `files()`
    - `$_FILES` をそのまま返す。

## 3. 使い方 / 利用例

```php
$request = new \app\aura\https\HttpRequest();

$path = $request->getPath();     // 例: 'signin'
$method = $request->getMethod(); // 例: 'post'

if ($request->isJson()) {
    $data = $request->all(); // JSONボディをデコードした配列
}

$email = $request->input('email');
```

通常、アプリケーションコードから `HttpRequest` を直接使うことは少なく、
`Router::resolve()` の内部でリクエスト解決・DI解決のために使われる（[304_router_class.md](304_router_class.md)）。
コントローラー・サービスの中でリクエストデータを扱いたい場合は、
バリデーション付きの `FormRequest`（`app\aura\https\Request` を継承したクラス）を使うのが標準的な方法である（[306_request_validation.md](306_request_validation.md)）。

</nuxt-content-wrapper>
