---
title: Request クラス
category: php
createdAt: 2025-10-12
updatedAt: 2025-10-12
sortNumber: 301
path: "/documents/ghostphp/301_request_class"
---

<nuxt-content-wrapper>

`Request` クラスは、HTTPリクエストを表現するクラスである。  
リクエストパスやHTTPメソッドを取得する機能を提供し、RouterやControllerがリクエストを処理する際に使用される。

## 1. コード

```php
<?php

namespace app\aura\https;

class Request {
    public Router $router;

    public function getPath() {
        preg_match('|' . dirname($_SERVER['SCRIPT_NAME']) . '/([\w%/]*)|', $_SERVER['REQUEST_URI'], $matches);
        $path     = $matches[1];
        $position = strpos($_SERVER['REQUEST_URI'], '?');

        if ($position === false) {
            return $path;
        }

        return substr($path, 0, $position);
    }

    public function getMethod() {
        return strtolower($_SERVER['REQUEST_METHOD']);
    }
}
```

## 2. コード説明
- プロパティ
  - Router $router
    - ルーティングを管理する Router クラスのインスタンス

- メソッド
  - getPath()
    - 現在のリクエストURIからパス部分を取得
    - クエリパラメータは除外される

  - getMethod()
    - HTTPリクエストメソッドを取得（GET、POSTなど）
    - 小文字で返却される

## 3. 使い方 / 利用例
```php
$request = new \app\aura\https\Request();

$path = $request->getPath(); // 例: 'signin'

$method = $request->getMethod(); // 例: 'post'
```

</nuxt-content-wrapper>