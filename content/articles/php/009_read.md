---
title: CRUDチュートリアル（読込）
description: PDOを用いたRead処理
category: php
createdAt: 2021-11-13
updatedAt: 2022-03-19
sortNumber: 9
path: "/articles/php/009_read"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. comment.phpを作ろう（DB連携や操作部分）](#2-commentphpを作ろうdb連携や操作部分)
- [3.comment.phpを作ろう（UI部分）](#3commentphpを作ろうui部分)
- [4. おわりに](#4-おわりに)

<br>

# 1. はじめに
CRUDの「R」、Read（読込・表示）の処理を整理する。
```
プロジェクトディレクトリ
│
│── crud_tutorial
│   │── crud
│   │   │── create.php
│   │   │── delete.php
│   │   │── update.php
│   │
│   │── comment.php　←【今回、ココ】
│   │── create_form.php
│   │── update_form.php
│
│── database
│   │── db_connect.php
```

<br>

# 2. comment.phpを作ろう（DB連携や操作部分）
> comment.phpというファイルを作ったとしよう。
>  そのファイルの最上行から下記のコードを記述していく。
>  1. require_onceでDB接続用のdb_connect.phpを呼び出す。
>  2. 抽出したいデータをSQLで書く。
>  3. SQL文をデータベースに対して発行

```php
<?php
  require_once '../fragile/index.php';
  require_once '../database/db_connect.php';
  $pdo = db_connect();

    try {
        //SQL文
        $sql  ="select * from comments order by updated_at desc;";
        //PDOのquery機能
        $comments = $pdo->query($sql);
    } catch(\Exception $e) {
      return false;
    }
?>
```

<br>

# 3.comment.phpを作ろう（UI部分）
> comment.phpの続きでし。
>  そのファイルの最上行から下記のコードを記述していきます。
>  1. foreach文でDBのデータが入った$commentsを【表示】させていく。
>  2. htmlspecialchars関数でXSS対策をする。
     [詳しくはこちら](https://tech-lab.sios.jp/archives/21780)

```html
<!-- 下記は<body>タグの中身 -->
  <div class="crud-container">
    <p class="crud-title">コメント一覧</p>
    <a class="crud-create" href="../crud_tutorial/create_form.php">コメントを追加する</a>
    <?php foreach ($comments as $comment){?>
    <div class="crud-card">
        <p class="crud-card-updated_at"><?php echo h($comment["updated_at"]);?></p>
        <h3 class="crud-card-title"> <?php echo h($comment["title"]);?></h3>
        <p class="crud-card-description"><?php echo h($comment["comment"]);?></p>

        <div class="crud-card-detail">
          <div>
              <a class="crud-edit" href="../crud_tutorial/update_form.php?id=<?php echo $comment["id"]; ?>">編集</a>
         </div>
          <div>
              <form name="id"  method="POST" action="../crud_tutorial/crud/delete.php">
                  <input hidden class="crud-form-input" name="id" value="<?php echo h($comment["id"]); ?>">
                  <button type="submit" class="crud-delete">削除</button>
              </form>
          </div>
    </div>
    </div>
  <?php }?>
</div>
```

<br>

# 4. おわりに
追加した項目をリストで表示出来るようになったので、編集と削除は現状出来ないのでこれから実装してみようと。

</nuxt-content-wrapper>
