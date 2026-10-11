---
title: Session クラス
category: php
createdAt: 2025-10-12
updatedAt: 2026-09-15
sortNumber: 603
path: "/documents/ghostphp/603_session_class"
---

<nuxt-content-wrapper>

`Session` クラスは、PHP のセッション管理を簡略化するユーティリティである。
セッション開始、セッションIDの再生成、CSRFトークンの発行、入力値の保持、セッション有効期限管理などを行う。

> v4.0での変更点: 実装ロジックに変更はない（`oldPostValue()` の引数に型ヒント `array` が付いた程度）。
> 使われ方としては、`FormRequest::rules()` の中でバリデーションエラー時に入力値を保持する用途（`oldPostValue()`）で使われることが増えた（[306_request_validation.md](306_request_validation.md)）。

---

## 1. コード

```php
<?php
namespace app\aura\utils;

class Session {
    protected static $sessionStarted = false;
    protected static $sessionIdRegenerated = false;

    public function __construct(){
        $this->isSessionStarted();
        $this->setSessionExpiry();
        $this->regenerateSessionId();

        if ($this->isSessionExpired()) {
          $this->clear();
        }
    }

    public function clear(){
      $_SESSION = [];
    }

    private function isSessionStarted() {
      if(session_status() === PHP_SESSION_NONE){
        session_start();
      }
    }

    public function regenerateId() {
      session_regenerate_id(true);
    }

    public function oldPostValue(array $oldPostValue){
      foreach($oldPostValue as $key => $value){
          $_SESSION['old'][$key] = $value;
      }
    }

    public function setToken() :string {
      $csrf_token = bin2hex(random_bytes(32));
      $_SESSION['csrf_token'] = $csrf_token;

      return $csrf_token;
    }

    private function setSessionExpiry() {
      if (!isset($_SESSION)) return false;
      $_SESSION['expiry_time'] = time() + 3600;
    }

    private function isSessionExpired() {
        if (!isset($_SESSION)) return false;
        $expiryTime = $_SESSION['expiry_time'] ?? 0;
        return $expiryTime !== 0 && time() > $expiryTime;
    }

    private function regenerateSessionId(){
      if ($this->isSessionExpired()){
        $this->regenerateId();
        $this->setSessionExpiry();
      }
    }
}
```

---

## 2. コード説明

- **名前空間**: `app\aura\utils`
- **プロパティ**
  - `$sessionStarted` : セッション開始済みかどうかのフラグ
  - `$sessionIdRegenerated` : セッションIDを再生成済みかどうかのフラグ
- **メソッド**
  - `__construct()` : セッション開始・有効期限設定・ID再生成・有効期限チェック
  - `clear()` : セッションをクリア
  - `isSessionStarted()` : セッションが開始されているか確認
  - `regenerateId()` : セッションIDを再生成
  - `oldPostValue(array $oldPostValue)` : バリデーションエラー時に入力値を `$_SESSION['old']` に保持
  - `setToken()` : CSRFトークンを生成してセッションに保存
  - `setSessionExpiry()` : セッション有効期限を設定（1時間）
  - `isSessionExpired()` : セッションが期限切れかどうか判定
  - `regenerateSessionId()` : セッション期限切れ時にIDを再生成して有効期限を更新

---

## 3. 使い方 / 利用例

### ■ FormRequestでバリデーションエラー時に入力値を保持する（v4.0での典型的な使い方）
```php
class PostRequest extends Request {
    public string $title;
    public string $body;

    protected function rules(Validator $validator): void {
        $validator->required($this->title, 'title');

        if (!empty($_SESSION['ERROR_MESSAGES'])) {
            (new Session)->oldPostValue($this->all());
        }
    }
}
```

### ■ セッション開始と CSRF トークン生成
```php
use app\aura\utils\Session;

$session = new Session();
$csrf_token = $session->setToken();
```

### ■ セッションのクリア
```php
$session->clear();
```

- **ポイント**
  - コンストラクタで自動的にセッション開始と有効期限設定が行われる
  - `Session::setToken()` はフォーム名に依存しない単一トークンを発行する（フォーム別トークンが必要な場合は `Controller::setToken()` を使う。[305_controller_class.md](305_controller_class.md)）
  - `oldPostValue()` で入力値を保持して画面再表示（`old` 変数）に利用可能
  - セッションの有効期限は1時間に設定されている

</nuxt-content-wrapper>
