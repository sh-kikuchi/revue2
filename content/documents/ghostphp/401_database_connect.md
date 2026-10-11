---
title: DataBaseConnect クラス
category: php
createdAt: 2025-10-12
updatedAt: 2026-10-03
sortNumber: 401
path: "/documents/ghostphp/v4.0/401_databaseconnect_class"
---

<nuxt-content-wrapper>

`DataBaseConnect` クラスは、PDO を用いてデータベース接続を管理する。環境変数から接続情報を取得し、例外発生時にはエラーメッセージを表示して終了する。

> v4.0での変更点:
> 1. **同一リクエスト内ではPDO接続を1本に共有する**ようになった。旧版は `new DataBaseConnect()` のたびに新しい接続を作っていたため、
>    `Service` が開始したトランザクションが、別の接続を持つ各 `Repository` の更新に効いていなかった。接続を共有することで、
>    `Service::beginTransaction()` 〜 `commit()` / `rollBack()` の間に行った全 `Repository` の操作がまとめて確定・取り消しされる（[502_service_class.md](502_service_class.md)参照）。
> 2. 共有接続を破棄する `reset()` を追加した（主にテスト用）。
>
> なお `Repository` 側はテスト用に外部からPDOを注入できるが、本番コードでは `DataBaseConnect` が唯一のPDO生成経路である（[402_repository_class.md](402_repository_class.md)参照）。

## 1. コード

```php
<?php

namespace app\aura\database;

use PDO;
use PDOException;

class DataBaseConnect {
    private static ?PDO $shared = null;

    private $pdo;

    public function __construct() {
        // 同一リクエスト内では接続を1本に揃え、Serviceのトランザクションを全Repositoryに効かせる
        $this->pdo = self::$shared ??= $this->connect();
    }

    public static function reset(): void {
        self::$shared = null;
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
- プロパティ
  - `$shared`（static）
    - 同一リクエスト内で共有するPDOインスタンス。最初の `new DataBaseConnect()` で生成され、以降のインスタンスはこれを使い回す
  - `$pdo`
    - このインスタンスが返すPDO（中身は `$shared` と同じ）
- コンストラクタ (`__construct`)
  - 共有接続があればそれを使い、無ければ `connect()` で接続を確立して共有接続として保持する。
  - そのため `Repository` を何個生成しても、DB接続は1本になる。
- メソッド
  - `reset()`（static）
    - 共有接続を破棄する。次の `new DataBaseConnect()` で新しい接続が作られる
    - 主にテストで、テストケース間に接続やトランザクションの状態を持ち越さないために使う
  - `connect()`
    - 環境変数（`$_ENV['DB_HOST']` / `DB_NAME` / `DB_USER` / `DB_PASS`）から接続情報を取得。
    - PDO インスタンスを生成し、エラー発生時は例外をキャッチしてメッセージを出力して終了する。
    - UTF-8（utf8mb4）で接続。
  - `getPDO()`
    - 接続済みの PDO インスタンス（共有接続）を返す。

> **注意**: 接続を共有しているため、どこかで開始したトランザクションは同じリクエスト内の全ての処理に影響する。
> トランザクションの開始・確定・取り消しは `Service` で行い、`Repository` など他の場所で `beginTransaction()` / `rollBack()` を呼ばないこと。

## 3. 使い方 / 利用例
- `use app\aura\database\DataBaseConnect;` でクラスを読み込む。
```php
use app\aura\database\DataBaseConnect;

$dbConnect = new DataBaseConnect();
$pdo = $dbConnect->getPDO(); // 同じリクエスト内なら、何度 new しても同じPDOが返る

$stmt = $pdo->query("SELECT * FROM users");
$users = $stmt->fetchAll();

foreach ($users as $user) {
    echo $user['name'] . "<br>";
}
```

- 接続情報は `.env` ファイルに設定する（プロジェクトルート、Git管理対象外）：
```env
DB_HOST=localhost
DB_NAME=ghostphp_db
DB_USER=root
DB_PASS=secret
```

- リポジトリには開発時の設定キー一覧の参考として `.env.dev` が同梱されている（実際の値は各自の環境用に `.env` として別途作成する）。

</nuxt-content-wrapper>
