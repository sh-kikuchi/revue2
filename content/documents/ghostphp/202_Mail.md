---
title: Mail クラス
description:
category: php
createdAt: 2025-04-28
updatedAt: 2025-04-28
sortNumber: 202
path: "/documents/ghostphp/202_mail"
---

# Mail クラス

`Mail` クラスは、指定されたデータに基づいてメールを送信する機能を提供します。日本語の文字コードを使用し、UTF-8エンコーディングでメールを送信します。

## メソッド

### `sendMail($post_data)`
このメソッドは、指定されたデータを基にメールを送信します。送信先メールアドレスが正しい形式かどうかを確認し、送信結果を表示します。

- **引数**:
  - `$post_data`: メール送信に必要な情報を含む配列。
    - `mail`: 送信先のメールアドレス。
    - `username`: メール送信者の名前。
    - `comment`: メール本文。

- **返り値**:
  - `boolean`: メール送信が成功した場合は `true`、失敗した場合は `false`。

### 処理の流れ

1. **メールアドレスの確認**:
   - 引数として渡された送信先メールアドレス (`mail`) が正しい形式かどうかを `FILTER_VALIDATE_EMAIL` を使用して確認します。無効な場合、エラーメッセージを表示します。

2. **メールの送信**:
   - メールの件名は、送信者名 (`username`) を使って作成され、本文は `comment` から取得されます。
   - `mb_send_mail()` 関数を使用して、メールを送信します。送信者は、`From` ヘッダーとして指定されたメールアドレスになります。

3. **送信結果の表示**:
   - メールが正常に送信された場合、「Email successfully sent.」と表示され、失敗した場合は「Email transmission failed.」と表示されます。

### 使用例

```php
$mail = new Mail();
$post_data = [
    'mail'     => 'recipient@example.com',
    'username' => 'John Doe',
    'comment'  => 'This is a test email message.'
];

$mail->sendMail($post_data);
