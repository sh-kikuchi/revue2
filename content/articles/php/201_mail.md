---
title: Ghost PHP
description: メール
category: php
createdAt: 2025-06-28
updatedAt: 2025-06-28
sortNumber: 201
path: "/articles/php/201_mail"
---

<nuxt-content-wrapper>

- [1. 概要](#1-概要)
- [2. 主な責務](#2-主な責務)
- [3. メソッド詳細](#3-メソッド詳細)
    - [`sendMail(array $post_data): bool`](#sendmailarray-post_data-bool)
      - [引数](#引数)
      - [処理内容](#処理内容)
      - [戻り値](#戻り値)
- [4. 使用例](#4-使用例)

<br>

# 1. 概要

`Mail` クラスは、フォームから送信されたユーザー情報をもとに、PHPの `mb_send_mail()` 関数を用いて日本語メールを送信するユーティリティクラスです。  
日本語環境に適したエンコーディング設定と簡易なバリデーションを備えています。

<br>

# 2. 主な責務

| 項目                 | 内容 |
|----------------------|------|
| メール送信           | `mb_send_mail()` によるメール送信 |
| 日本語対応           | `mb_language("Japanese")` と `mb_internal_encoding("UTF-8")` |
| メールアドレス検証   | `filter_var` による形式チェック |
| 成否メッセージ表示   | 成功・失敗を `echo` で出力 |

<br>

# 3. メソッド詳細

### `sendMail(array $post_data): bool`

#### 引数

`$post_data` は以下のキーを持つ連想配列：

- `mail`：送信先メールアドレス（形式検証あり）
- `username`：送信者の名前
- `comment`：メッセージ本文

#### 処理内容

1. メールアドレスが不正なら送信を中止しエラーメッセージを出力  
2. `From`、`タイトル`、`本文` を生成  
3. `mb_send_mail()` によりメール送信を実行  
4. 成否に応じたメッセージを `echo` で出力

#### 戻り値

- `true`：送信成功
- `false`：送信失敗

<br>

# 4. 使用例

```php
use app\aura\utils\Mail;

$mailer = new Mail();

$post_data = [
    'mail' => 'user@example.com',
    'username' => '太郎',
    'comment' => 'お問い合わせ内容です。',
];

$mailer->sendMail($post_data);
