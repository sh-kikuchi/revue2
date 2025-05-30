---
title: File クラス
description:
category: php
createdAt: 2025-04-28
updatedAt: 2025-04-28
sortNumber: 201
path: "/documents/ghostphp/201_file"
---

# File クラス

`File` クラスは、ファイルアップロード処理を管理します。主に、ファイルが正常にアップロードされたかどうかをチェックし、エラーメッセージを適切に表示します。また、アップロードされたファイルが指定された条件（拡張子など）を満たしているかどうかも確認します。

## メソッド

### `uploadFile($file_data)`
このメソッドは、ファイルをサーバーにアップロードします。アップロード時に発生したエラーをチェックし、適切なエラーメッセージを表示します。また、指定された拡張子が許可されているかどうかも確認します。

- **引数**: 
  - `$file_data`: アップロードされたファイルのデータを含む配列。
  
- **返り値**: 
  - `boolean`: アップロードが成功した場合は `true`、失敗した場合は `false`。

### 処理の流れ

1. **ファイルがアップロードされていない場合**:
   - ファイルがアップロードされていない場合、セッションにエラーメッセージを設定し、`index` ページにリダイレクトします。

2. **ファイルアップロードエラーの処理**:
   - アップロードエラーが発生した場合、`$file_data['upfile']['error']` をチェックし、対応するエラーメッセージを `Message` クラスから取得して表示します。

3. **拡張子チェック**:
   - アップロードされたファイルの拡張子が `gif`, `jpg`, `jpeg`, `png` のいずれかであることを確認します。許可されていない拡張子の場合、エラーメッセージを表示します。

4. **ファイルの移動**:
   - ファイルが一時的なディレクトリから指定された保存先 (`storage/`) に移動できるか確認します。移動に失敗した場合、エラーメッセージを表示します。

5. **アップロード成功**:
   - ファイルのアップロードが正常に完了した場合、`true` を返します。

## エラーメッセージ

エラーメッセージは、`Message` クラスの定数 `UPLOAD_ERR` から取得されます。以下は、エラーコードと対応するメッセージです：

- `UPLOAD_ERR_INI_SIZE`: 最大ファイルサイズを超えた場合
- `UPLOAD_ERR_PARTIAL`: ファイルが部分的にしかアップロードされなかった場合
- `UPLOAD_ERR_NO_FILE`: ファイルがアップロードされていない場合
- `UPLOAD_ERR_NO_TMP_DIR`: 一時ディレクトリが見つからない場合
- `UPLOAD_ERR_CANT_WRITE`: ファイルに書き込めない場合
- `UPLOAD_ERR_EXTENSION`: アップロード拡張子のエラー
- `UPLOAD_ERR_FAILED`: その他のエラー（ファイルの移動失敗など）

## 使用例
```php
$file = new File();
$file_data = $_FILES; // PHPの$_FILESグローバル変数を使ってアップロードされたファイル情報を取得

if ($file->uploadFile($file_data)) {
    echo "ファイルが正常にアップロードされました。";
} else {
    echo "ファイルのアップロードに失敗しました。";
}
