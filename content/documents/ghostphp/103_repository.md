---
title: Ghost PHP
description: リポジトリ
category: php
createdAt: 2025-06-27
updatedAt: 2025-06-27
sortNumber: 3
path: "/documents/ghostphp/103_repository"
---

<nuxt-content-wrapper>

- [1. リポジトリの役割](#1-リポジトリの役割)
- [2. 基本的な記法（Repository）](#2-基本的な記法repository)
    - [■　テーブルの指定と初期化](#テーブルの指定と初期化)
    - [■　データの取得](#データの取得)
    - [■ データの追加](#-データの追加)
    - [■ データの更新](#-データの更新)
    - [■ データの削除](#-データの削除)
    - [■ その他](#-その他)
- [3. サブクラスにおける使用例（PostRepository）](#3-サブクラスにおける使用例postrepository)
    - [■ コンストラクタでテーブルを指定](#-コンストラクタでテーブルを指定)
    - [■ 投稿一覧の取得](#-投稿一覧の取得)
    - [■ 投稿の取得](#-投稿の取得)
    - [■ 投稿の作成](#-投稿の作成)
    - [■ 投稿の更新](#-投稿の更新)
    - [投稿の削除](#投稿の削除)

<br>

# 1. リポジトリの役割

リポジトリは、データベースとアプリケーションの橋渡しを行う責任を持ちます。  
ドメインモデル（エンティティ）と永続化層の切り離しを目的にした **データアクセス専用の層** です。

- SQL文の集中管理
- データベース操作の共通化（create, update, delete, find）
- サービス層との独立性を保ちつつ再利用性を高める
- テーブルごとの派生クラス（サブクラス）を通じて柔軟に拡張可能

<br>

# 2. 基本的な記法（Repository）

### ■　テーブルの指定と初期化

```php
$repo = new Repository('posts'); // 初期化時にテーブル名指定
$pdo = $repo->getPdo();          // PDOインスタンス取得
```

### ■　データの取得
- findById
```php
$data = $repo->findById(1); // ID = 1 のレコード取得
```

- findAll
```php
$list = $repo->findAll(); // 全件取得
```

- findByColumn
```php
$user = $repo->findByColumn('email', 'test@example.com'); // 任意カラムで検索
```

### ■ データの追加
```php
$repo->create([
  'title' => 'タイトル',
  'body' => '本文',
  'user_id' => 1,
]);
```

### ■ データの更新
```php
$repo->update(1, [
  'title' => '新しいタイトル',
  'body' => '更新後の本文',
]);
```

### ■ データの削除
```php
$repo->delete(1); // ID = 1 を削除
```

### ■ その他
- setTable（保護されたメソッド）
```php
$this->setTable('users'); // テーブルを後から指定（アルファベット・数字・_のみ許可）
```

- getPdo
```php
$pdo = $repo->getPdo(); // 生のPDOインスタンスを使いたい場合に利用
```

<br>

# 3. サブクラスにおける使用例（PostRepository）

### ■ コンストラクタでテーブルを指定

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