---
title: リレーション
description: DB間の関係性を考えよう。
category: laravel
createdAt: 2021-11-21
updatedAt: 2021-11-21
sortNumber: 003
path: "/articles/laravel/003_relation"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. モデルファイルでリレーションを構築する。](#2-モデルファイルでリレーションを構築する)
    - [■ User.php](#-userphp)
    - [■ Note.php](#-notephp)
- [3. おわりに](#3-おわりに)

<br>

# 1. はじめに
テーブル間の関係性が「1対1」なのか「1対1」なのか「多対多」なのかを設定しておくと、EloquentというLaravelならではのDB操作が使えるので便利。

<br>

# 2. モデルファイルでリレーションを構築する。
> app ＞modelsの中にmodelファイルはあります。

> usersとnotesの関連性を考えましょう。ある1人のユーザーは多くのノート（投稿内容）を持つことが出来る。このユーザー対ノートの関係性は「1対多」といえます。

### ■ User.php
> 親子関係で考えた場合、usersはnotesの親テーブル。User.phpには、Note.phpに対して`$this->hasMany`を設定しましょう。ファンクション名は複数形にしておくと良い。

```php
    public function notes(){
        return $this->hasMany('app\Models\Theme');
    }
```

### ■ Note.php
> 親子関係で考えた場合、notesはusersの子テーブル。Note.phpにはUser.phpに対して`this-belongsTo`を設定しましょう。ファンクション名は単数形にしておくと良い。

※「〇〇::class」という形で書く場合は、ファイルの上部で`use App\Models\〇〇`のようにディレクトリを指定してあげましょう。

```php
<?php

namespace App\Models;
（中略）
use App\Models\User; //追加

class Note extends Model
{
    use HasFactory;

    public function user(){
        return $this->belongsTo(User::class); //追加
    }
}

```

<br>

# 3. おわりに
このアプリ作成に限らず、もう少しリレーションのパターンは網羅しておくべきかな。。。

</nuxt-content-wrapper>
