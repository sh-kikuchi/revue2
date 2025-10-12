---
title: Validator クラス
category: php
createdAt: 2025-10-12
updatedAt: 2025-10-12
sortNumber: 604
path: "/documents/ghostphp/604_validator_class"
---

<nuxt-content-wrapper>

`Validator` クラスは、入力データの検証を行うためのユーティリティクラスです。  
メール形式チェック、必須チェック、パスワード形式チェック、文字列の長さチェックなどのメソッドを提供し、エラー管理やカスタムメッセージの設定も可能です。



## 1. コード

```php
<?php
namespace app\aura\utils;

class Validator {
    private $errors = [];
    private $customMessages = [];

    public function setCustomMessages(array $customMessages) {
        $this->customMessages = $customMessages;
    }

    public function getErrors() {
        return $this->errors;
    }

    protected function addError($field, $message) {
        $this->errors[$field] = $message;
    }

    protected function getCustomMessage($field, $defaultMessage) {
        return isset($this->customMessages[$field]) ? $this->customMessages[$field] : $defaultMessage;
    }

    public function mailFormat($email, $field = 'email') {
        if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
            $message = $this->getCustomMessage($field, 'Invalid email address');
            $this->addError($field, $message);
            return false;
        }
        return true;
    }

    public function required($value, $field = 'value') {
        if (empty($value)) {
            $message = $this->getCustomMessage($field, $field . ' is required');
            $this->addError($field, $message);
        }
    }

    public function passwordFormat($password, $field = 'password') {
        if (!preg_match("/\\A[a-z\\d]{8,100}+\\z/i", $password)) {
            $message = $this->getCustomMessage($field, 'The password must be at least 8 alphanumeric characters and no more than 100 characters.');
            $this->addError($field, $message);
        }
    }

    public function passwordConfirm($password, $password_conf) {
        if ($password !== $password_conf) {
            $message = $this->getCustomMessage('password_conf', 'Password and confirmation password do not match.');
            $this->addError('password_conf', $message);
        }
    }

    public function validateString($value, $field = 'input', $required = false, $minLength = null, $maxLength = null) {
        if ($required && empty($value)) {
            $message = $this->getCustomMessage($field, $field . ' is required');
            $this->addError($field, $message);
        }
        if ($minLength !== null && mb_strlen($value) < $minLength) {
            $message = $this->getCustomMessage($field, "Minimum length is $minLength characters");
            $this->addError($field, $message);
        }
        if ($maxLength !== null && mb_strlen($value) > $maxLength) {
            $message = $this->getCustomMessage($field, "Maximum length is $maxLength characters");
            $this->addError($field, $message);
        }
    }
}
?>
```



## 2. コード説明

- プロパティ
  - `$errors`：検証エラーを格納する配列
  - `$customMessages`：カスタムエラーメッセージを格納する配列

- メソッド
  - `setCustomMessages(array $customMessages)`  
    - 各フィールドのカスタムエラーメッセージを設定
  - `getErrors()`  
    - 発生した全てのエラーを取得
  - `addError($field, $message)`  
    - 特定フィールドのエラーメッセージを追加
  - `getCustomMessage($field, $defaultMessage)`  
    - カスタムメッセージが設定されていれば取得、なければデフォルトを返す
  - `mailFormat($email, $field)`  
    - メールアドレスの形式を検証
  - `required($value, $field)`  
    - 値が空でないことをチェック
  - `passwordFormat($password, $field)`  
    - パスワードの形式（英数字8〜100文字）を検証
  - `passwordConfirm($password, $password_conf)`  
    - パスワードと確認用パスワードが一致するか検証
  - `validateString($value, $field, $required, $minLength, $maxLength)`  
    - 文字列の必須チェックおよび長さ制限チェック



## 3. 使い方

```php
use app\aura\utils\Validator;

$validator = new Validator();

// カスタムエラーメッセージ設定
$validator->setCustomMessages([
    'email' => '正しいメールアドレスを入力してください。',
    'password' => 'パスワードは8文字以上で入力してください。'
]);

// 検証
$validator->required($_POST['username'], 'username');
$validator->mailFormat($_POST['email'], 'email');
$validator->passwordFormat($_POST['password'], 'password');
$validator->passwordConfirm($_POST['password'], $_POST['password_confirm']);
$validator->validateString($_POST['comment'], 'comment', true, 10, 200);

// エラー確認
$errors = $validator->getErrors();
if (!empty($errors)) {
    print_r($errors);
}
```
</nuxt-content-wrapper>