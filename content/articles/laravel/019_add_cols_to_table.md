---
title: バッチ処理
description: commandを作る。
category: laravel
createdAt: 2023-03-12
updatedAt: 2023-03-12
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

## 2. コマンドでファイル生成
下記のコマンドを実行すると`~\app\Console\Commands\xxxxxxxx.php`が生成される。

```php
php artisan make:migration last_logged_in_at_to_users_table --table=users
```

<br>

## 3. マイグレーション編集

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Carbon\Carbon;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->date('last_logged_in_at',255)->default(Carbon::now())->nullable();  //カラム追加
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
             $table->dropColumn('last_logged_in_at');  //カラムの削除
        });
    }
};


```

<br>

## 4. コマンドでファイル生成
プロジェクトディレクトリで実行マイグレーション
```php
php artisan migrate
```

<br>

# 4. おわりに
参考
- [【Laravel】ユーザーパスワードリセット機能を実装する](https://qiita.com/mineaki27th/items/1111d04f3288a3a01956)

</nuxt-content-wrapper>
