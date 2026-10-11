---
title: Redirect クラス
description: HTTPリダイレクトを扱うクラス
category: php
createdAt: 2025-10-12
updatedAt: 2026-10-03
sortNumber: 303
path: "/documents/ghostphp/v4.0/303_redirect_class"
---

<nuxt-content-wrapper>

`Redirect` クラスは、HTTPリダイレクトを処理するための静的メソッドを提供する。
指定したURLやエラーページへの遷移を簡潔に行える。

> v4.0での変更点: `to()` メソッドが `exit()` を呼ばなくなった（旧版は呼び出し直後にプロセスを終了していた）。
> Routerがコントローラーの戻り値を `echo` する設計になったため、`Redirect::to()` を呼んだ後も
> 呼び出し元のメソッド（コントローラー）内で `return;` して処理を終える必要がある点に注意する。
>
> また、エラーテンプレートの探索先ディレクトリを `setErrorTemplatesBasePath()` で設定できるようになった（旧版は `templates/errors/` を直書きしていた）。
> `Template::setBasePath()`（[503_template_class.md](503_template_class.md)）と対になる設定で、アプリ側の `bootstrap.php` で指定する（[203_bootstrap.md](203_bootstrap.md)）。

## 1. コード

```php
<?php

namespace app\aura\https;

class Redirect
{
    private static string $errorTemplatesBasePath = 'templates/errors';

    public static function setErrorTemplatesBasePath(string $path): void {
        self::$errorTemplatesBasePath = rtrim($path, '/');
    }

    public static function to(string $path, int $statusCode = 302): void  {
        $url = dirname($_SERVER['SCRIPT_NAME']) . '/' . ltrim($path, '/');
        header("Location: {$url}", true, $statusCode);
    }

    public static function error(int $statusCode = 404)
    {
        http_response_code($statusCode);
        if ($statusCode == 500) {
            include(self::$errorTemplatesBasePath . '/500.php');
        } else {
            include(self::$errorTemplatesBasePath . '/404.php');
        }
        exit();
    }
}
```

## 2. コード説明
- プロパティ
  - `$errorTemplatesBasePath` : エラーテンプレート（`404.php` / `500.php`）の探索先ディレクトリ。既定値は `'templates/errors'`（カレントディレクトリからの相対パス）
- メソッド
  - `setErrorTemplatesBasePath($path)`
    - エラーテンプレートの探索先ディレクトリを設定する静的メソッド。起動時に1回呼べば以降の `error()` 全てに反映される
    - GhostPHPでは `bootstrap.php` で `__DIR__ . '/templates/errors'` の絶対パスを設定している
  - `to($path, $statusCode)`
    - 指定したパスへ `Location` ヘッダーを送出する（302リダイレクト、`exit()` は呼ばない）
    - URLはスクリプトのディレクトリに基づき正規化
  - `error($statusCode)`
    - エラーページ（404/500）へリダイレクト
    - ステータスコードをHTTPレスポンスにセットし、探索先ディレクトリ内の対応するテンプレートを include して `exit()` で処理を終了する
    - 引数は `int` 型（`int $statusCode = 404`）
    - 他のHTTPステータスコードのテンプレートを追加したい場合は、このメソッドを編集して独自の条件を追加することで対応可能

## 3. 使い方 / 利用例
- `use app\aura\https\Redirect;` でクラスを読み込む。

```php
// コントローラー内での典型的な使い方
public function signin(UserRequest $user_request): void {
    if (!$this->checkToken('signin')) {
        Redirect::to('signin');
        return;
    }

    $result = $this->home_service->signin($user_request);
    if (!$result) {
        Redirect::to('signin');
        return; // Redirect::to()自体はexit()しないため、必ずreturnする
    }

    Redirect::to('index');
}

// 404エラーを表示（このメソッドは内部でexit()する）
Redirect::error();

// 500エラーを表示
Redirect::error(500);
```

</nuxt-content-wrapper>
