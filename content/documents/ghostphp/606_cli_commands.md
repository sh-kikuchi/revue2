---
title: CLIコマンド（ghost / migrate / seed / CSV入出力）
description: プロジェクトルートの `ghost` スクリプトによるコマンドライン操作
category: php
createdAt: 2026-09-15
updatedAt: 2026-09-15
sortNumber: 606
path: "/documents/ghostphp/v4.0/606_cli_commands"
---

<nuxt-content-wrapper>

> このドキュメントは既存の `docs/` には存在しなかった内容（新規作成）。GhostPHPには
> `aura/utils/commands/` 配下にCLI用のコマンドクラスが用意されており、プロジェクトルートの
> `ghost` スクリプトから実行する。マイグレーション・シーディング・CSV入出力に対応する。

## 1. `ghost` スクリプトの仕組み

```php
<?php

require_once __DIR__ . '/vendor/autoload.php';

class Ghost {
    protected $class_name;
    protected $option;

    public function __construct($class_name, $option = null) {
        $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
        $dotenv->load();

        $this->class_name = $class_name;
        $this->option     = $option;
    }

    public function autoload(){
        try {
            include './aura/utils/commands/' . ucfirst($this->class_name) . '.php';

            if (class_exists($this->class_name)) {
                $instance = new $this->class_name();

                if ($this->option !== null) {
                    $instance->run($this->option);
                } else {
                    $instance->run();
                }
            } else {
                throw new LogicException("Unable to load class: $this->class_name");
            }
        } catch (Exception $e) {
            print($e->getMessage());
        }
    }
}

$ghost = new Ghost($argv[1], $argv[2] ?? null);
$ghost->autoload();
```

- `php ghost <command> [option]` の形式で実行する
- `<command>` の先頭を大文字化した名前（例: `migrate` → `Migrate`）で `aura/utils/commands/{Command}.php` を読み込み、
  同名クラスの `run()`（引数があれば `run($option)`）を呼び出す
- コマンドクラスは名前空間を持たない（グローバル名前空間のクラスとして実装されている）

## 2. `php ghost migrate`（`aura/utils/commands/Migrate.php`）

`migrations/migrate/` ディレクトリ内のファイルを **ファイル名の昇順** で読み込み、各クラスの `getSql()` が返すSQLを実行する。

```php
class Migrate {
    protected $directory = 'migrations/migrate';

    public function run() {
        // DataBaseConnect経由でPDO接続
        // migrations/migrate 配下を昇順でスキャン
        // 各ファイルの `{番号}.{クラス名}.php` からクラス名を取り出しインスタンス化
        // ->getSql() が返す文字列（または文字列配列）をpdo->exec()で実行
        // "Duplicate key name" エラーはスキップして続行、それ以外の失敗はexit(1)
    }
}
```

マイグレーションファイルの命名規則は `{実行順の番号}.{ClassName}.php`（例: `01.UsersTable.php`）。クラス名はファイル名の2番目のセグメントから取り出される。

```php
// migrations/migrate/01.UsersTable.php
class UsersTable {
    public function getSql(){
        return 'CREATE TABLE if not exists users (
            id int NOT NULL AUTO_INCREMENT,
            name varchar(255) NOT NULL,
            email varchar(255) NOT NULL,
            password varchar(255) NOT NULL,
            PRIMARY KEY (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;';
    }
}
```

実行:
```bash
php ghost migrate
```

## 3. `php ghost seed`（`aura/utils/commands/Seed.php`）

`migrations/seed/` ディレクトリ内のファイルを読み込み、各クラスの `seed()` メソッドを呼び出す。

```php
// migrations/seed/01.UsersSeeder.php
class UsersSeeder {
    public function __construct() {
        $this->dbConnect = new DataBaseConnect();
        $this->pdo = $this->dbConnect->getPDO();
        $this->client = new Client(['base_uri' => 'https://jsonplaceholder.typicode.com']);
    }

    public function seed() {
        $response = $this->client->get('/users');
        // ...取得したデータをusersテーブルにINSERT
    }
}
```

シーダーはGuzzle（`guzzlehttp/guzzle`）で外部API（例ではJSONPlaceholder）からダミーデータを取得し、`password_hash()` した固定パスワードでレコードを作成する実装例になっている。実プロジェクトでは適宜、固定データや別のデータソースに書き換える。

実行:
```bash
php ghost seed
```

## 4. `php ghost importCSV <table>` / `php ghost exportCSV <table>`

`ImportCSV` / `ExportCSV`（`aura/utils/commands/ImportCSV.php` / `ExportCSV.php`）は、`storage/csv/{table}.csv` を対象にインポート・エクスポートを行う。

- インポート: CSVの1行目をカラム名として読み取り、2行目以降を `INSERT INTO {table} (...) VALUES (...)` で1行ずつ登録する
- エクスポート: `SELECT * FROM {table}` の結果を `storage/csv/{table}.csv` に書き出す

```bash
# storage/csv/users.csv を users テーブルへインポート
php ghost importCSV users

# posts テーブルを storage/csv/posts.csv へエクスポート
php ghost exportCSV posts
```

> `ImportCSV` はSQL文をプレースホルダなしで組み立てている（`$stmt->execute()` は呼ぶが値をバインドしていない）ため、
> 信頼できないCSVを取り込む用途には向かない。開発時のダミーデータ投入など、限定的な用途を想定したコマンドである。

## 5. セットアップ時の典型的な流れ（Readme.md より）

```bash
git clone https://github.com/sh-kikuchi/GhostPHP.git
cd GhostPHP
composer install

# プロジェクトルートに .env を作成し、DB接続情報等を設定

php ghost migrate
php ghost seed
```

</nuxt-content-wrapper>
