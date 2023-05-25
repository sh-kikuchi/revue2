---
title: DB接続とCRUD-SQLite篇-
description: ダイアリーを作ってみよう。
category: flutter
createdAt: 2021-07-11
updatedAt: 2021-07-11
sortNumber: 006
path: "/articles/flutter/006_sqllite_crud"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. pubspec.yaml](#2-pubspecyaml)
- [3. テーブルの準備](#3-テーブルの準備)
    - [■ まずはsqlliteをインポートしよう。](#-まずはsqlliteをインポートしよう)
    - [■ SQLiteのカラム](#-sqliteのカラム)
    - [■ SQLのテーブル作成](#-sqlのテーブル作成)
    - [■ DB初期化](#-db初期化)
- [4. CRUD](#4-crud)
    - [■ Create](#-create)
    - [■ Read](#-read)
      - [【全検索】](#全検索)
      - [【条件付き検索】](#条件付き検索)
    - [■ Update](#-update)
    - [■ Delete](#-delete)
- [5. 全文](#5-全文)
- [6. おわりに](#6-おわりに)

<br>

# 1. はじめに
データベースを使ってみよう。今回はローカルにデータを保存するSQLLite3を使う。

```
プロジェクトディレクトリ
│
│── lib
│   │──main
│      │── sql_helper.dart
│      │── main.dart
│
```

<br>

# 2. pubspec.yaml
```yaml
dependencies:
  flutter:
    sdk: flutter
  sqflite: 2.0.3
  provider: ^5.0.0
  path_provider: ^2.0.2
  image_picker: ^0.8.0+1
  intl: ^0.17.0
  flutter_lints: ^2.0.1
  cupertino_icons: ^1.0.2
```

<br>

# 3. テーブルの準備
### ■ まずはsqlliteをインポートしよう。
```dart
import 'package:sqflite/sqflite.dart' as sql;
```

<br>

### ■ SQLiteのカラム
- TEXT(テキスト)
- NUMERIC
- INTEGER（整数）
- REAL(浮動小数点数。8バイトで格納)
- NONE（Null値）
- BLOB(バイナリデータ)

※SQLiteのデータ型の決定方法
https://so-zou.jp/web-app/tech/database/sqlite/data/data-type.htm

<br>

### ■ SQLのテーブル作成
テーブル`notes`を作成。下記のカラムを用意してみる。
- idは自動連番
- dateは日付
- titleは日記のタイトル
- imageは添付画像
- descriptionは日記内容
- createdAtは作成日
```dart
import 'package:sqflite/sqflite.dart' as sql

class SQLHelper {
  //テーブル作成
  static Future<void> createTables(sql.Database database) async {
    await database.execute("""CREATE TABLE notes(
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        title TEXT,
        date INTEGER,
        description TEXT,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
      """
     );
  }
  //これより下にCRUD処理を書く
}
```

<br>

### ■ DB初期化 
```dart
static Future<sql.Database> db() async {
  return sql.openDatabase(
    'notes.db',
    version: 1,
    onCreate: (sql.Database database, int version) async {
      await createTables(database);
    },
  );
}
```

<br>

# 4. CRUD

### ■ Create
```dart
static Future<int> createItem(String? title, Datetime? date, String? description ) async {
  final db = await SQLHelper.db();

  final data = {
    'title': title,
    'date': date, 
    'description': description
  };
  final id = await db.insert('notes', data,
      conflictAlgorithm: sql.ConflictAlgorithm.replace);
  return id;
}
```
<br>

### ■ Read
#### 【全検索】
```dart
static Future<List<Map<String, dynamic>>> getNotes() async {
  final db = await SQLHelper.db();
  return db.query('notes', orderBy: "id");
}
```

<br>

#### 【条件付き検索】
特定のIDに紐づいたデータを取得する。
> `where: "id = ?"`
```dart
  static Future<List<Map<String, dynamic>>> getJournal(int id) async {
    final db = await SQLHelper.db();
    return db.query('notes', where: "id = ?", whereArgs: [id]);
  }
```

<br>

### ■ Update
特定のIDに紐づいたデータを更新する。
```dart
static Future<int> updateItem(
    int id, String? title, Datetime? date, String? description) async {
  final db = await SQLHelper.db();

  final data = {
    'title': title,
    'date' : date,
    'description': description,
    'createdAt': DateTime.now().toString()
  };

  final result =
      await db.update('notes', data, where: "id = ?", whereArgs: [id]);
  return result;
}
```

<br>

### ■ Delete
特定のIDに紐づいたデータを削除する。
```dart
static Future<void> deleteItem(int id) async {
  final db = await SQLHelper.db();
  try {
    await db.delete("notes", where: "id = ?", whereArgs: [id]);
  } catch (err) {
    debugPrint("エラー: $err");
  }
}
```

<br>

# 5. 全文
<details>

```dart
import 'package:flutter/foundation.dart';
import 'package:sqflite/sqflite.dart' as sql;

class SQLHelper {
  static Future<void> createTables(sql.Database database) async {
    await database.execute("""CREATE TABLE notes(
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        title TEXT,
        date INTEGER,
        description TEXT,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
      """
     );
  }

  static Future<sql.Database> db() async {
    return sql.openDatabase(
      'notes.db',
      version: 1,
      onCreate: (sql.Database database, int version) async {
        await createTables(database);
      },
    );
  }

  // Create
  static Future<int> createItem(String? title, Datetime? date, String? description ) async {
    final db = await SQLHelper.db();

    final data = {
      'title': title,
      'date': date, 
      'description': description
    };
    final id = await db.insert('notes', data,
        conflictAlgorithm: sql.ConflictAlgorithm.replace);
    return id;
  }

  // Read (all)
  static Future<List<Map<String, dynamic>>> getNotes() async {
    final db = await SQLHelper.db();
    return db.query('notes', orderBy: "id");
  }

  // Read (id)
  static Future<List<Map<String, dynamic>>> getItem(int id) async {
    final db = await SQLHelper.db();
    return db.query('notes', where: "id = ?", whereArgs: [id]);
  }

  // Update
  static Future<int> updateItem(
      int id, String? title, Datetime? date, String? description) async {
    final db = await SQLHelper.db();

    final data = {
      'title': title,
      'date' : date,
      'description': description,
      'createdAt': DateTime.now().toString()
    };

    final result =
        await db.update('notes', data, where: "id = ?", whereArgs: [id]);
    return result;
  }

  // Delete
  static Future<void> deleteItem(int id) async {
    final db = await SQLHelper.db();
    try {
      await db.delete("notes", where: "id = ?", whereArgs: [id]);
    } catch (err) {
      debugPrint("エラー: $err");
    }
  }
}
```
</details>

<br>

# 6. おわりに
作成中

</nuxt-content-wrapper>
