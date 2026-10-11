---
title: Response クラス
category: php
createdAt: 2025-10-12
updatedAt: 2026-09-15
sortNumber: 302
path: "/documents/ghostphp/302_response_class"
---

<nuxt-content-wrapper>

`Response` クラスは、HTTPレスポンスを表現するクラスである。
レスポンス本文、HTTPステータスコード、ヘッダーを管理し、クライアントへ送信する機能を提供する。

> v4.0での変更点: 各セッターメソッドが **`$this` を返すメソッドチェーン対応** になった（旧版は `void`）。
> また `json()` メソッドが新設され、JSONレスポンスを1行で組み立てられるようになった。
>
> **注意**: `aura/https/Response.php` の実ファイルには `namespace` 宣言が無く、クラスはグローバル名前空間 `\Response` として定義されている（旧ドキュメントの `use app\aura\https\Response;` という記述は実体と一致しない）。現時点では `controllers/` や `services/` からも参照されておらず、`Template` / `Redirect` によるレスポンス生成が実際の描画経路として使われている。将来 `namespace app\aura\https;` を追加する場合は、参照側の `use` 文の追加も併せて必要になる。

## 1. コード

```php
<?php

/**
 * Class Response
 *
 * Represents an HTTP response, including content, status code, and headers.
 */
class Response {

    protected $content;
    protected $status_code = 200;
    protected $status_text = 'OK';
    protected $http_headers = array();
    protected $protocol_version;

    public function __construct($protocol_version = '1.1') {
        $this->protocol_version = $protocol_version;
        ob_start();
    }

    public function send() {
        header('HTTP/' . $this->protocol_version . ' ' . $this->status_code . ' ' . $this->status_text);

        foreach ($this->http_headers as $key => $val) {
            header($key . ': ' . $val);
        }

        echo $this->content;
    }

    public function setContent($content, $contentType = 'text/html') {
        $this->content = $content;
        $this->header('Content-Type', $contentType);
        return $this;
    }

    public function status($status_code, $status_text = '') {
        $this->status_code = $status_code;
        $this->status_text = $status_text;
        return $this;
    }

    public function header(string $header, string $val) {
        $this->http_headers[$header] = $val;
        return $this;
    }

    public function json($data) {
        $this->content = json_encode($data, JSON_THROW_ON_ERROR);
        $this->header('Content-Type', 'application/json');
        return $this;
    }
}
```

## 2. コード説明
- プロパティ
  - $content：レスポンス本文
  - $status_code：HTTPステータスコード（デフォルト 200）
  - $status_text：HTTPステータスの説明文（デフォルト "OK"）
  - $http_headers：HTTPヘッダーを格納する配列
  - $protocol_version：HTTPプロトコルバージョン（デフォルト "1.1"）

- メソッド
  - `__construct($protocol_version)`
    - レスポンスオブジェクトを初期化、出力バッファリングを開始
  - `send()`
    - ステータス行・ヘッダーと本文をクライアントに送信
  - `setContent($content, $contentType)`
    - レスポンス本文とContent-Typeを設定。**`$this` を返す**
  - `status($status_code, $status_text)`
    - HTTPステータスコードと説明文を設定（旧 `setStatusCode()` から名称変更）。**`$this` を返す**
  - `header($header, $val)`
    - 任意のHTTPヘッダーを設定（旧 `setHttpHeader()` から名称変更）。**`$this` を返す**
  - `json($data)`（v4.0で新設）
    - `$data` をJSONエンコードして本文にセットし、`Content-Type: application/json` を設定。**`$this` を返す**

## 3. 使い方
- 名前空間宣言が無いため、`use` 文は不要（クラスファイルを読み込めばグローバルの `\Response` として利用できる）。

### ■ メソッドチェーンでの利用（v4.0の標準的な書き方）
```php
$response = new Response();

$response
    ->status(200, 'OK')
    ->header('X-Powered-By', 'GhostPHP')
    ->setContent('<h1>Hello World</h1>', 'text/html')
    ->send();
```

### ■ JSONレスポンス
```php
$response = new Response();

$response
    ->status(200)
    ->json(['message' => 'ok', 'data' => $result])
    ->send();
```

</nuxt-content-wrapper>
