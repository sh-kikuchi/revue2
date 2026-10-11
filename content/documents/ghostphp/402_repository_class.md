---
title: Repository クラス
category: php
createdAt: 2025-10-12
updatedAt: 2026-10-03
sortNumber: 402
path: "/documents/ghostphp/v4.0/402_repository_class"
---

<nuxt-content-wrapper>

`Repository` クラスは、PDOを利用してデータベースの基本的なCRUD操作を提供する基底クラスである。
テーブル名の安全な設定、レコード取得、作成、更新、削除など、リポジトリ共通の処理を実装している。

> v4.0での変更点:
> 1. コンストラクタが `?PDO $pdo = null` を受け取れるようになり、**テスト時に外部からPDOを注入可能**になった（未指定時は従来通り `DataBaseConnect` から取得）。
> 2. 任意のSQLで取得する `query()`、書き込みを行う `executeAction()`、複数行を1回のINSERTで登録する `bulkInsert()` が追加された。
> 3. `create()` / `update()` / `bulkInsert()` で配列のキー（カラム名）を検証するようになり、キー経由のSQLインジェクションを防止した。
> 4. `findById()` / `update()` / `delete()` の `$id` が `int` から `mixed` に変更された。
> 5. **DBエラーは Repository で catch せず、`PDOException` のまま呼び出し元へ投げる**。エラー処理とトランザクション管理は Service の責務とする（[502_service_class.md](502_service_class.md)）。

## 1. コード

```php
<?php

namespace app\aura;

use PDO;
use app\aura\database\DataBaseConnect;

class Repository {
    protected PDO $pdo;
    protected string $table;

    public function __construct(string $table = '', ?PDO $pdo = null) {
        $this->pdo = $pdo ?? (new DataBaseConnect())->getPDO();

        if (!empty($table)) {
            $this->setTable($table);
        }
    }

    protected function setTable(string $table): void {
        // Allow only alphanumeric table names to prevent SQL injection
        if (!preg_match('/^[a-zA-Z0-9_]+$/', $table)) {
            throw new \InvalidArgumentException("Invalid table name.");
        }
        $this->table = $table;
    }

    private function assertValidColumns(array $columns): void {
        foreach ($columns as $column) {
            if (!preg_match('/^[a-zA-Z0-9_]+$/', (string)$column)) {
                throw new \InvalidArgumentException("Invalid column name.");
            }
        }
    }

    public function findById(mixed $id): ?array {
        $stmt = $this->pdo->prepare("SELECT * FROM `{$this->table}` WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
    }

    public function findAll(): array {
        $stmt = $this->pdo->prepare("SELECT * FROM `{$this->table}`");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create(array $data): bool {
        $this->assertValidColumns(array_keys($data));
        $columns = implode(", ", array_map(fn($col) => "`$col`", array_keys($data)));
        $placeholders = implode(", ", array_fill(0, count($data), "?"));
        $sql = "INSERT INTO `{$this->table}` ({$columns}) VALUES ({$placeholders})";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute(array_values($data));
    }

    public function update(mixed $id, array $data): bool {
        $this->assertValidColumns(array_keys($data));
        $setClause = implode(", ", array_map(fn($key) => "`$key` = ?", array_keys($data)));
        $sql = "UPDATE `{$this->table}` SET {$setClause} WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);

        return $stmt->execute([...array_values($data), $id]);
    }

    public function query(mixed $sql, array $params = [], bool $fetchAll = true): array|null {
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $fetchAll ? $stmt->fetchAll(PDO::FETCH_ASSOC) : ($stmt->fetch(PDO::FETCH_ASSOC) ?: null);
    }

    public function delete(mixed $id): bool {
        $sql = "DELETE FROM `{$this->table}` WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([$id]);
    }

    public function findByColumn(string $column, $value): ?array {
        if (!preg_match('/^[a-zA-Z0-9_]+$/', $column)) {
            throw new \InvalidArgumentException("Invalid column name.");
        }
        $stmt = $this->pdo->prepare("SELECT * FROM `{$this->table}` WHERE `{$column}` = ? LIMIT 1");
        $stmt->execute([$value]);
        return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
    }

    public function executeAction(string $sql, array $params = []): bool {
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute($params);
    }

    public function bulkInsert(array $rows): bool {
        if (empty($rows)) {
            return false;
        }

        $rows = array_values($rows);
        $keys = array_keys($rows[0]);
        $this->assertValidColumns($keys);

        $columns = implode(", ", array_map(fn($col) => "`$col`", $keys));
        $rowPlaceholder = "(" . implode(", ", array_fill(0, count($keys), "?")) . ")";
        $params = [];
        foreach ($rows as $row) {
            if (array_keys($row) !== $keys) {
                throw new \InvalidArgumentException("All rows must have the same columns in the same order.");
            }
            array_push($params, ...array_values($row));
        }
        $sql = "INSERT INTO `{$this->table}` ({$columns}) VALUES "
            . implode(", ", array_fill(0, count($rows), $rowPlaceholder));

        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute($params);
    }

    public function getPdo(): PDO {
        return $this->pdo;
    }
}
```

## 2. コード説明

- コンストラクタ
  - `$pdo` を渡さなければ `DataBaseConnect` を介して PDO インスタンスを初期化。渡された場合はそれを優先して使う（テスト時のモック注入用）
  - 必要に応じてテーブル名を設定
- メソッド
  - `setTable($table)` : テーブル名を安全に設定（アルファベット、数字、アンダースコアのみ許可）
  - `assertValidColumns($columns)`（v4.0で新設、private）
    - カラム名がアルファベット、数字、アンダースコアのみかを検証し、違反があれば `InvalidArgumentException` を投げる
    - `create()` / `update()` / `bulkInsert()` は配列のキーをそのままカラム名としてSQLに埋め込むため、キー経由のSQLインジェクションをここで防ぐ
  - CRUDメソッド
    - `findById($id)` : IDでレコードを取得
    - `findAll()` : 全レコードを取得
    - `create($data)` : レコード作成（キーを検証）
    - `update($id, $data)` : レコード更新（キーを検証）
    - `delete($id)` : レコード削除
    - `findByColumn($column, $value)` : 任意カラムでレコード検索
  - `query($sql, $params = [], $fetchAll = true)`（v4.0で新設）
    - 基本CRUDでは表現しづらい任意のSQL（JOINや集計など）を安全にバインド実行するための汎用メソッド
    - `$fetchAll = true` なら全件、`false` なら1件（`fetch()`）を返す。1件モードで該当行が無い場合は `null` を返す（`findById()` と同じ）
  - `executeAction($sql, $params = [])`（v4.0で新設）
    - `query()` の書き込み版。INSERT / UPDATE / DELETE などの任意のSQLを実行し、成否を返す
  - `bulkInsert($rows)`（v4.0で新設）
    - 連想配列の配列を、1回のINSERT文でまとめて登録する
    - カラム名は先頭行のキーから取得する。全ての行が同じキーを同じ順番で持っている必要があり、違う場合は `InvalidArgumentException` を投げる
    - 値はプレースホルダで渡す。空配列を渡した場合は `false` を返す
    - INSERT文1本は単独で原子的（全件登録されるか、1件も登録されないか）なため、内部でトランザクションは張らない。他の処理とまとめたい場合は Service 側でトランザクションを張る
  - `getPdo()` : PDOインスタンスを返す（`Service::beginTransaction()` 等がトランザクション制御のために使用）

- 例外の扱い
  - Repository では DBエラー（`PDOException`）を catch しない。エラー処理とトランザクション（`beginTransaction()` / `commit()` / `rollBack()`）は Service が担う
  - Repository 自身が投げるのは、テーブル名・カラム名の不正などの**呼び出し側のミス**を知らせる `InvalidArgumentException` のみ

> **注意**: `query()` / `executeAction()` は渡されたSQLをそのまま実行する。値は必ず `$params` で渡し、SQL文字列に値を連結しないこと（連結するとSQLインジェクションを防げない）。

## 3. 使い方 / 利用例
基底クラス `Repository` を継承する。
```php
class PostRepository extends Repository implements IPostRepository {
    public function __construct(?PDO $pdo = null) {
        parent::__construct('posts', $pdo); // テーブルを指定。PDOはテスト時に注入可能
    }

    public function show(): array {
        return parent::findAll();
    }

    public function getPost(int $id): ?array {
        return $this->findById($id);
    }

    public function createPost(Post $post): bool {
        $data = [
            'title' => $post->getTitle(),
            'body' => $post->getBody(),
            'user_id' => $post->getUserId(),
        ];
        return parent::create($data);
    }

    public function updatePost(Post $post): bool {
        $data = [
            'title' => $post->getTitle(),
            'body' => $post->getBody(),
        ];
        return parent::update($post->getId(), $data);
    }

    public function deletePost(int $id): bool {
        return parent::delete($id);
    }
}
```

`interfaces/repositories/IPostRepository.php` にインターフェースを定義し、
リポジトリクラス側で `implements` することで、Serviceからは型に依存させたまま実装差し替えが可能になる。

```php
interface IPostRepository {
    public function show(): array;
    public function getPost(int $id): ?array;
    public function createPost(Post $post): bool;
    public function updatePost(Post $post): bool;
    public function deletePost(int $id): bool;
}
```

### ■ `query()` を使った例（集計・JOINなど）
```php
public function countPostsByUser(int $userId): int {
    $row = $this->query(
        'SELECT COUNT(*) AS cnt FROM posts WHERE user_id = ?',
        [$userId],
        false
    );
    return (int)($row['cnt'] ?? 0);
}
```

### ■ テスト時にPDOを注入する例
```php
$pdo = new PDO('sqlite::memory:');
$repository = new PostRepository($pdo);
```

</nuxt-content-wrapper>
