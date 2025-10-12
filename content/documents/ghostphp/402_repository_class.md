---
title: Repository クラス
category: php
createdAt: 2025-10-12
updatedAt: 2025-10-12
sortNumber: 402
path: "/documents/ghostphp/402_repository_class"
---

<nuxt-content-wrapper>

`Repository` クラスは、PDOを利用してデータベースの基本的なCRUD操作を提供する基底クラスです。  
テーブル名の安全な設定、レコード取得、作成、更新、削除など、リポジトリ共通の処理を実装しています。

## 1. コード

```php
<?php

namespace app\aura;

use PDO;
use app\aura\database\DataBaseConnect;

class Repository {

    protected PDO $pdo;

    protected string $table;
    
    public function __construct(string $table = '') {
        // PDOをDataBaseConnectから取得
        $this->pdo = (new DataBaseConnect())->getPDO();
        
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

    public function findById(int $id): ?array {
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
        $columns = implode(", ", array_map(fn($col) => "`$col`", array_keys($data)));
        $placeholders = implode(", ", array_fill(0, count($data), "?"));
        $sql = "INSERT INTO `{$this->table}` ({$columns}) VALUES ({$placeholders})";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute(array_values($data));
    }

    public function update(int $id, array $data): bool {
        $setClause = implode(", ", array_map(fn($key) => "`$key` = ?", array_keys($data)));
        $sql = "UPDATE `{$this->table}` SET {$setClause} WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([...array_values($data), $id]);
    }

    public function delete(int $id): bool {
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

    public function getPdo(): PDO {
        return $this->pdo;
    }
}
```

2. コード説明

- コンストラクタ
  - DataBaseConnect を介して PDO インスタンスを初期化
  - 必要に応じてテーブル名を設定
- メソッド
  - setTable($table)
    - テーブル名を安全に設定（アルファベット、数字、アンダースコアのみ許可）
  - CRUDメソッド
    - findById($id) : IDでレコードを取得
    - findAll() : 全レコードを取得
    - create($data) : レコード作成
    - update($id, $data) : レコード更新
    - delete($id) : レコード削除
    - findByColumn($column, $value) : 任意カラムでレコード検索
    - getPdo():PDOインスタンスを返す

## 3. 使い方 / 利用例
基底クラス `Repository` を継承する
```php
class PostRepository extends Repository {
    public function __construct() {
        parent::__construct('posts'); // テーブルを指定
    }

    public function show(): array {
        return parent::findAll();
    }

    public function getPost(int $id): ?array {
        return parent::findById($id);
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

    public function deletePost(Post $post): bool {
        return parent::delete($post->getId());
    }
}

```

#### ■ コンストラクタでテーブルを指定
```
public function __construct()
{
    parent::__construct('posts');
}
```

### ■ 投稿一覧の取得
```php
public function show(): array {
    return parent::findAll();
}
```

### ■ 投稿の取得
```php
public function getPost(int $id): ?array {
    return $this->findById($id);
}
```

### ■ 投稿の作成
```php
public function createPost(Post $post): bool {
    $data = [
        'title' => $post->getTitle(),
        'body' => $post->getBody(),
        'user_id' => $post->getUserId(),
    ];
    return parent::create($data);
}
```

### ■ 投稿の更新
```php
public function updatePost(Post $post): bool {
    $data = [
        'title' => $post->getTitle(),
        'body' => $post->getBody(),
    ];
    return parent::update($post->getId(), $data);
}
```

### 投稿の削除
```php
public function deletePost(Post $post): bool {
    return parent::delete($post->getId());
}
```

</nuxt-content-wrapper>