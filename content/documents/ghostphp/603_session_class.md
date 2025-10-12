---
title: Session クラス
category: php
createdAt: 2025-10-12
updatedAt: 2025-10-12
sortNumber: 603
path: "/documents/ghostphp/603_session_class"
---

<nuxt-content-wrapper>

`Session` クラスは、PHP のセッション管理を簡略化するユーティリティである。  
セッション開始、セッションIDの再生成、CSRFトークンの発行、入力値の保持、セッション有効期限管理などを行う。

---

## 1. コード

```php
<?php
namespace app\aura\utils;

class Session{
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
      $_SESSION = array();
    }

    private function isSessionStarted() {
      if(session_status() === PHP_SESSION_NONE){
        session_start();
      }
    }

    public function regenerateId() {
      session_regenerate_id(true);
    }

    function oldPostValue($oldPostValue){
      foreach($oldPostValue as $key => $value){
          $_SESSION['old'][$key] = $value;
      }
    }

    function setToken() :string {
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
?>
```

---

## 2. コード説明

- **名前空間**  
  ```php
  namespace app\aura\utils;
  ```

- **プロパティ**  
  - `$sessionStarted` : セッション開始済みかどうかのフラグ  
  - `$sessionIdRegenerated` : セッションIDを再生成済みかどうかのフラグ

- **メソッド**
  - `__construct()` : セッション開始・有効期限設定・ID再生成・有効期限チェック  
  - `clear()` : セッションをクリア  
  - `isSessionStarted()` : セッションが開始されているか確認  
  - `regenerateId()` : セッションIDを再生成  
  - `oldPostValue($oldPostValue)` : バリデーションエラー時に入力値を保持  
  - `setToken()` : CSRFトークンを生成してセッションに保存  
  - `setSessionExpiry()` : セッション有効期限を設定  
  - `isSessionExpired()` : セッションが期限切れかどうか判定  
  - `regenerateSessionId()` : セッション期限切れ時にIDを再生成して有効期限を更新

---

## 3. 使い方 / 利用例

### ■ セッション開始と CSRF トークン生成
```php
use app\aura\utils\Session;

$session = new Session();
$csrf_token = $session->setToken();
```

### ■ バリデーションエラー時に入力値保持
```php
$session->oldPostValue($_POST);
```

### ■ セッションのクリア
```php
$session->clear();
```

- **ポイント**
  - コンストラクタで自動的にセッション開始と有効期限設定が行われる
  - CSRFトークンは `setToken()` で生成
  - `oldPostValue()` で入力値を保持して画面再表示に利用可能
  - セッションの有効期限は 1 時間に設定されている

</nuxt-content-wrapper>
