---
title: Validator クラス（app\aura\https\Validator）
category: php
createdAt: 2025-10-12
updatedAt: 2026-10-03
sortNumber: 604
path: "/documents/ghostphp/v4.0/604_validator_class"
---

<nuxt-content-wrapper>

`app\aura\https\Validator` は、入力データの検証を行うためのクラスである。
メール形式チェック、必須チェック、パスワード形式チェック、文字数チェック、数値の範囲チェックなどのメソッドを提供し、エラー管理やカスタムメッセージの設定も可能である。
エラーメッセージは `Lang` クラス経由で取得するため、`.env` の `APP_LOCALE` で英語/日本語を切り替えられる。

> **v4.0での変更**: 旧来の `app\aura\utils\Validator` は本クラスに移動した。
> - `FormRequest`（`requests/` 配下）の `rules()` から使う（Routerが自動的に呼び出す標準経路。[306_request_validation.md](306_request_validation.md)）
> - `Controller` が保持する `$this->validator` も本クラスのインスタンスである（[305_controller_class.md](305_controller_class.md)）
>
> `app\aura\utils\Validator` は `@deprecated` とし、**次のメジャーバージョン（v5.0）で削除予定**。移行時の注意点は「4. 旧 `utils\Validator` からの移行」を参照。

## 1. コード（抜粋）

```php
<?php
namespace app\aura\https;

use app\aura\Lang;

class Validator {
    private $errors = [];
    private $customMessages = [];

    public function setCustomMessages(array $customMessages) {
        $this->customMessages = $customMessages;
    }

    public function getErrors() {
        return $this->errors;
    }

    protected function addError(string $field, string $message) {
        $this->errors[] = [$field => $message];
    }

    protected function getCustomMessage(string $field, string $defaultMessage) {
        return $this->customMessages[$field] ?? $defaultMessage;
    }

    public function required($value, string $field = 'value') {
        if (empty($value)) {
            $message = $this->getCustomMessage($field, Lang::get('REQUIRED', ['field' => $field]));
            $this->addError($field, $message);
        }
    }

    public function maxLength(string $value, string $field, int $max): void {
        if ($value !== null && mb_strlen($value) > $max) {
            $message = $this->getCustomMessage($field, Lang::get('MAX_LENGTH', ['field' => $field, 'max' => $max]));
            $this->addError($field, $message);
        }
    }

    // mailFormat / hasFile / passwordFormat / passwordConfirm / validateString /
    // minLength / numeric / integer / min / max / between / greaterThanOrEqual も同じ形で実装されている
}
```

## 2. コード説明

- プロパティ
  - `$errors`：検証エラーを格納する連番配列（`[[$field => $message], ...]`）
  - `$customMessages`：カスタムエラーメッセージを格納する配列

- メソッド
  - `setCustomMessages(array $customMessages)` : 各フィールドのカスタムエラーメッセージを設定
  - `getErrors()` : 発生した全てのエラーを取得
  - `addError($field, $message)` : 特定フィールドのエラーメッセージを追加
  - `getCustomMessage($field, $defaultMessage)` : カスタムメッセージが設定されていれば取得、なければデフォルトを返す
  - `mailFormat($email, $field)` : メールアドレスの形式を検証
  - `required($value, $field)` : 値が空でないことをチェック
  - `hasFile($value, $field)` : アップロードファイルが存在するかを検証（複数ファイル対応の `$_FILES['x']['error'][0]` 形式を想定）
  - `passwordFormat($password, $field)` : パスワードの形式（英数字8〜100文字）を検証
  - `passwordConfirm($password, $password_conf)` : パスワードと確認用パスワードが一致するか検証
  - `validateString($value, $field, $required)` : 文字列の必須チェック（`$required` が `true` で空ならエラー）
    - v4.0 で文字数チェックは `minLength()` / `maxLength()` に分割した。引数の `$minLength` / `$maxLength` は互換のため残っているが、**渡しても使われない**（文字数を検証したい場合は `minLength()` / `maxLength()` を呼ぶ）
  - `minLength($value, $field, $min)` / `maxLength($value, $field, $max)` : 文字数の下限・上限を検証
  - `numeric($value, $field)` / `integer($value, $field)` : 数値・整数であることを検証
  - `min($value, $field, $min)` / `max($value, $field, $max)` / `between($value, $field, $min, $max)` : 数値の下限・上限・範囲を検証
  - `greaterThanOrEqual($value, $field, $compareValue, $compareField)` : 値が別フィールドの値以上であることを検証（例: 終了ページが開始ページ以上か）。どちらかが数値でない場合もエラー

- エラーメッセージ
  - デフォルトの文言は `config/messages_en.php` / `config/messages_ja.php` に定義されており、`Lang::get()` が `.env` の `APP_LOCALE` に応じて選ぶ（未設定時は `en`）。
  - `:field` / `:min` / `:max` などのプレースホルダは `Lang::get()` の第2引数で置換される。
  - `setCustomMessages()` でフィールドごとに上書きした場合は、そちらが優先される。

## 3. 使い方

```php
use app\aura\https\Validator;

$validator = new Validator();

$validator->setCustomMessages([
    'email' => '正しいメールアドレスを入力してください。',
    'password' => 'パスワードは8文字以上で入力してください。'
]);

$validator->required($_POST['username'], 'username');
$validator->mailFormat($_POST['email'], 'email');
$validator->passwordFormat($_POST['password'], 'password');
$validator->passwordConfirm($_POST['password'], $_POST['password_confirm']);
$validator->required($_POST['comment'], 'comment');
$validator->minLength($_POST['comment'], 'comment', 10);
$validator->maxLength($_POST['comment'], 'comment', 200);

$errors = $validator->getErrors();
if (!empty($errors)) {
    print_r($errors);
}
```

`Controller` はコンストラクタで自動的に `$this->validator` として本クラスをインスタンス化している（[305_controller_class.md](305_controller_class.md)）ため、
コントローラー内であれば `new Validator()` せずに `$this->validator` をそのまま使うこともできる。
ただし、新しい画面・APIを作る場合は基本的に FormRequest パターン（[306_request_validation.md](306_request_validation.md)）を使う。

## 4. 旧 `utils\Validator` からの移行

`app\aura\utils\Validator` は v4.0 で `@deprecated` となり、次のメジャーバージョン（v5.0）で削除予定である。
`use app\aura\utils\Validator;` を `use app\aura\https\Validator;` に書き換える際は、以下の違いに注意すること。

| 項目 | 旧 `utils\Validator` | 新 `https\Validator` |
|---|---|---|
| エラー保持形式 | `$errors[$field] = $message`（連想配列。同じフィールドのエラーは上書き） | `$errors[] = [$field => $message]`（連番配列。同じフィールドのエラーも全て残る） |
| エラー文言 | 英語固定（クラス内にハードコード） | `Lang` 経由（`APP_LOCALE` で英語/日本語切り替え） |
| 引数の型 | 一部のみ型宣言あり（`mailFormat()` / `required()` の `$field` など） | `$field` や文字列・数値の引数に `string` / `int` などの型宣言あり（型が合わないと `TypeError`）。`required()` / `numeric()` などの `$value` は任意の型を受けるため型宣言なし |
| 文字数チェック | `validateString($value, $field, $required, $minLength, $maxLength)` で必須・文字数をまとめてチェック | `validateString()` は必須チェックのみで、`$minLength` / `$maxLength` を渡しても無視される。文字数は `minLength()` / `maxLength()` を使う |
| 追加メソッド | なし | `hasFile()` / `minLength()` / `maxLength()` / `numeric()` / `integer()` / `min()` / `max()` / `between()` / `greaterThanOrEqual()` |

`getErrors()` の戻り値を `$errors['email']` のようにキーで参照しているコードは、連番配列の形式に合わせて書き換える必要がある。

</nuxt-content-wrapper>
