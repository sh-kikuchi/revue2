---
title: マイグレーション
description: DB設計をしよう
category: laravel
createdAt: 2021-11-18
updatedAt: 2021-11-18
sortNumber: 002
path: "/articles/laravel/002_database"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. データベースの準備](#2-データベースの準備)
    - [■ ファイル取得](#-ファイル取得)
    - [■ マイグレーションファイル](#-マイグレーションファイル)
    - [■ ダミーデータを入れる](#-ダミーデータを入れる)
    - [■ マイグレーション実行](#-マイグレーション実行)
- [3. おわりに](#3-おわりに)


# 1. はじめに
データベースの作成方法を整理し、ダミーデータの入れ方も学ぶ。ダミー入れとくと開発時にデータが表示出来るか、追加・更新・削除が出来るかの確認もコストを下げることが出来ると思ふ。

[smalltalk](http://toolbox-smalltalk.herokuapp.com/login)

<br>

# 2. データベースの準備
[Laravel8レファレンス](https://readouble.com/laravel/8.x/ja/eloquent.html)

### ■ ファイル取得
> モデルとマイグレーション、ファクトリ、シーダ、ポリシー、コントローラ、フォームリクエストを生成する短縮形<br>

```
> php artisan make:model Note --all
```
下記のようなものが返ればOK
```
Model created successfully.
Factory created successfully.
Created Migration: 2021_11_21_052334_create_notes_table
Seeder created successfully.
Request created successfully.
Controller created successfully.
Policy created successfully.
```

### ■ マイグレーションファイル
> database>migrations>2021_11_21_052334_create_notes_table

```php
public function up()
{
    Schema::create('notes', function (Blueprint $table) {
        $table->bigIncrements('id');
        $table->BigInteger('user_id')->unsigned()->nullable();
        $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        $table->string('note');
        $table->timestamps();
    });
}

public function down()
{
    Schema::dropIfExists('notes');
}
```

※users主キーのデータ型がBigIntで指定されているならば、notesの外部キーである`user_id`もBigIntに合わせる必要がある。外部キーを設定した時は、外部キーの参照先のテーブルが先にマイグレーションしていないとエラーになる。

<br>

### ■ ダミーデータを入れる
---

<br>

> ログイン実装時（Laravel/ui）にusersテーブルの方は予めファクトリーファイル（ダミーデータをつくるためのファイル）が用意されてますね。万一ない場合は下記のコマンドを打つと作れます。

```
php artisan make:factory UserFactory
```

ではLaravel/uiの時に生成されたUserFactory.phpをみてみましょう。
```php
public function definition()
{
    return [
        'name' => $this->faker->name(),
        'email' => $this->faker->unique()->safeEmail(),
        'email_verified_at' => now(),
        'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
        'remember_token' => Str::random(10),
    ];
}

public function unverified()
{
    return $this->state(function (array $attributes) {
        return [
            'email_verified_at' => null,
        ];
    });
}
```

> php artisan make:model Note --allで生成されたNoteFactory.phpも下記のように編集する。
```php
<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Note; //notesテーブル参照
use App\Models\User; //usersテーブル参照

class NoteFactory extends Factory
{
    public function definition()
    {
        return [
            'user_id'=>User::factory(),
            'note'=>$this->faker->realText($maxNbChars = 25),
        ];
    }
}

```
※Laravel8より前の場合（実証は6.x）
```php
$factory->define(Note::class, function (Faker $faker) {
    return [
        'user_id' => $faker->numberBetween($min = 1, $max = 10),
        'note' => $faker->realText($maxNbChars = 150, $indexSize = 5),
    ];
});
```

Factoryファイルの中身が編集出来たら、`DatabaseSeeder.php`というファイルに下記の書けばダミーデータの生成を「実行」してくれます。（各テーブル10個作っちゃおう。）
```php
public function run()
{
    \App\Models\User::factory(10)->create();
    \App\Models\Note::factory(10)->create();
}
```
<br>

### ■ マイグレーション実行

  今回はダミーデータを生成しているので、`--seed`をつけている。
  ```
  php artisan migrate --seed
  ```

 1からマイグレーションし直す場合は下記のように`fresh`をつける
  ```
  php artisan migrate:fresh --seed
  ```

<br>

# 3. おわりに
Laravel Breezeのキャッチアップもしなくちゃ。Jet Streamもどうかな。。。

</nuxt-content-wrapper>
