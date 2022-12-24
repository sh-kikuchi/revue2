---
title: CRUDチュートリアル（追加）
description: PDOを用いたCreate処理
category: php
createdAt: 2021-11-13
updatedAt: 2022-03-19
sortNumber: 8
path: "/articles/php/008_create"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. まずはフォームから](#2-まずはフォームから)
- [3. create処理用のphpファイルを用意](#3-create処理用のphpファイルを用意)
- [4. おわりに](#4-おわりに)

<br>

# 1. はじめに
CRUDの「C」、Create（追加）の処理を整理する。
```
プロジェクトディレクトリ
│
│── crud_tutorial
│   │── crud
│   │   │── create.php　←【今回、ココ】
│   │   │── delete.php
│   │   │── update.php
│   │
│   │── comment.php
│   │── create_form.php　←【今回、ココ】
│   │── update_form.php
│
│── database
│   │── db_connect.php
```

# 2. まずはフォームから
>  コメントを追加する用のフォームをつくる。
>  1. フォームの`method`をPOST送信とすること
>  2. 各フォーム要素にname属性をつけること（POST送信する上で肝）
>  3. `action`にはcreate処理が書かれたphpファイルを設定

```html
<div class="crud-container">
  <div>
    <h2 class="crud-title">コメントを追加しましょう</h2>
    <section class="crud-form-contents">
      <form method="post" action="../crud_tutorial/crud/create.php">
        <div>
          <label for="name">お名前（ニックネーム可）</label>
          <input name="name" class="crud-form-input" placeholder="名前を入力">
        </div>
        <div>
          <label for="title">タイトル</label>
          <input name="title" class="crud-form-input" placeholder="タイトルを入力">
        </div>
        <div>
          <label for="comment">コメント</label>
          <textarea name="comment" class="crud-form-input" rows="10" cols="20" placeholder="150字以内で入力して下さい" maxlength=150 required></textarea>
        </div>
          <button type="submit" class="crud-form-submit">追加</button>
        </div>
      </form>
    </section>
  </div>
</div>
?>
```

# 3. create処理用のphpファイルを用意
> create.phpとし、データベースの追加処理を記述していく。
>  1. require_onceでDB接続ファイルの呼び出し
>  2. フォームから値を受け取る
>  3. `insert`で追加処理を行う

```php
<?php
//require_onceでDB接続ファイルの呼び出し
require_once("../../database/db_connect.php");
$pdo = db_connect();

//フォームから値を受け取る
$title = $_POST["name"];
$title = $_POST["title"];
$comment = $_POST["comment"];

try{
  $sql = "insert into comments(name,title,comment) values(:name,:title,:comment)";
  $stmt = $pdo->prepare($sql);
  $stmt->bindValue(":name", $title, PDO::PARAM_STR);
  $stmt->bindValue(":title", $title, PDO::PARAM_STR);
  $stmt->bindValue(":comment", $comment, PDO::PARAM_STR);
  $stmt->execute();
  header('Location:../comment.php');
}catch(Exception $e){
  echo $e -> getMessage();
}
?>
```

<br>

# 4. おわりに
これで、DBに追加できるようになったね(´▽｀*) サインアップでもやったので今回はおさらいに近いが、こっそりInsert文の書き方が別バージョンで書いてみている。次は追加した項目をリストで表示出来るようにする。

</nuxt-content-wrapper>
