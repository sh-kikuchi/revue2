---
title: テーブルの変更（カラム追加）
description: マイグレーションファイル作成
category: laravel
createdAt: 2022-11-08
updatedAt: 2022-11-08
sortNumber: 16
path: "/articles/laravel/016_alterTable"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. マイグレーションファイル作成](#2-マイグレーションファイル作成)
- [3. マイグレーションファイル編集](#3-マイグレーションファイル編集)
- [４. マイグレーション、実行](#４-マイグレーション実行)
- [5. おわりに](#5-おわりに)

<br>

# 1. はじめに
テーブルを変更したい時にもマイグレーションファイルを作成し、`php artisan make:migration`コマンドを打つそう。あまりこれをやりすぎると管理がしにくいというのはありそうだが、とりあえずやり方を整理しましょ。

<br>

# 2. マイグレーションファイル作成
テーブルを変更したい時はどのテーブルを変更したいかのオプションを付けて、マイグレーションファイルを作成する。

```php
php artisan make:migration add_column_to_notes_table --table=notes
```


<br>

# 3. マイグレーションファイル編集
追加したいカラムだけを記述する。

```php

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('notes', function (Blueprint $table) {
            $table->string('url',255)->nullable(); 
        });
    }

    public function down()
    {
        Schema::table('notes', function (Blueprint $table) {
             $table->dropColumn('url');  //カラムの削除
        });
    }
};
```

<br>

# ４. マイグレーション、実行

```php
php artisan migrate
```

<br>

# 5. おわりに
手順的にはお手軽に出来るものである。

</nuxt-content-wrapper>
