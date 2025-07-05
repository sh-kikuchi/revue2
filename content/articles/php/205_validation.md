---
title: Ghost PHP
description: 入力バリデーション
category: php
createdAt: 2025-06-28
updatedAt: 2025-06-28
sortNumber: 205
path: "/articles/php/205_validator"
---

<nuxt-content-wrapper>

- [1. 概要](#1-概要)
- [2. 主な責務](#2-主な責務)
- [3. 各種バリデーションメソッド](#3-各種バリデーションメソッド)
  - [`required($value, $field = 'value')`](#requiredvalue-field--value)
  - [`mailFormat($email, $field = 'email')`](#mailformatemail-field--email)
  - [`passwordFormat($password, $field = 'password')`](#passwordformatpassword-field--password)
  - [`passwordConfirm($password, $password_conf)`](#passwordconfirmpassword-password_conf)
  - [`validateString($value, $field = 'input', $required = false, $minLength = null, $maxLength = null)`](#validatestringvalue-field--input-required--false-minlength--null-maxlength--null)
- [4. カスタムエラーメッセージ](#4-カスタムエラーメッセージ)

<br>

# 1. 概要

`Validator` クラスは、POSTデータや入力値に対する様々なバリデーション（検証）を行うためのクラスです。  
バリデーションエラーの収集・取得、独自のエラーメッセージ設定にも対応しています。

<br>

# 2. 主な責務

| 項目             | 内容 |
|------------------|------|
| 必須チェック       | `required()` メソッドで空判定 |
| メール形式チェック | `mailFormat()` で形式バリデーション |
| パスワード形式     | 英数字8〜100文字の制限を実施 |
| 確認一致チェック   | `passwordConfirm()` |
| 文字列の長さ制限   | `validateString()` で柔軟に対応 |
| エラーメッセージ   | `$errors` に格納して後から取得 |

<br>

# 3. 各種バリデーションメソッド

---

## `required($value, $field = 'value')`

- 入力が空の場合にエラーとする。

---

## `mailFormat($email, $field = 'email')`

- Email形式のチェック。`FILTER_VALIDATE_EMAIL` を使用。

---

## `passwordFormat($password, $field = 'password')`

- 8文字以上、100文字以内の英数字かどうかを正規表現で検証。

---

## `passwordConfirm($password, $password_conf)`

- 入力されたパスワードと確認用パスワードが一致しているかを確認。

---

## `validateString($value, $field = 'input', $required = false, $minLength = null, $maxLength = null)`

- 必須チェックを含む柔軟な文字列バリデーション。
  - `minLength`：最低文字数
  - `maxLength`：最大文字数

<br>

# 4. カスタムエラーメッセージ

```php
$validator->setCustomMessages([
  'email' => 'メールアドレスの形式が不正です',
  'password' => 'パスワードは8文字以上で入力してください',
]);
