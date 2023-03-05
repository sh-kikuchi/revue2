---
title: パスワードリセット
description: laravel/ui（もうお古だけど）
category: laravel
createdAt: 2022-11-08
updatedAt: 2022-11-08
sortNumber: 16
path: "/articles/laravel/017_password_reset"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. Googleアカウントで設定](#2-googleアカウントで設定)
- [3. 「.env」ファイルの追加](#3-envファイルの追加)
- [4. マイグレーション、実行](#4-マイグレーション実行)
- [5. UserResetPassword.phpを編集する](#5-userresetpasswordphpを編集する)
- [6. User.phpへの追記](#6-userphpへの追記)
- [7. おわりに](#7-おわりに)

<br>

# 1. はじめに


<br>

# 2. Googleアカウントで設定
- Googleアカウントを用意すること
- 「安全性の低いアプリの許可」を有効

<br>

# 3. 「.env」ファイルの追加
```php
MAIL_DRIVER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=<Gmailアドレス>
MAIL_PASSWORD=<Gmailパスワード>
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=<Gmailアドレス>
MAIL_FROM_NAME=<任意でつける名前>
```

<br>

# 4. マイグレーション、実行
app/Notifications/UserResetPassword.phpを作成する。

```php
php artisan make:notification UserResetPassword
```

<br>

# 5. UserResetPassword.phpを編集する
app/Notifications/UserResetPassword.phpを作成する。

```php
<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\ResetPassword;

class UserResetPassword extends Notification
{
    use Queueable;

    public $token;

    public function __construct($token)
    {
        //
        $this->token = $token;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('パスワード再設定')
            ->greeting('平素よりアプリをご利用いただきありがとうございます')
            ->line('下のボタンをクリックしてパスワードを再設定してください。')
            ->action(__('パスワードを再設定'), url(config('app.url').route('password.reset', $this->token, false)))
            ->line('もしこのメールに心当たりがない場合は、そのまま削除してください。');
    }
}

```

<br>

# 6. User.phpへの追記
`use App\Notifications\UserResetPassword;`をした上で、`User.php`のUserのクラスないに下記のパスワードリセット通知の送信用のメソッドを追記する。
```php
    public function sendPasswordResetNotification($token)
    {
       $this->notify(new UserResetPassword($token));
    }
```

<br>

# 7. おわりに
参考
- [【Laravel】ユーザーパスワードリセット機能を実装する](https://qiita.com/mineaki27th/items/1111d04f3288a3a01956)

</nuxt-content-wrapper>
