---
title: Ghost PHP
description: サービス
category: php
createdAt: 2025-06-26
updatedAt: 2025-06-26
sortNumber: 2
path: "/articles/php/102_service"
---

<nuxt-content-wrapper>

- [1. サービス](#1-サービス)
- [2. 基本的な記法](#2-基本的な記法)
    - [CSRFトークン管理](#csrfトークン管理)
    - [テンプレート描画](#テンプレート描画)
    - [トランザクション操作](#トランザクション操作)
- [3. サブクラスにおける使用例（PostService）](#3-サブクラスにおける使用例postservice)
    - [フォーム表示でのトークン生成](#フォーム表示でのトークン生成)
    - [POST処理時のトークン検証とトランザクション制御](#post処理時のトークン検証とトランザクション制御)

<br>

# 1. サービス
- コントローラーとリポジトリの橋渡し
- データの加工・バリデーション・状態保持の管理
- セッション、トランザクション、CSRF など周辺技術の統括
- 成功時・失敗時の画面遷移（Redirect）制御
- アプリケーション全体にわたる共通処理の集約（スーパークラスに記述）

<br>

# 2. 基本的な記法

### CSRFトークン管理
```php
$token = $this->setToken('form_name');     // トークン生成（フォーム表示時）
$isValid = $this->checkToken('form_name'); // トークン検証（POST時）
```

### テンプレート描画
```php
return $this->render(); // Template クラスに依存（内容は Template クラスが持つ）
```

### トランザクション操作
```php
$this->beginTransaction(); // 開始
$this->commit();           // コミット
$this->rollBack();         // ロールバック
```

<br>

# 3. サブクラスにおける使用例（PostService）
### フォーム表示でのトークン生成
```php
$template = new Template(
    'post/form',
    [
        'csrf' => $this->setToken('post_create'),
        'errors' => $_SESSION['errors'] ?? null,
        // その他データ
    ]
);
return $template->render();
```

### POST処理時のトークン検証とトランザクション制御
```php
public function create() {
    if (!$this->checkToken('post_create')) {
        echo 'Invalid token.';
        return false;
    }

    $this->beginTransaction();

    try {
        $post = new PostRepository();
        $postEntity = $this->makePost($_POST);
        $result = $post->createPost($postEntity);

        if (!$result) {
            throw new \Exception('Post creation failed.');
        }

        $this->commit();
        Redirect::to('post');
    } catch (\Exception $e) {
        $this->rollBack();
        Redirect::error(500);
    }
}
```

</nuxt-content-wrapper>
