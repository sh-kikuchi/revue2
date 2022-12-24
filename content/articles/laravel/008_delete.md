---
title: CRUD_Delete
description: 削除機能の実装
category: laravel
createdAt: 2021-11-15
updatedAt: 2021-11-21
sortNumber: 008
path: "/articles/laravel/008_delete"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. ノート記事を削除出来るようにしよう（DELETE）](#2-ノート記事を削除出来るようにしようdelete)
    - [■ `show.blade.php`に削除ボタンを追加](#-showbladephpに削除ボタンを追加)
    - [■ NoteControllerに削除機能を追加](#-notecontrollerに削除機能を追加)
- [3. おわりに](#3-おわりに)

<br>

# 1. はじめに
（面倒なので再放送）
LaravelのCRUDをEloquentでやってみる。CRUDとはCreate（作成）・Read（表示）・Update（更新）・Delete（削除）のそれぞれの頭文字をとったもの。

<br>

# 2. ノート記事を削除出来るようにしよう（DELETE）

### ■ `show.blade.php`に削除ボタンを追加
---

<br>

```html
@foreach($notes as $note)
<div class="media shadow-sm p-3 mb-1 bg-white rounded">
    <div class="media-body px-1 text-break">
        {{ $note -> note }}
        <div class="float-right">
            <button type="submit" class="btn btn-primary js-modal-open" href="" data-target="note-modal" data-note_id="{{$note->id}}" data-note_text="{{ $note-> note }}">編集</button>
            <!-- ここから -->
            <a class="btn btn-danger"  onclick="return confirm('このカードを削除して良いですか?')" rel="nofollow" data-method="delete" href="/note/destroy/{{ $note->id }}">削除</a>
            <!-- ここまで -->
        </div>
    </div>
</div>
@endforeach

```

### ■ NoteControllerに削除機能を追加
```php
    public function destroy(Note $note)
    {
        $note = Note::find($note->id);
        $note->delete();
        return redirect('/');
    }
```
<br>

# 3. おわりに
データの削除完了。これでCRUDはおしまい。無敵です。

</nuxt-content-wrapper>
