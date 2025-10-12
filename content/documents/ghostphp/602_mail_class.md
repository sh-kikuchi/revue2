---
title: Mail クラス
category: php
createdAt: 2025-10-12
updatedAt: 2025-10-12
sortNumber: 602
path: "/documents/ghostphp/602_mail_class"
---

<nuxt-content-wrapper>

`Mail` クラスは、PHP の `mb_send_mail` を利用してメール送信を行うユーティリティクラスである。  
送信先、件名、本文、送信元のヘッダーを指定してメールを送信できる。

## 1. コード

```php
<?php

namespace app\aura\utils;

class Mail{
    /**
     * sendMail
     * @param array $post_data 
     * @return boolean $result
     */
    function sendMail($post_data){
        $result =  false;
        
        mb_language("Japanese");
        mb_internal_encoding("UTF-8");

        $to      = $post_data['mail'];
        if (!filter_var($to, FILTER_VALIDATE_EMAIL)) {
          echo "Invalid email address.";
          return;
        }
        $title   = 'Letter from '.$post_data['username'];
        $message = $post_data['comment'];
        $headers =  'From:'. $post_data['mail'];
        
        if(mb_send_mail($to, $title, $message, $headers)){
          $result = true;
          echo "Email successfully sent.";
        }else{
          echo "Email transmission failed.";
        }
        return $result;
    }
}
?>
```

## 2. コード説明

- **名前空間**  
  ```php
  namespace app\aura\utils;
  ```
  `app\aura\utils` 下に Mail クラスを定義

- **メソッド**  
  ```php
  function sendMail($post_data)
  ```
  - `$post_data` : 送信データの連想配列
    - `'mail'` : 送信先メールアドレス
    - `'username'` : 送信者名
    - `'comment'` : メール本文
  - メールアドレスが不正な場合は送信せずメッセージを出力
  - 日本語メール用に `mb_language` と `mb_internal_encoding` を設定
  - `mb_send_mail` で送信
  - 成功時は `true`、失敗時は `false` を返す

## 3. 使い方 / 利用例

### ■ フォームデータ例
```html
<form method="post" action="/send">
    <input type="text" name="username" placeholder="Your name">
    <input type="email" name="mail" placeholder="Your email">
    <textarea name="comment"></textarea>
    <button type="submit">Send</button>
</form>
```

### ■ サービスクラス内での使用例
```php
use app\aura\utils\Mail;

$mailUtil = new Mail();

$post_data = [
    'username' => $_POST['username'],
    'mail'     => $_POST['mail'],
    'comment'  => $_POST['comment']
];

if ($mailUtil->sendMail($post_data)) {
    echo 'メール送信成功';
} else {
    echo 'メール送信失敗';
}
```

- **ポイント**
  - `$post_data` 配列に必要なキーを必ず含めること
  - メールアドレスは `filter_var` によって検証される
  - 日本語を含む場合は `mb_language` と `mb_internal_encoding` の設定を維持

</nuxt-content-wrapper>
