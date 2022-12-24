---
title: CRUDチュートリアル（削除）
description: PDOを用いたDelete処理
category: php
createdAt: 2021-11-13
updatedAt: 2022-03-19
sortNumber: 11
path: "/articles/php/011_delete"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
    - [comment.php](#commentphp)
- [2. delete処理用のphpファイルを用意](#2-delete処理用のphpファイルを用意)
- [3. おわりに](#3-おわりに)

<br>

# 1. はじめに
CRUDの「D」、Delete（読込・表示）の処理を整理する。
```
プロジェクトディレクトリ
│
│── crud_tutorial
│   │── crud
│   │   │── create.php
│   │   │── delete.php　←【今回、ココ】
│   │   │── update.php
│   │
│   │── comment.php
│   │── create_form.php
│   │── update_form.php
│
│── database
│   │── db_connect.php
```

### comment.php
> フォームで削除ボタンをつくりました(POST通信)。URLにコメントのidを乗せたGET送信だと、知らない人がURLをたたくだけで削除出来てしまいます。
```html
<div>
    <form name="id"  method="POST" action="../crud_tutorial/crud/delete.php">
        <input hidden class="crud-form-input" name="id" value="<?php echo h($comment["id"]); ?>">
        <button type="submit" class="crud-delete">削除</button>
    </form>
</div>
```

<br>

# 2. delete処理用のphpファイルを用意
> delete.phpとし、データベースの削除処理を記述していきます。
>  1. require_onceでDB接続ファイルの呼び出し
>  2. フォームから値を受け取る
>  3. `delete`で追加処理を行う

```php
<?php
  require_once("../db_connect.php");

  $id = intval($_POST["id"]);

  try{
    $sql = "DELETE FROM comments WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(":id", $id, PDO::PARAM_INT);
    $stmt->execute();
    header('Location:../../views/store/detail.php');
    exit;
  }catch(Exception $e){
    echo $e->getMessage();
  }
?>
```

<br>

# 3. おわりに
項目削除も実装完了。CRUDコンプリートでござい〼。

</nuxt-content-wrapper>
