---
title: CRUD_Read
description: ビュー表示の実装
category: laravel
createdAt: 2021-11-15
updatedAt: 2021-11-21
sortNumber: 005
path: "/articles/laravel/005_read"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. DBのデータを表示しよう（READ）](#2-dbのデータを表示しようread)
    - [■ ビューの作成](#-ビューの作成)
    - [■ NoteController内で「表示」するメソッドを編集](#-notecontroller内で表示するメソッドを編集)
- [3. おわりに](#3-おわりに)

<br>

# 1. はじめに
LaravelのCRUDをEloquentでやってみる。CRUDとはCreate（作成）・Read（表示）・Update（更新）・Delete（削除）のそれぞれの頭文字をとったもの。

<br>

# 2. DBのデータを表示しよう（READ）

### ■ ビューの作成

---

（準備） views直下に「note」フォルダを作成（`show.blade.php`）<br>
　※下記コードではBootstrapを使用してます。

```html
<div>
<h2>ひとりごと</h2>
<h5 class="pl-4">使い方は自由。todoリストやメモなどにお役立て下さい。</h5>
</div>
@foreach($notes as $note)
<div class="media shadow-sm p-3 mb-1 bg-white rounded">
    <div class="media-body px-1 text-break">
        {{ $note -> note }}
    </div>
</div>
@endforeach
```

### ■ NoteController内で「表示」するメソッドを編集
---

<br>

> 変数`$notes`を設定し、eloquentを使ってDB抽出を行う。
> それから`return view`でビューの指定先と変数を指定する。

```php
<?php

namespace App\Http\Controllers;
//ログイン権限
use Illuminate\Support\Facades\Auth;
//Noteというmodelファイル使用
use App\Note; 
//post送信使う時はRequestもuseする
use Illuminate\Http\Request; 

class NoteController extends Controller
{
    //ログイン権限がある時のみ
    public function __construct(){
        $this->middleware('auth');
    }
    
    public function show()
    {
        $notes = Note::where('user_id',Auth::User()->id)
         ->orderBy('updated_at', 'desc')
         ->get();
        return view('note.show',['notes'=>$notes]);
    }
}
```

※ return view~はnoteフォルダの`show.blade.php`というビューファイルを返すよという意味。

<br>

# 3. おわりに
データの表示完了。次はデータを追加するのじゃ。

</nuxt-content-wrapper>
