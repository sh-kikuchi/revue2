---
title: Mail クラス
category: php
createdAt: 2025-10-12
updatedAt: 2026-09-15
sortNumber: 602
path: "/documents/ghostphp/v4.0/602_mail_class"
---

<nuxt-content-wrapper>

`Mail` クラスは、メール送信を行うユーティリティクラスである。

> v4.0での変更点（大幅リライト）: 旧版はPHP標準の `mb_send_mail()` を直接呼んでいたが、
> v4.0では **PHPMailer（`phpmailer/phpmailer`）を使ったSMTP送信** に置き換えられた。
> これにより、開発環境では [smtp4dev](https://github.com/rnwood/smtp4dev) 等のローカルSMTPサーバーで
> メール送信をエミュレートできる（Readme.md 参照）。SMTP関連の設定はすべて `.env` に切り出されている。

## 1. コード

```php
<?php

namespace app\aura\utils;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class Mail {
    public function sendMail(array $post_data) {
        $result = false;

        mb_language($_ENV['MB_LANGUAGE']);
        mb_internal_encoding($_ENV['MB_INTERNAL_ENCODING']);

        $to = $post_data['mail'] ?? '';

        if (!filter_var($to, FILTER_VALIDATE_EMAIL)) {
            echo "Invalid email address.";
            return false;
        }

        $username = $post_data['username'] ?? 'no-name';
        $message  = $post_data['comment'] ?? '';

        try {
            $mail = new PHPMailer(true);

            $mail->isSMTP();
            $mail->Host = $_ENV['SMTP_HOST'];
            $mail->Port = $_ENV['SMTP_PORT'];
            $mail->SMTPAuth = $_ENV['SMTP_AUTH'];
            $mail->SMTPSecure = $_ENV['SMTP_SECURE'];
            $mail->CharSet = 'UTF-8';

            $mail->setFrom($_ENV['MAIL_FROM'], 'GhostPHP');
            $mail->addAddress($to);

            if (filter_var($to, FILTER_VALIDATE_EMAIL)) {
                $mail->addReplyTo($to, $username);
            }

            $mail->Subject = 'Letter from ' . $username;
            $mail->Body = $message;

            $mail->send();

            $result = true;
            echo "Email successfully sent.";
        } catch (Exception $e) {
            echo "Mailer Error: " . $mail->ErrorInfo;
        }

        return $result;
    }
}
```

## 2. コード説明

- **名前空間**: `app\aura\utils` 下に `Mail` クラスを定義
- **メソッド**: `sendMail(array $post_data)`
  - `$post_data` : 送信データの連想配列
    - `'mail'` : 送信先メールアドレス
    - `'username'` : 送信者名（差出人表示・件名・Reply-Toに使用）
    - `'comment'` : メール本文
  - メールアドレスが不正な場合は送信せず `false` を返す
  - `mb_language` / `mb_internal_encoding` は `.env` の `MB_LANGUAGE` / `MB_INTERNAL_ENCODING` から設定
  - `PHPMailer` をSMTPモードで初期化し、`.env` の `SMTP_*` 設定を反映
  - `setFrom()` に `.env` の `MAIL_FROM` を使用、送信先へ `addAddress()`、返信先に `addReplyTo()`
  - 送信成功時は `true`、例外発生時は `false` を返し、`$mail->ErrorInfo` をエコー出力

### 関連する `.env` 設定

```env
MB_LANGUAGE=Japanese
MB_INTERNAL_ENCODING=UTF-8

SMTP_HOST=localhost
SMTP_PORT=2525

SMTP_USER=
SMTP_PASS=

SMTP_AUTH=false
SMTP_SECURE=false

MAIL_FROM=test@example.com
```

- 開発環境では `smtp4dev` などローカルSMTPサーバーを使い、`SMTP_AUTH=false` / `SMTP_SECURE=false` で認証・暗号化なしの構成にするのが標準的（Readme.md 参照）
- 本番運用では `SMTP_USER` / `SMTP_PASS` を設定し、`SMTP_AUTH` / `SMTP_SECURE` を実際のSMTPプロバイダの要件に合わせて有効化する必要がある

## 3. 使い方 / 利用例

### ■ フォームデータ例
```html
<form method="post" action="/mail">
    <input type="text" name="username" placeholder="Your name">
    <input type="email" name="mail" placeholder="Your email">
    <textarea name="comment"></textarea>
    <button type="submit">Send</button>
</form>
```

### ■ FormRequest（`requests/MailRequest.php`）
```php
class MailRequest extends Request {
    public string $mail;
    public string $username;
    public string $comment;

    protected function rules(Validator $validator): void {
        $address = $this->input('mail');
        $validator->mailFormat($address, 'mail');
    }
}
```

### ■ コントローラーでの使用例
```php
class UserController extends Controller {
    public function __construct(
        UserService $UserService,
        Mail $mail
    ) {
        parent::__construct();
        $this->home_service = $UserService;
        $this->mail = $mail;
    }

    public function mail(MailRequest $mail_request): void {
        $this->mail->sendMail($mail_request->all());
    }
}
```

`Mail` はコンストラクタに依存を持たないため、他クラスのコンストラクタ引数に型として書くだけで `Router` がDI解決してくれる（[304_router_class.md](304_router_class.md)）。

</nuxt-content-wrapper>
