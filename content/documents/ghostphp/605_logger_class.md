---
title: Logger クラス
category: php
createdAt: 2025-10-12
updatedAt: 2025-10-12
sortNumber: 308
path: "/documents/ghostphp/308_logger_class"
---

<nuxt-content-wrapper>

`Logger` クラスは、アプリケーション内でのログ記録を簡単に行うためのユーティリティクラスである。  
複数のログレベル（ERROR / WARN / INFO / DEBUG）に対応し、ログファイルに追記形式で記録する。  
日付ごとにログファイルを生成したり、カスタムファイル名でログを出力することも可能。



## 1. コード

```php
<?php
namespace app\aura;

use DateTime;
use Exception;

class Logger {

    const LOG_LEVEL_ERROR = 0;
    const LOG_LEVEL_WARN  = 1;
    const LOG_LEVEL_INFO  = 2;
    const LOG_LEVEL_DEBUG = 3;

    private string $logDirectory;
    private string $logFile;

    public function __construct(?string $fileName = null) {
        $this->logDirectory = dirname(__DIR__) . '/logs';
        if (!is_dir($this->logDirectory)) {
            mkdir($this->logDirectory, 0777, true);
        }
        $this->setLogFile($fileName ?? 'log_' . date('Y-m-d') . '.log');
    }

    public function setLogFile(string $fileName): void {
        if (!preg_match('/^[a-zA-Z0-9_-]+\.log$/', $fileName)) {
            throw new Exception("Invalid log file name.");
        }
        $this->logFile = $this->logDirectory . '/' . $fileName;
    }

    public function error(string $msg): void { $this->out('ERROR', $msg); }
    public function warn(string $msg): void  { $this->out('WARN', $msg); }
    public function info(string $msg): void  { $this->out('INFO', $msg); }
    public function debug(string $msg): void { $this->out('DEBUG', $msg); }

    private function out(string $level, string $msg): void {
        $time = $this->getTime();
        $logEntry = "[$time] [$level] $msg" . PHP_EOL;
        try {
            file_put_contents($this->logFile, $logEntry, FILE_APPEND | LOCK_EX);
        } catch (Exception $e) {
            error_log("Logger Error: " . $e->getMessage());
        }
    }

    private function getTime(): string {
        $miTime = explode('.', microtime(true));
        $msec = str_pad(substr($miTime[1], 0, 3), 3, "0");
        return date('Y-m-d H:i:s', $miTime[0]) . '.' . $msec;
    }
}
?>
```



## 2. コード説明

- **名前空間**
```php
namespace app\aura;
```

- **定数**
  - `LOG_LEVEL_ERROR` / `LOG_LEVEL_WARN` / `LOG_LEVEL_INFO` / `LOG_LEVEL_DEBUG` : ログレベル定義

- **プロパティ**
  - `$logDirectory` : ログファイル格納ディレクトリ
  - `$logFile` : ログファイルパス

- **メソッド**
  - `__construct(?string $fileName)` : ログディレクトリ作成とログファイル設定
  - `setLogFile(string $fileName)` : ログファイル名の動的変更
  - `error(string $msg)` / `warn(string $msg)` / `info(string $msg)` / `debug(string $msg)` : レベル別ログ出力
  - `out(string $level, string $msg)` : 実際にファイルに書き込む内部メソッド
  - `getTime()` : `Y-m-d H:i:s.ms`形式のタイムスタンプ取得



## 3. 使い方 / 利用例

### ■ 基本的な使い方
```php
use app\aura\Logger;

$logger = new Logger(); // 日付付きデフォルトファイルにログ出力

$logger->info("Application started");
$logger->warn("Low disk space");
$logger->error("Failed to connect to DB");
$logger->debug("Debugging value: " . json_encode($data));
```

### ■ カスタムファイル名でログ出力
```php
$logger = new Logger("custom_app.log");

$logger->info("Custom log file example");
```

### ■ ポイント
- ログディレクトリは自動生成
- 日付ごとのファイル作成や、任意のファイル名指定可能
- ログレベルごとにメソッドが用意され、手軽に分類可能
- 内部でファイル書き込みに失敗した場合は `error_log` に出力

</nuxt-content-wrapper>
