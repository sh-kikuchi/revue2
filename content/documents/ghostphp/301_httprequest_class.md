---
title: HttpRequest クラス
category: php
createdAt: 2025-10-12
updatedAt: 2026-10-25
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

    private const OVERRIDABLE_METHODS = ['put', 'patch', 'delete'];

    private ?array $parsedBody = null;

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
        $method = strtolower($_SERVER['REQUEST_METHOD'] ?? 'get');

        if ($method !== 'post') {
            return $method;
        }

        // A POST carrying "_method" of PUT / PATCH / DELETE is treated as that method
        $override = strtolower((string)($_POST['_method'] ?? ''));

        return \in_array($override, self::OVERRIDABLE_METHODS, true)
            ? $override
            : $method;
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
        return [...$_GET, ...$_POST, ...$this->parsedBody()];
    }

    public function input(string $key): mixed {
        return $this->all()[$key] ?? null;
    }

    public function files(): array {
        return $_FILES ?? [];
    }

    public function body(): array {
        if ($this->isJson()) {
            return $this->all();
        }

        // Request body only, without query string parameters
        return [...$_POST, ...$this->parsedBody()];
    }

    private function parsedBody(): array {
        if ($this->parsedBody !== null) {
            return $this->parsedBody;
        }

        $this->parsedBody = [];

        $realMethod = strtolower($_SERVER['REQUEST_METHOD'] ?? 'get');
        $contentType = $_SERVER['CONTENT_TYPE'] ?? '';

        // PHP fills $_POST only for real POST requests
        if (
            \in_array($realMethod, self::OVERRIDABLE_METHODS, true)
            && str_contains($contentType, 'application/x-www-form-urlencoded')
        ) {
            parse_str(file_get_contents('php://input'), $this->parsedBody);
        }

        return $this->parsedBody;
    }
}
```

## 2. コード説明

- メソッド
  - `getPath()`
    - 現在のリクエストURIからパス部分を取得。クエリパラメータは除外される。
  - `getMethod()`
    - HTTPリクエストメソッドを取得（GET、POST、PUT、PATCH、DELETEなど）。小文字で返却される。
    - **v4.2〜**：POST に `_method` フィールド（値は `PUT` / `PATCH` / `DELETE`、大文字小文字は問わない）が付いている場合は、そのメソッドとして返す（メソッドスプーフィング）。GET に `_method` が付いていても無視する。
  - `isJson()`
    - `Content-Type` ヘッダーが `application/json` を含むかどうかを判定する。
  - `all()`
    - JSONリクエストの場合は `php://input` をデコードして返す。
    - フォームリクエストの場合は `$_GET` と `$_POST` をマージして返す（POSTが優先）。
    - **v4.2〜**：本当の PUT / PATCH / DELETE でフォーム形式（`application/x-www-form-urlencoded`）の本文が送られた場合は、その値もマージする（PHP は POST 以外では `$_POST` を埋めないため、`php://input` から読む）。
  - `input(string $key)`
    - `all()` から指定キーの値を1件取得する（存在しなければ `null`）。
  - `files()`
    - `$_FILES` をそのまま返す。
  - `body()`（**v4.2〜**）
    - `all()` からクエリ文字列（`$_GET`）を除いた、リクエスト本文だけを返す。
    - CSRF トークンのように、URL から受け取ってはいけない値を読むときに使う（`Controller::checkToken()` が内部で使用。[305_controller_class.md](305_controller_class.md)）。
  - `parsedBody()`（private、**v4.2〜**）
    - 本当の PUT / PATCH / DELETE で送られたフォーム形式の本文を解析する。結果はプロパティに保持し、2回目以降は読み直さない。

## 3. 使い方 / 利用例

```php
$request = new \app\aura\https\HttpRequest();

$path = $request->getPath();     // 例: 'signin'
$method = $request->getMethod(); // 例: 'post'

if ($request->isJson()) {
    $data = $request->all(); // JSONボディをデコードした配列
}

$email = $request->input('email');
$token = $request->body()['csrf_token'] ?? null; // URLのクエリ文字列は含まない
```

通常、アプリケーションコードから `HttpRequest` を直接使うことは少なく、
`Router::resolve()` の内部でリクエスト解決・DI解決のために使われる（[304_router_class.md](304_router_class.md)）。
コントローラー・サービスの中でリクエストデータを扱いたい場合は、
バリデーション付きの `FormRequest`（`app\aura\https\Request` を継承したクラス）を使うのが標準的な方法である（[306_request_validation.md](306_request_validation.md)）。

## 4. PUT / PATCH / DELETE の送り方（v4.2〜）

HTML のフォームは GET と POST しか送れない。PUT / PATCH / DELETE を使うときは、**POST で送り、隠しフィールド `_method` で本当のメソッドを伝える**。

```html
<!-- 更新（PUT） -->
<form method="POST" action="<?= route('post/update') ?>">
    <input type="hidden" name="_method" value="PUT">
    <input type="hidden" name="csrf_token" value="<?= h($csrf) ?>">
    ...
</form>

<!-- 削除（DELETE） -->
<form method="POST" action="<?= route('post/delete') ?>">
    <input type="hidden" name="_method" value="DELETE">
    <input type="hidden" name="csrf_token" value="<?= h($csrf) ?>">
    <input type="hidden" name="id" value="<?= h($post['id']) ?>">
    <button type="submit">DELETE</button>
</form>
```

API（`fetch` や `curl` など）からは、本当の PUT / PATCH / DELETE をそのまま送ればよい。

```bash
# JSON
curl -X PUT -H "Content-Type: application/json" -d '{"title":"new"}' http://localhost/ghostphp/post/update

# フォーム形式
curl -X DELETE -d "id=1" http://localhost/ghostphp/post/delete
```

| 送り方 | 値の読み取り元 |
|---|---|
| POST ＋ `_method`（HTML フォーム） | `$_POST`（本当は POST なので） |
| 本当の PUT / PATCH / DELETE ＋ JSON | `php://input`（`all()` の JSON 分岐） |
| 本当の PUT / PATCH / DELETE ＋ フォーム形式 | `php://input`（`parsedBody()`） |

- ファイルを添付した本当の PUT（`multipart/form-data`）には**対応しない**。PHP が本文を解析しないためである。ファイルは POST（または POST ＋ `_method`）で送る。
- JSON の本文の中に `_method` を書いても読み替えない（`getMethod()` が見るのは `$_POST['_method']` だけ）。API からは本当のメソッドで送る。
- ルート側の登録方法（`put()` / `patch()` / `delete()`）は [304_router_class.md](304_router_class.md) を参照。

</nuxt-content-wrapper>
