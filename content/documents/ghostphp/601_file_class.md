---
title: File クラス
category: php
createdAt: 2025-10-12
updatedAt: 2025-10-12
sortNumber: 305
path: "/documents/ghostphp/305_file_class"
---

<nuxt-content-wrapper>

:: 注意 ::
- 2025/10/12 現在、「upfile」というname属性のFILEリクエストですかFileクラスのアップロードができないことになっています。今後、upfile 以外の input 名でも使える柔軟版を作成します。

---

`File` クラスは、ファイルアップロード処理を管理するユーティリティクラスである。  
アップロードされたファイルの存在チェック、拡張子検証、保存先への移動などを行い、アップロードの成否を返す。



## 1. コード

```php
<?php

namespace app\aura\utils;

use app\config\Message;
use app\aura\https\Redirect;

class File {

    /**
     * uploaded_file
     * @param array $file_data 
     * @return boolean $result
     */
    function uploadFile($file_data) {
        $result = false;
        if (empty($file_data['upfile']['full_path'])) {
            $_SESSION['msg'] = 'No files have been uploaded.';
            Redirect::to('index');
            exit();
        } 

        if ($file_data['upfile']['error'] !== UPLOAD_ERR_OK) {
            $msg = [
                UPLOAD_ERR_INI_SIZE   => Message::UPLOAD_ERR['INT_SIZE'],
                UPLOAD_ERR_PARTIAL    => Message::UPLOAD_ERR['PARTIAL'],
                UPLOAD_ERR_NO_FILE    => Message::UPLOAD_ERR['NO_FILE'],
                UPLOAD_ERR_NO_TMP_DIR => Message::UPLOAD_ERR['NO_TMP_DIR'],
                UPLOAD_ERR_CANT_WRITE => Message::UPLOAD_ERR['CANT_WRITE'],
                UPLOAD_ERR_EXTENSION  => Message::UPLOAD_ERR['EXTENSION'],
            ];
            $err_msg = $msg[$file_data['upfile']['error']] ?? 'Unknown upload error.';
        } else {
            // 拡張子チェック
            $extension = strtolower(pathinfo($file_data['upfile']['name'], PATHINFO_EXTENSION));
            $allowed_extensions = ['gif', 'jpg', 'jpeg', 'png'];

            if (!in_array($extension, $allowed_extensions)) {
                $err_msg = Message::UPLOAD_ERR['NOT_IMAGE'];
            } else {
                $src  = $file_data['upfile']['tmp_name']; // temporary file path
                $dest = 'storage/' . $file_data['upfile']['name'];

                if (!move_uploaded_file($src, $dest)) {
                    $err_msg = Message::UPLOAD_ERR['FAILED'];
                } else {
                    $result = true;
                }
            }
        }
        return $result;
    }
}
?>
```

## 2. コード説明
- `app\aura\utils` 名前空間下に `File` クラスを定義
- `$file_data`：`$_FILES` に相当するファイル配列。`'upfile'` キーを持つ必要がある。

- **メソッド**
```php
function uploadFile($file_data)
```
- 引数 `$file_data` : アップロードされたファイル情報（`$_FILES` 配列）
- 戻り値 `$result` : 成功時は `true`、失敗時は `false`

- **処理概要**
1. アップロードファイルの存在チェック
2. アップロードエラーコードの確認
3. 拡張子チェック（gif, jpg, jpeg, png のみ許可）
4. 保存先 (`storage/` ディレクトリ) への移動
5. 成功なら `true` を返し、失敗時はセッションメッセージをセットしてリダイレクト可能

## 3. 使い方 / 利用例

### ■ HTML フォーム
```html
<form method="post" enctype="multipart/form-data" action="/upload">
    <input type="file" name="upfile">
    <button type="submit">Upload</button>
</form>
```

### ■ サービスクラス内での使用例
```php
use app\aura\utils\File;

$fileHandler = new File();

if ($fileHandler->uploadFile($_FILES)) {
    echo "Upload successful!";
} else {
    echo "Upload failed!";
    // エラーメッセージは $_SESSION['msg'] に格納される場合がある
}
```

- コントローラーやサービスから呼び出して利用可能
- 画像ファイルのアップロードに限定したユーティリティとして機能

</nuxt-content-wrapper>
