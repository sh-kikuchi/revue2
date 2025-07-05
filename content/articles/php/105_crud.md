---
title: CRUD
description: データベース篇5
category: php
createdAt: 2021-11-14
updatedAt: 2023-07-08
sortNumber: 105
path: "/documents/ghostphp/104_db_output"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
    - [概要](#概要)
    - [前提](#前提)
- [2. Create](#2-create)
- [3. Read](#3-read)
    - [■ 全件検索](#-全件検索)
    - [■ 部分検索](#-部分検索)
- [4. Update](#4-update)
- [5. Delete](#5-delete)
- [4. おわりに](#4-おわりに)
    - [■ セルフレビュー](#-セルフレビュー)
    - [■ 参考](#-参考)

<br>

# 1. はじめに
### 概要
今回はCRUD

### 前提
- PDO連携が完了していること(読み込みが必要)
```html
│
│── database
│   │
│   │── db_connect.php

```

<br>

# 2. Create
```php
public function create($postData){
    $result = false;
    $pdo    = db_connect();
    $sql    = "INSERT INTO artists(user_id, name, debut, start_date, end_date) VALUES(:user_id, :name, :debut, :start_date, :end_date)";
    $stmt   = $pdo->prepare($sql);

    $user_id    = $postData["user_id"];
    $name       = $postData["name"];
    $debut      = $postData["debut"];
    $start_date = $postData["start_date"];
    $end_date   = $postData["end_date"];

    try{
        $pdo->beginTransaction();
        $stmt->bindValue(":user_id", $user_id, PDO::PARAM_INT);
        $stmt->bindValue(":name", $name, PDO::PARAM_STR);
        $stmt->bindValue(":debut", $debut, PDO::PARAM_STR);
        $stmt->bindValue(":start_date", $start_date, PDO::PARAM_STR);
        $stmt->bindValue(":end_date", $end_date, PDO::PARAM_STR);
        $stmt->execute();
        $pdo->commit();
        $result = true;
    }catch(Exception $e){
        $pdo->rollBack();
        error_log($e -> getMessage());
    }finally{
        return $result;
    }
}
```

# 3. Read
### ■ 全件検索
```php
  public function show(){
    $pdo = db_connect();
    $sql = "SELECT * FROM artists ORDER BY id ASC;";
    $artists = $pdo->query($sql);
    return $artists->fetchAll();
  }
```

<br>

### ■ 部分検索
```php
  public function show(){
    $pdo = db_connect();
    $sql = "SELECT * FROM artists WHERE id = $id;";
    $artist_count = $pdo->query($sql);
    return $artist_count;
  }
```

<br>

# 4. Update
```php
public function update($postData){
      $result = false;
      $pdo = db_connect();
      $sql = "UPDATE artists SET name = :name ,debut = :debut ,start_date = :start_date ,end_date = :end_date WHERE id = :id";
      $stmt = $pdo->prepare($sql);

      $id         = $postData["id"];
      $name       = $postData["name"];
      $debut      = $postData["debut"];
      $start_date = $postData["start_date"];
      $end_date   = $postData["end_date"];

      try{
          $pdo->beginTransaction();
          $stmt->bindValue(":id", $id, PDO::PARAM_INT);
          $stmt->bindValue(":name", $name, PDO::PARAM_STR);
          $stmt->bindValue(":debut", $debut, PDO::PARAM_STR);
          $stmt->bindValue(":start_date", $start_date, PDO::PARAM_STR);
          $stmt->bindValue(":end_date", $end_date, PDO::PARAM_STR);
          $stmt->execute();
          $pdo->commit();
          $result = true;
      }catch(PDOException $e){
          $pdo->rollBack();
          error_log($e->getmessage());
      }finally{
          return $result;
      }
  }
```

<br>

# 5. Delete
```php
  public function delete($postData){
      $result = false;
      $pdo = db_connect();
      $sql = "DELETE FROM artists WHERE id = :id";
      $stmt = $pdo->prepare($sql);
      $id = intval($postData["id"]);
      try{
          $pdo->beginTransaction();
          $stmt->bindValue(":id", $id, PDO::PARAM_INT);
          $stmt->execute();
          $pdo->commit();
          $result = true;
      }catch(Exception $e){
          $pdo->rollBack();
          error_log($e->getmessage());
      }finally{
          return $result;
      }
  }
```

<br>

# 4. おわりに
### ■ セルフレビュー
- 特になし

### ■ 参考
- 特になし

  

</nuxt-content-wrapper>
