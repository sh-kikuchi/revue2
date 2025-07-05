---
title: Ghost PHP
description: ロガークラス
category: php
createdAt: 2025-06-28
updatedAt: 2025-06-28
sortNumber: 204
path: "/documents/ghostphp/204_logger"
---

<nuxt-content-wrapper>

- [1. 概要](#1-概要)
- [2. 主な責務](#2-主な責務)
- [3. ログレベル](#3-ログレベル)
- [4. メソッド一覧](#4-メソッド一覧)
    - [`__construct(?string $fileName = null)`](#__constructstring-filename--null)
    - [`setLogFile(string $fileName): void`](#setlogfilestring-filename-void)
    - [`error(string $msg): void`](#errorstring-msg-void)
    - [`warn(string $msg): void`](#warnstring-msg-void)
    - [`info(string $msg): void`](#infostring-msg-void)
    - [`debug(string $msg): void`](#debugstring-msg-void)
    - [`out(string $level, string $msg): void`](#outstring-level-string-msg-void)
    - [`getTime(): string`](#gettime-string)
- [5. 使用例](#5-使用例)

<br>

# 1. 概要

`Logger` クラスは、アプリケーション内でログをファイル出力するための汎用ユーティリティです。  
エラー、警告、情報、デバッグの4つのレベルに対応し、ファイル名の指定や日付による自動生成にも対応しています。

<br>

# 2. 主な責務

| 項目             | 内容 |
|------------------|------|
| ログディレクトリ管理 | `/logs` ディレクトリを自動生成 |
| ログファイル出力   | ファイルに追記 (`file_put_contents`) |
| ログレベル分離     | `error`, `warn`, `info`, `debug` メソッド |
| ファイル名検証     | 英数・アンダースコア・ハイフン・`.log` 拡張子のみ許容 |

<br>

# 3. ログレベル

| レベル | メソッド | 用途 |
|--------|----------|------|
| ERROR  | `error()` | 致命的なエラーの記録 |
| WARN   | `warn()`  | 注意すべき事象の記録 |
| INFO   | `info()`  | 処理成功などの記録 |
| DEBUG  | `debug()` | デバッグ用の詳細記録 |

<br>

# 4. メソッド一覧

### `__construct(?string $fileName = null)`

- ログディレクトリを作成し、ファイル名を設定（省略時は `log_YYYY-MM-DD.log`）

---

### `setLogFile(string $fileName): void`

- ログファイル名を動的に変更。
- 許容形式: `^[a-zA-Z0-9_-]+\.log$`

---

### `error(string $msg): void`

- エラーレベルのログを出力

---

### `warn(string $msg): void`

- 警告レベルのログを出力

---

### `info(string $msg): void`

- 情報レベルのログを出力

---

### `debug(string $msg): void`

- デバッグレベルのログを出力

---

### `out(string $level, string $msg): void`

- 内部利用：指定レベルでファイル出力

---

### `getTime(): string`

- `Y-m-d H:i:s.ms` 形式のタイムスタンプを返す

<br>

# 5. 使用例

```php
use app\aura\Logger;

$logger = new Logger(); // logs/log_2025-06-28.log に記録される

$logger->error('データベース接続エラー');
$logger->warn('メール送信に失敗しました');
$logger->info('ユーザーがログインしました');
$logger->debug('POSTデータ: ' . json_encode($_POST));
