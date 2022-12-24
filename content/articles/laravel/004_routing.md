---
title: ルーティング
description: ビューや機能用のURLを設定
category: laravel
createdAt: 2021-11-21
updatedAt: 2021-11-21
sortNumber: 004
path: "/articles/laravel/004_routing"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. ルーティング（URL）を設定しましょう。](#2-ルーティングurlを設定しましょう)
- [3. おわりに](#3-おわりに)

<br>

# 1. はじめに
 ユーザーが見る画面表示（ビュー）や機能（追加、更新、削除など）用にurlを作成しよう。

<br>

# 2. ルーティング（URL）を設定しましょう。
何を設定するのか？
- GET送信かPOST送信か
- URLを任意に設定
- Controllerの中のメソッドを指定
- ルートに名前を決めることが出来る＝`->name(任意の名前)`

※Laravel/uiでログイン機能を実装した場合はweb.phpに`Auth::routes();`を追加しましょう。

```php
<?php

use Illuminate\Support\Facades\Route;

// ログイン機能用
Auth::routes();

// ノート（上から表示・保存・編集・更新・削除用）
Route::get('/', [App\Http\Controllers\NoteController::class, 'show'])->name('note.show');
Route::post('/note/store', [App\Http\Controllers\NoteController::class, 'store'])->name('note.store');
Route::post('/note/edit', [App\Http\Controllers\NoteController::class, 'edit'])->name('note.edit');
Route::post('/note/update', [App\Http\Controllers\NoteController::class, 'update'])->name('note.update');
Route::get('/note/destroy/{note}', [App\Http\Controllers\NoteController::class, 'destroy'])->name('note.destroy');
```

※Larabelより前はこんな感じ
```php
Route::get('note/show','NoteController@show')->name('note.show');
Route::post('note/store','NoteController@store')->name('note.store');
Route::post('note/edit','NoteController@edit')->name('note.edit');
Route::get('note/destroy/{note}','NoteController@destroy')->name('note.destroy');
```

<br>

# 3. おわりに
 Laravel8以降はルーティングの書き方も変わっている。私のかんばんアプリはLaravel8以降も6と同じルーティングをしているんだけど、どのようにやったっけ。少し確認しておこう。

 </nuxt-content-wrapper>
