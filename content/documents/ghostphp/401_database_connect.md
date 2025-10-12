---
title: DataBaseConnect クラス
category: php
createdAt: 2025-10-12
updatedAt: 2025-10-12
sortNumber: 401
path: "/documents/ghostphp/401_databaseconnect_class"
---

<nuxt-content-wrapper>

`DataBaseConnect` クラスは、PDO を用いてデータベース接続を管理する。環境変数から接続情報を取得し、例外発生時にはエラーメッセージを表示して終了する。

## 1. コード

```php
<?php

namespace app\aura\database;

use PDO;
use PDOException;

class DataBaseConnect {
    private $pdo;

    public function __construct() {
        $this->pdo = $this->connect();
    }

    private function connect() {
        $host = $_ENV['DB_HOST'];
        $db   = $_ENV['DB_NAME'];
        $user = $_ENV['DB_USER'];
        $pass = $_ENV['DB_PASS'];
       
        $dsn = "mysql:host=$host;dbname=$db;charset=utf8mb4";

        try {
            $pdo = new PDO($dsn, $user, $pass, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            ]);
            return $pdo;
        } catch (PDOException $e) {
            echo $e->getMessage();
            exit();
        }
    }

    public function getPDO() {
        return $this->pdo;
    }
}
```

## 2. コード説明
- コンストラクタ (__construct)
  - クラスのインスタンス生成時に自動でデータベース接続を確- 立。
- メソッド
  - connect()
    - 環境変数から接続情報を取得。
    - PDO インスタンスを生成し、エラー発生時は例外をキャッチ- してメッセージを出力。
    - UTF-8（utf8mb4）で接続。
  
  - getPDO()
    - 接続済みの PDO インスタンスを返す。

## 3. 使い方 / 利用例
- `use app\aura\database\DataBaseConnect;` でクラスを読み込む。
```php
use app\aura\database\DataBaseConnect;

// データベース接続
$dbConnect = new DataBaseConnect();
$pdo = $dbConnect->getPDO();

// クエリ実行例
$stmt = $pdo->query("SELECT * FROM users");
$users = $stmt->fetchAll();

foreach ($users as $user) {
    echo $user['name'] . "<br>";
}
```
- 接続情報は .env ファイルに設定しておく：
```
DB_HOST=localhost
DB_NAME=ghostphp_db
DB_USER=root
DB_PASS=secret
```
上記プロジェクトディレクトリに配置する。

</nuxt-content-wrapper>