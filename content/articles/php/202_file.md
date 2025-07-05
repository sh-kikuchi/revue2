---
title: Ghost PHP
description: ファイルアップロード
category: php
createdAt: 2025-06-28
updatedAt: 2025-06-28
sortNumber: 202
path: "/articles/php/202_file_upload"
---

<nuxt-content-wrapper>

- [1. 概要](#1-概要)
- [2. 主な責務](#2-主な責務)
- [3. メソッド詳細](#3-メソッド詳細)
    - [`uploadFile(array $file_data): bool`](#uploadfilearray-file_data-bool)
- [4. 使用例](#4-使用例)

<br>

# 1. 概要

`File` クラスは、ファイルのアップロード処理を担当するユーティリティクラスです。  
フォームから送信されたファイルの検証、移動、保存処理を行い、拡張子やエラーコードに基づいてエラーハンドリングも提供します。

<br>

# 2. 主な責務

| 項目             | 内容 |
|------------------|------|
| アップロード検証 | エラーチェック、拡張子チェック |
| ファイル保存     | `move_uploaded_file()` による保存処理 |
| エラーメッセージ | `$_SESSION['msg']` または `Message::UPLOAD_ERR` 定数を使用 |
| ページ遷移       | アップロード失敗時に `Redirect::to()` により遷移 |

<br>

# 3. メソッド詳細

### `uploadFile(array $file_data): bool`

#### 引数

- `$file_data`：`$_FILES` に相当するファイル配列。`'upfile'` キーを持つ必要がある。

#### 処理内容

1. `full_path` が空の場合、エラーメッセージをセットしてリダイレクト。
2. アップロードエラーコードに応じてメッセージを出力。
3. 許可された拡張子（`gif`, `jpg`, `jpeg`, `png`）かを判定。
4. 一時ファイルを保存ディレクトリ（`storage/`）に移動。
5. 成功時は `true` を返却、失敗時は `false`。

#### 戻り値

- `true`：アップロード成功
- `false`：アップロード失敗

<br>

# 4. 使用例

```php
use app\aura\utils\File;

$file = new File();

if ($file->uploadFile($_FILES)) {
    echo "アップロード成功";
} else {
    echo "アップロード失敗";
}
