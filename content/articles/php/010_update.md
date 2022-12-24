---
title: CRUDチュートリアル（更新）
description: PDOを用いたUpdate処理
category: php
createdAt: 2021-11-13
updatedAt: 2022-03-19
sortNumber: 10
path: "/articles/php/010_update"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
    - [comment.php](#commentphp)
- [2. update\_form.phpを作ろう（DB連携や操作部分）](#2-update_formphpを作ろうdb連携や操作部分)
  - [update\_form.phpを作ろう（UI部分）](#update_formphpを作ろうui部分)
- [3. update処理用のphpファイルを用意](#3-update処理用のphpファイルを用意)
- [4. おわりに](#4-おわりに)

<br>

# 1. はじめに
CRUDの「U」、Update（更新）の処理を整理する。
```
プロジェクトディレクトリ
│
│── crud_tutorial
│   │── crud
│   │   │── create.php
│   │   │── delete.php
│   │   │── update.php　←【今回、ココ】
│   │
│   │── comment.php
│   │── create_form.php
│   │── update_form.php　←【今回、ココ】
│
│── database
│   │── db_connect.php
```

<br>

### comment.php
>  comment.phpでは下記のように更新用フォーム遷移するためのリンクを用意していました。ここではGET送信でコメントのIDを拾うようにしてます。
```html
  <div>
      <a class="crud-edit" href="../crud_tutorial/update_form.php?id=<?php echo $comment["id"]; ?>">編集</a>
  </div>
```

<br>

# 2. update_form.phpを作ろう（DB連携や操作部分）
> ここでは、更新（編集）したいコメントを表示するようにします。
>  1. require_onceでDB接続用のdb_connect.phpを呼び出す。
>  2. 抽出したいデータをSQLで書く。
>  3. SQL文をデータベースに対して発行
```php
 <?php
  require_once '../fragile/index.php';
//DB接続設定
  require_once '../database/db_connect.php';
  $pdo = db_connect();

  //URLから値を受け取る（GET送信）
  $id = intval($_GET["id"]);

  //SQL文
  $sql  ="SELECT *
          FROM comments
          WHERE id = $id
          ORDER BY updated_at desc;";

  //PDOのquery機能
  $comments = $pdo->query($sql);
?>
```
<br>

## update_form.phpを作ろう（UI部分）
> 更新（編集）したいコメントを表示するようにします。
>  1. foreach文で$commentsを【表示】させていく。
>  2. htmlspecialchars関数でXSS対策をする。
>  3. フォームの`method`をPOST送信とすること
>  4. 各フォーム要素にname属性をつけること（POST送信する上で肝）
>  5. `action`にはupdate_form処理が書かれたphpファイルを設定

```html
<div class="crud-container">
    <h2 class="crud-title">コメントを編集します</h2>
    <section class="crud-form-contents">
        <?php foreach ($comments as $comment){?>
        <form method="post" action="../crud_tutorial/crud/update.php">
            <div>
              <input hidden name="id" value="<?php echo h($comment["id"]);?>">
            <div>
              <label for="title">タイトル</label>
              <input name="title" class="crud-form-input" placeholder="名前を入力" value="<?php echo h($comment["title"]);?>">
            </div>
            <div>
              <label for="comment">コメント</label>
              <textarea name="comment" class="crud-form-input" rows="10" cols="20"><?php echo h($comment["comment"]);?></textarea>
            </div>
              <button type="submit" class="crud-form-submit">編集</button>
            </div>
      </form>
      <?php } ?>
    </section>
</div>
```

<br>

# 3. update処理用のphpファイルを用意
> update.phpとし、データベースの追加処理を記述していきます。
>  1. require_onceでDB接続ファイルの呼び出し
>  2. フォームから値を受け取る
>  3. `update`で追加処理を行う

```php
<?php
  require_once("../../database/db_connect.php");
  $pdo = db_connect();

  $id = $_POST["id"];
  $title = $_POST["title"];
  $comment = $_POST["comment"];

  try{
    $sql = "UPDATE comments SET title = :title, comment = :comment WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(":id", $id, PDO::PARAM_INT);
    $stmt->bindValue(":title", $title, PDO::PARAM_STR);
    $stmt->bindValue(":comment", $comment, PDO::PARAM_STR);
    $stmt->execute();
    header('Location:../comment.php');
    exit;
  }catch(PDOException $e){
      echo '更新に失敗しました。', $e->getmessage();
      exit();
  }
?>
```

<br>

# 4. おわりに
リストから編集したい項目を選んで、更新することが出来るようになった。次回はCRUDの最後「D」。削除処理を整理していく。

</nuxt-content-wrapper>
