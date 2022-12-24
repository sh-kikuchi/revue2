---
title: CRUD_Update
description: モーダルを使った更新機能の実装
category: laravel
createdAt: 2021-11-15
updatedAt: 2021-11-21
sortNumber: 007
path: "/articles/laravel/007_update"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. モーダル画面で更新処理が出来るようにしよう（UPDATE）](#2-モーダル画面で更新処理が出来るようにしようupdate)
    - [■ views直下に「note」フォルダを作成](#-views直下にnoteフォルダを作成)
    - [■ 編集ボタン](#-編集ボタン)
- [3.  モーダル画面を作ろう。（Laravel mix）](#3--モーダル画面を作ろうlaravel-mix)
    - [■ `app.blade.php`の下にモーダルを追加](#-appbladephpの下にモーダルを追加)
    - [■ script.jsを作成し、jQueryでモーダルをつくる。](#-scriptjsを作成しjqueryでモーダルをつくる)
    - [■ モーダル用のCSS](#-モーダル用のcss)
    - [■ NoteControllerに更新機能を追加](#-notecontrollerに更新機能を追加)
- [4. おわりに](#4-おわりに)

<br>

# 1. はじめに
（面倒なので再放送）
LaravelのCRUDをEloquentでやってみる。CRUDとはCreate（作成）・Read（表示）・Update（更新）・Delete（削除）のそれぞれの頭文字をとったもの。

<br>

今回は更新画面をモーダル画面にしてみようと。何してくれちゃっているのよって感じもあるけど。なので、Laravel記事にちょっとJavaScript交じり。それもjQueryさ。

<br>

# 2. モーダル画面で更新処理が出来るようにしよう（UPDATE）


<br>

### ■ views直下に「note」フォルダを作成
- フォルダ内で`show.blade.php`をを作成。
```php
<div>
<h2>ひとりごと</h2>
<h5 class="pl-4">使い方は自由。todoリストやメモなどにお役立て下さい。</h5>
</div>
@foreach($notes as $note)
<div class="media shadow-sm p-3 mb-1 bg-white rounded">
    <div class="media-body px-1 text-break">
        {{ $note -> note }}
        <div class="float-right">
            <!-- Button trigger modal -->
            <button type="submit" class="btn btn-primary js-modal-open" href="" data-target="note-modal" data-note_id="{{$note->id}}" data-note_text="{{ $note-> note }}"><i class="fas fa-pen"></i></button>
        </div>
    </div>
</div>
@endforeach

```

### ■ 編集ボタン
> クリックすると、モーダルが出てくるように。

※データ属性の設定
- data-target:モデル表示
- data-note_id:モーダル画面に`note_id`を渡す。
- data-note_text:モーダル画面にテキストの内容を渡す。

```html
<button type="submit" class="btn btn-primary js-modal-open" href="" data-target="note-modal" data-note_id="{{$note->id}}" data-note_text="{{ $note-> note }}">編集</button>
```

# 3.  モーダル画面を作ろう。（Laravel mix）

---

> resources/views/layouts/app.blade.php<br>
参考:[Laravel8 レファレンス](https://readouble.com/laravel/8.x/ja/mix.html)

■ `app.blade.php`の`<head>`タグに追加
```html
   <!-- Scripts -->
    <script src="{{ asset('js/script.js') }}" defer></script>

    <!-- Styles -->
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
```

### ■ `app.blade.php`の下にモーダルを追加
※app.blade.phpはビューのおおもと。

```html
<div id="note-modal" class="js-modal">
    <div class="modal-bg js-modal-close"></div>
    <div class="modal-content">
            <p class="text-center">編集</p>
            <form method="POST" action="{{ route('note.edit') }}">
                {{ csrf_field() }}
                <div class="form-group">
                <input type="text" hidden class="form-control input-note-id" name ="note_id">
                </div>
                <div class="form-group">
                    <label for="note-text" class="col-form-label">ひとりごと:</label>
                    <textarea class="form-control input-note-text" name="note_text" maxlength="200" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary mx-auto d-block">更新</button>
                <a class="js-modal-close float-right" href="">✕</a>
            </form>
    </div><!--modal__inner-->
</div><!--modal-->
```

### ■ script.jsを作成し、jQueryでモーダルをつくる。
> public/js/script.js <br>
> 編集ボタンをクリックした時に該当のIDとテキスト内容を表示する。
>（ただし、IDはinputタグでhiddenにしているので画面には表示されない）

```js
  $(function () {
    $('.js-modal-open').each(function () {
      $(this).on('click', function () {
        //データ属性から情報を取得し、変数に格納
        var target = $(this).data('target');
        var modal = document.getElementById(target);
        var note_id = $(this).data('note_id');
        var note_text = $(this).data('note_text');

        //モーダルの該当クラス名の所にデータ表示
        $('.input-note-id').val(note_id);
        $('.input-note-text').val(note_text);
        $(modal).fadeIn();
        return false;
      });
    });
    $('.js-modal-close').on('click', function () {
      $('.js-modal').fadeOut();
      return false;
    });
  });
```

### ■ モーダル用のCSS
```css
.js-modal{
    display: none;
    height: 100vh;
    position: fixed;
    top: 0;
    width: 100%;
}
.modal-bg{
    background: rgba(0,0,0,0.8);
    height: 100vh;
    position: absolute;
    width: 100%;
}
.modal-content{
    background: #fff;
    left: 50%;
    padding: 40px;
    position: absolute;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 60%;
}
```

> 【ポイント】<br>LaravelMixを使う場合、編集後は`npm run dev`！エラーなく、コンパイルされればOK！

<br>

### ■ NoteControllerに更新機能を追加

---

- POSTなので、Request送信で値を受け取る。
- findメソッドでnotesテーブルから該当のIDのデータを取得している。
- $noteには該当のIDで検索したデータが格納されている。
- DBの該当カラムに編集したい内容を格納して、保存→`save()`

```php
    public function edit(Request $request)
    {
        $note =Note::find($request -> note_id);
        $note -> note  =  $request -> note_text;
        $note -> save();
        return redirect('/');
    }
```
<br>

# 4. おわりに
データの更新完了。次はデータを削除するのじゃ。

</nuxt-content-wrapper>
