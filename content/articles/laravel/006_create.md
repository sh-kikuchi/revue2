---
title: CRUD_Create
description: 追加機能の実装
category: laravel
createdAt: 2021-11-15
updatedAt: 2021-11-21
sortNumber: 006
path: "/articles/laravel/006_create"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. ノート記事を追加しよう（CREATE）](#2-ノート記事を追加しようcreate)
    - [■ views直下に「note」フォルダを作成](#-views直下にnoteフォルダを作成)
    - [■ NoteControllerに追加機能を追加](#-notecontrollerに追加機能を追加)
- [3. おわりに](#3-おわりに)

<br>

# 1. はじめに
（面倒なので再放送）
LaravelのCRUDをEloquentでやってみる。CRUDとはCreate（作成）・Read（表示）・Update（更新）・Delete（削除）のそれぞれの頭文字をとったもの。

<br>

# 2. ノート記事を追加しよう（CREATE）

### ■ views直下に「note」フォルダを作成

---

フォルダ内で`show.blade.php`

```html
@extends('layouts.app')

@section('content')
<div>
<h2>ひとりごと</h2>
<h5 class="pl-4">使い方は自由。todoリストやメモなどにお役立て下さい。</h5>
</div>
<form method="POST" action="{{ route('note.store') }}">
{{ csrf_field() }}
<div class="form-group row">
    <input class="form-control col-8 col-sm-10 ml-3" type="text" name = "note_text" placeholder="ひとりごとは200字でお願いします" maxlength="200" required>
    <button type="submit" class="btn btn-secondary col-2 col-sm-1 ml-2">投稿</button>
</div>
</form>
@foreach($notes as $note)
<div class="media shadow-sm p-3 mb-1 bg-white rounded">
    <div class="media-body px-1 text-break">
        {{ $note -> note }}
    </div>
</div>
@endforeach

@endsection
```

### ■ NoteControllerに追加機能を追加

---

- POSTなので、Request送信で値を受け取る。
- Noteモデルからインスタンスをつくる。
- $noteには該当のIDで検索したデータが格納されている。（Auth::User()->idはログインしているユーザーのIDを意味する。）
- DBの該当カラムに追加したい内容を格納して、保存→`save()`
```php
public function store(Request $request)
{
    $note = new Note;
    $note -> user_id = Auth::User()->id;
    $note -> note  = $request -> note_text;
    $note -> save();
    return redirect('/');
}
```
<br>

# 3. おわりに
データの追加完了。次はデータを更新するのじゃ。

</nuxt-content-wrapper>
