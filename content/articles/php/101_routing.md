---
title: Ghost PHP
description: ルーティング
category: php
createdAt: 2025-06-26
updatedAt: 2025-06-26
sortNumber: 1
path: "/articles/php/101_routing"
---

<nuxt-content-wrapper>

- [1. ルーティング](#1-ルーティング)
- [2. 基本的な記法](#2-基本的な記法)
- [3. GETリクエスト](#3-getリクエスト)
- [4. POSTリクエスト](#4-postリクエスト)
- [5. ルート内の処理パターン](#5-ルート内の処理パターン)
    - [■ サービスクラスとの連携](#-サービスクラスとの連携)
    - [■  画面遷移](#--画面遷移)

<br>

# 1. ルーティング
本フレームワークは、独自の App クラスと Router クラスを用いて、ルーティング（URLの振り分け）を制御しています。`index.php` にて、すべてのルート設定を一元管理します。

<br>

# 2. 基本的な記法

```php
require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/bootstrap.php';

use app\aura\App;

$app = new App();

$app->router->get('example', function () {
    echo "GET Example Route";
});

$app->router->post('submit', function () {
    echo "POST Submit Route";
});

$app->run();

```

<br>

# 3. GETリクエスト

```php
$app->router->get('パス', function () {
    // 表示処理など
});
```

例: 
```php
$app->router->get('signin', function () {
    (new UserService)->showSignInForm();
});
```

<br>

# 4. POSTリクエスト

```php
$app->router->post('パス', function () {
    // 登録処理など
});

```

例: 
```php
$app->router->post('signup', function () {
    (new UserService)->signup();
});
```

<br>

# 5. ルート内の処理パターン
### ■ サービスクラスとの連携
ルーティング定義内では、サービスクラス（例：UserService, PostService）を呼び出して、ビジネスロジックを実行します。

```php
$app->router->post('signup', function () {
    (new UserService)->signup();
});
```

<br>

### ■  画面遷移
特定のテンプレートを直接表示することで、画面描画（HTML出力）に遷移します。

```php
$app->router->get('welcome', function () {
    include "templates/welcome.php";
});
```
</nuxt-content-wrapper>
