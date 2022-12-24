---
title: 脆弱性とトークン
description: XSS対策と認証用トークン生成
category: php
createdAt: 2022-01-29
updatedAt: 2022-03-19
sortNumber: 3
path: "/articles/php/003_fragile"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. トークン生成とXSS対策用のファイルを用意](#2-トークン生成とxss対策用のファイルを用意)
    - [■ htmlspecialchars関数](#-htmlspecialchars関数)
    - [■ トークンの生成](#-トークンの生成)
- [3. おわりに](#3-おわりに)

<br>

# 1. はじめに
地味に次回以降にご活躍の`htmlspecialchars`とXSS対策をしてみましょう。認証をはじめ、様々な場面で使えるものでセキュリティ対策になるので、必見（誰に対して放っている言葉なのか）。
```
プロジェクトディレクトリ
│
│── fragile
│   │── index.php ←【今回、ココ】
│
```

<br>

# 2. トークン生成とXSS対策用のファイルを用意
```php
<?php
function h($str){
    return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
}

function setToken(){
    $csrf_token = bin2hex(random_bytes(32));
    $_SESSION['csrf_token'] = $csrf_token;

    return $csrf_token;
}
?>
```

### ■ htmlspecialchars関数
> HTML タグ(「&」「"」「'」「<」「>」など)などに使われる特殊文字をエンティティに変換する関数。
```php
 htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
```
上記のように関数のパラメータは` htmlspecialchars( 文字列, 変換パターン, 文字コード )`です。`ENT_QUOTES`の部分に関して、「‘」は「'」、「“」は「"」といった具体にシングルとダブルの引用符の特殊文字をちゃんと画面に表示できるように変換します。

参考 [PHPのドキュメント](https://www.php.net/manual/ja/function.htmlspecialchars.php)

<br>

### ■ トークンの生成
> CSRF（クロスサイト・リクエスト・フォージェリ）の対策のためにトークンを生成します。簡単にいうと、フォーム入力前のWebページで予めトークンを発行することでリクエスト時に送信されたトークンと入力前のトークンを比較し、正しいリクエスト元であるかどうかを判別する。
```php
function setToken(){
    $csrf_token = bin2hex(random_bytes(32));
    $_SESSION['csrf_token'] = $csrf_token;

    return $csrf_token;
}
```

<br>

# 3. おわりに
トークンの生成は思いのほか、少ない行の記述で出来るし、`htmlspecialchars`も毎回、`<?php echo htmlspecialchars() ?>`って書くのは面倒だからそれが、`<?php echo h() ?>`で済むなんて…、なんて革命。

</nuxt-content-wrapper>
