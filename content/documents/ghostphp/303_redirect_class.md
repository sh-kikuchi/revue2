---
title: Redirect クラス
description: HTTPリダイレクトを扱うクラス
category: php
createdAt: 2025-10-12
updatedAt: 2025-10-12
sortNumber: 303
path: "/documents/ghostphp/303_redirect_class"
---

<nuxt-content-wrapper>

`Redirect` クラスは、HTTPリダイレクトを処理するための静的メソッドを提供する。  
指定したURLやエラーページへの遷移を簡潔に行える。

## 1. コード

```php
<?php

namespace app\aura\https;

class Redirect {

    public static function to($path, $statusCode = 302) {
        $url = dirname($_SERVER['SCRIPT_NAME']) . '/' . ltrim($path, '/');
        header("Location: " . $url, true, $statusCode);
        exit();
    }

    public static function error($statusCode = 404) {
        http_response_code($statusCode);
        if ($statusCode == 500) {
            include('templates/errors/500.php');
        } else {
            include('templates/errors/404.php');
        }
        exit();
    }
}
```

## 2. コード説明
- メソッド
  - to($path, $statusCode)
    - 指定したパスへHTTPリダイレクトを実行
    - URLはスクリプトのディレクトリに基づき正規化
  - error($statusCode)
    - エラーページ（404/500）へリダイレクト
    - ステータスコードをHTTPレスポンスにセットし、対応するテンプレートを include して終了
    - 他のHTTPステータスコードのテンプレートを追加したい場合 は、このメソッドを編集して独自の条件を追加することで対応可能


## 3. 使い方 / 利用例
- `use app\aura\https\Redirect;`でクラスを読み込む。
```php
// 通常のリダイレクト
Redirect::to('index'); // 302リダイレクトで index ページへ

// 404エラーを表示
Redirect::error(); // デフォルト404

// 500エラーを表示
Redirect::error(500);

```

</nuxt-content-wrapper>