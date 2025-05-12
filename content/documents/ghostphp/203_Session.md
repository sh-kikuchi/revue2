---
title: Session クラス
description:
category: php
createdAt: 2025-04-28
updatedAt: 2025-04-28
sortNumber: 203
path: "/documents/ghostphp/203_Session"
---

`Session` クラスは、セッションの開始、セッションIDの再生成、セッションの有効期限の設定、CSRFトークンの生成など、セッションに関連する機能を提供します。

## プロパティ

- **`$sessionStarted`**: セッションが開始されたかどうかを示すフラグ（内部使用）。
- **`$sessionIdRegenerated`**: セッションIDが再生成されたかどうかを示すフラグ（内部使用）。

## メソッド

### `__construct()`
コンストラクタメソッド。クラスのインスタンスが作成されると、以下の処理を実行します。

1. セッションが開始されているかどうかを確認し、開始されていなければセッションを開始します。
2. セッションの有効期限を設定します（デフォルトは1時間）。
3. セッションIDを再生成します。
4. セッションの有効期限が切れている場合、セッションをクリアします。

### `clear()`
セッションの内容をすべてクリアします。セッションの配列（`$_SESSION`）を空にします。

### `isSessionStarted()`
セッションが開始されていない場合、`session_start()` を呼び出してセッションを開始します。

### `regenerateId()`
セッションIDを再生成します。`session_regenerate_id(true)` を使用して新しいIDを生成します。

### `oldPostValue($oldPostValue)`
フォーム送信時にバリデーションエラーが発生した場合、送信された値を再度表示できるようにします。送信された値を `$_SESSION['old']` に保存します。

- **引数**:
  - `$oldPostValue`: 送信されたフォームの値を含む配列。
  
- **処理**:
  - 送信された値をセッションに保存し、再度表示可能にします。

### `setToken() :string`
CSRFトークンを生成し、セッションに保存します。このトークンはセキュリティ対策として使用されます。

- **返り値**:
  - 生成されたCSRFトークン（文字列）。

### `setSessionExpiry()`
セッションの有効期限を設定します。デフォルトで1時間（3600秒）後にセッションが期限切れとなります。

### `isSessionExpired()`
セッションが期限切れかどうかを確認します。期限が切れていれば `true` を、そうでなければ `false` を返します。

- **返り値**:
  - セッションが期限切れの場合は `true`、そうでなければ `false`。

### `regenerateSessionId()`
セッションが期限切れの場合、セッションIDを再生成します。また、再生成した後はセッションの有効期限を更新します。

## 使用例

```php
// Sessionクラスのインスタンスを作成
$session = new \app\axis\toolbox\Session();

// CSRFトークンを生成
$csrf_token = $session->setToken();

// フォーム送信時の以前の値をセッションに保存
$session->oldPostValue($old_post_data);

// セッションが期限切れの場合はIDを再生成
if ($session->isSessionExpired()) {
    $session->regenerateSessionId();
}
