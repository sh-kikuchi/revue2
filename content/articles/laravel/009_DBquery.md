---
title: DB操作のいろいろ
description: DBファザード
category: laravel
createdAt: 2021-12―02
updatedAt: 2021-12-02
sortNumber: 009
path: "/articles/laravel/009_dbquery"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. DBクラス共通の記述](#2-dbクラス共通の記述)
- [3. DBクラスによる操作(クエリビルダ)](#3-dbクラスによる操作クエリビルダ)
    - [■ SELECT](#-select)
    - [■ SELECT(条件付き)](#-select条件付き)
    - [■ CREATE](#-create)
    - [■ UPDATE](#-update)
    - [■ DELETE](#-delete)
- [4. おわりに](#4-おわりに)

<br>

# 1. はじめに
LaravelのDB操作もやり方は色々ある。これまではEloquentでCRUDをやっていたが、より生のSQLに近い書き方も出来る。ので、その方法のまとめ。

<br>

# 2. DBクラス共通の記述
DBクラスでもクエリビルダでもDBファサードによる記述のため`Illuminate\Support\Facades\DB`をuseします。

```php
use Illuminate\Support\Facades\DB;
```

<br>

# 3. DBクラスによる操作(クエリビルダ)
`DB::SQL値(SQL文、パラメータ配列)`で記述する方法を使う。SQL文をそのまま使用するイメージなので、SQL学習者であれば、こちらの方が取っつきやすい。

<br>

### ■ SELECT
```php
public function select(Request $request) {
 $items = DB::select('SELECT * from users');
 return view('sample.index',['items' => $items]);
}
```

<br>

### ■ SELECT(条件付き)
```php:
public function select(Request $request) {
 $items = DB::select('SELECT * from users where id =:id', ['id'=>$request->id]);
 return view('sample.index',['items' => $items[0]]);
}
```

<br>

### ■ CREATE
```php
$param = [
    'id' => $request->input('id'),
    'name' => $request->input('name'),
    'email' => $request->input('email'),
    'age' => $request->input('age'),
];
DB::table('users')->insert($param);
```

<br>

### ■ UPDATE
```php
public function update(Request $request) {
 $param = [
  'id' => $request->id
  'name' => $request->name,
  'age' => $request->age,
 ];
 DB::update('UPDATE users set name=:name, email=:email where id=:id', $param);
}
```

<br>

### ■ DELETE
```php
public function dalete(Request $request) {
  $param = ['id' => $request->id];
  DB::delete('DELETE from sample where id =:id', $param);
}

```

<br>

# 4. おわりに
自分がアプリを作る時には使わないが、一応、Laravelユーザーのたしなみとして少しまとめておいた。参考は下記のもの。Laravel6だけど、9でもきっと大丈夫。

<br>

[データベース：利用開始]
(https://readouble.com/laravel/6.x/ja/database.html)
[データベース：クリエビルダ]
(https://readouble.com/laravel/6.x/ja/queries.html)

</nuxt-content-wrapper>
