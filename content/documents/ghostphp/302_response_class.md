---
title: Response クラス
category: php
createdAt: 2025-10-12
updatedAt: 2025-10-12
sortNumber: 302
path: "/documents/ghostphp/302_response_class"
---

<nuxt-content-wrapper>

`Response` クラスは、HTTPレスポンスを表現するクラスである。  
レスポンス本文、HTTPステータスコード、ヘッダーを管理し、クライアントへ送信する機能を提供する。

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
        header($this->protocol_version . ' ' . $this->status_code . ' ' . $this->status_text);

        foreach ($this->http_headers as $key => $val) {
            header($key . ': ' . $val);
        }

        echo $this->content;
    }

    public function setContent($content, $contentType = 'text/html') {
        $this->content = $content;
        $this->setHttpHeader('Content-Type', $contentType);
    }

    public function setStatusCode($status_code, $status_text = '') {
        $this->status_code = $status_code;
        $this->status_text = $status_text;
    }

    public function setHttpHeader($header, $val) {
        $this->http_headers[$header] = $val;
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
  - __construct($protocol_version)
    - レスポンスオブジェクトを初期化、出力バッファリングを開始
  - send()
    - ヘッダーと本文をクライアントに送信
  - setContent($content, $contentType)
    - レスポンス本文とContent-Typeを設定
  - setStatusCode($status_code, $status_text)
    - HTTPステータスコードと説明文を設定
  - setHttpHeader($header, $val)
    - 任意のHTTPヘッダーを設定

## 3. 使い方
- `use app\aura\https\Response;`でクラスを読み込む。
```php
$response = new Response();

// レスポンス本文とContent-Typeを設定
$response->setContent('<h1>Hello World</h1>', 'text/html');

// ステータスコードを設定
$response->setStatusCode(200, 'OK');

// 任意のヘッダーを設定
$response->setHttpHeader('X-Powered-By', 'GhostPHP');

// クライアントに送信
$response->send();

```

</nuxt-content-wrapper>