---
title: Ghost PHP
description: セッション管理
category: php
createdAt: 2025-06-28
updatedAt: 2025-06-28
sortNumber: 203
path: "/documents/ghostphp/203_session"
---

<nuxt-content-wrapper>

- [1. 概要](#1-概要)
- [2. 主な責務](#2-主な責務)
- [3. メソッド詳細](#3-メソッド詳細)
  - [`__construct()`](#__construct)
  - [`clear()`](#clear)
  - [`regenerateId()`](#regenerateid)
  - [`oldPostValue(array $oldPostValue)`](#oldpostvaluearray-oldpostvalue)
  - [`setToken(): string`](#settoken-string)
- [4. 内部処理関数](#4-内部処理関数)
  - [`isSessionStarted()`](#issessionstarted)
  - [`setSessionExpiry()`](#setsessionexpiry)
  - [`isSessionExpired()`](#issessionexpired)
  - [`regenerateSessionId()`](#regeneratesessionid)
- [5. 使用例](#5-使用例)

<br>

# 1. 概要

`Session` クラスは、セッション管理を統括するユーティリティです。  
セッションの開始・有効期限の管理・CSRFトークンの生成・旧POST値の保持など、Webアプリケーションの基本的なセッション操作を担います。

<br>

# 2. 主な責務

| 項目                 | 内容 |
|----------------------|------|
| セッションの開始     | `session_start()` による開始制御 |
| セッションの有効期限管理 | セッション自動失効と更新 |
| セッションIDの再生成 | セキュリティ向上のための再発行 |
| CSRFトークン生成     | `setToken()` による安全な乱数発行 |
| POSTデータの保持     | バリデーション失敗時の入力保持 |
| セッション初期化     | `clear()` によるクリア処理 |

<br>

# 3. メソッド詳細

## `__construct()`

- セッションの開始・有効期限設定・ID再生成・期限切れチェックとクリアを自動実行。

---

## `clear()`

- セッション変数を初期化します（`$_SESSION = array();`）。

---

## `regenerateId()`

- セッションIDを強制的に再発行します（`session_regenerate_id(true)`）。

---

## `oldPostValue(array $oldPostValue)`

- 直前のPOST値を `$_SESSION['old']` に保存します。

---

## `setToken(): string`

- CSRFトークンを生成し、`$_SESSION['csrf_token']` に保存します。

<br>

# 4. 内部処理関数

## `isSessionStarted()`

- セッションが開始していなければ `session_start()` を実行。

---

## `setSessionExpiry()`

- 現在から1時間後をセッション有効期限として記録します。

---

## `isSessionExpired()`

- セッションが有効期限を超えているかを確認。期限切れなら `true` を返却。

---

## `regenerateSessionId()`

- 期限切れ判定後にIDを再生成し、再度期限をセット。

<br>

# 5. 使用例

```php
use app\aura\utils\Session;

$session = new Session();

// CSRFトークン生成
$token = $session->setToken();

// フォームの旧入力値を保存
$session->oldPostValue($_POST);

// セッションを手動でクリア
$session->clear();
