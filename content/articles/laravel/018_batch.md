---
title: バッチ処理
description: commandを作る。
category: laravel
createdAt: 2023-03-06
updatedAt: 2023-03-06
sortNumber: 18
path: "/articles/laravel/018_batch"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. Googleアカウントで設定](#2-googleアカウントで設定)
- [3. 「.env」ファイルの追加](#3-envファイルの追加)
- [4. マイグレーション、実行](#4-マイグレーション実行)
- [5. UserResetPassword.phpを編集する](#5-userresetpasswordphpを編集する)
- [6. User.phpへの追記](#6-userphpへの追記)
- [7. おわりに](#7-おわりに)

<br>

## 1. はじめに

## 2. コマンドでバッチ用ファイルを生成
下記のコマンドを実行すると`~\app\Console\Commands\xxxxxxxx.php`が生成される。

```php
php artisan make:command xxxxxxxx
```

<br>

```php
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class cardDeadline extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:name';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        return 0;
    }
}

```

<br>

## 3. ファイルの中身

### ■ コマンド名
```php
protected $signature = 'command:xxxxxxxx';
```

<br>

### ■ コマンドの説明
```php
protected $description = 'Email notification of any cards that are about to expire.';
```

<br>

### ■ コマンドの処理
`handle`メソッドの中で処理を書く。コマンド実行時はここで書いた処理が実行される。
```php
public function handle()
{
    return 0;
}
```

<br>


# 4. おわりに
参考
- [【Laravel】ユーザーパスワードリセット機能を実装する](https://qiita.com/mineaki27th/items/1111d04f3288a3a01956)

</nuxt-content-wrapper>
