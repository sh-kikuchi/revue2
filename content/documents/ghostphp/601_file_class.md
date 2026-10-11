---
title: File クラス
category: php
createdAt: 2025-10-12
updatedAt: 2026-09-15
sortNumber: 601
path: "/documents/ghostphp/v4.0/601_file_class"
---

<nuxt-content-wrapper>

`File` クラスは、ファイルアップロード処理を管理するユーティリティクラスである。

> v4.0での変更点（大幅リライト）:
> - 旧版は `name属性="upfile"` 固定・単一ファイルのみ対応だったが、**複数ファイル・複数input名に対応**した
> - 許可する拡張子は `.env` の `ALLOWED_EXTENSIONS`（カンマ区切り）で設定するようになった（旧版はコード内にハードコード）
> - 保存先ファイル名は `uniqid()` によるユニーク名に変更された（旧版はアップロード時のファイル名そのまま。ファイル名衝突対策）
> - 戻り値が `bool` から、**アップロードしたファイルごとの結果配列** に変更された
> - `Redirect::to()` / `$_SESSION['msg']` によるフロー制御は廃止され、呼び出し元（Service/Controller）が結果配列を見て判断する形になった

## 1. コード

```php
<?php

namespace app\aura\utils;

class File {
    public function uploadFile(array $file_data): array {
        $results = [];
        foreach ($file_data as $inputName => $data) {
            if (\is_array($data['name'])) {
                foreach ($data['name'] as $i => $name) {
                    $results[] = $this->processFile([
                        'name'     => $data['name'][$i],
                        'tmp_name' => $data['tmp_name'][$i],
                        'error'    => $data['error'][$i],
                    ]);
                }
            } else {
                $results[] = $this->processFile($data);
            }
        }
        return $results;
    }

    private function processFile(array $file): array {
        if ($file['error'] !== UPLOAD_ERR_OK) {
            return ['success' => false, 'message' => 'Upload error'];
        }

        $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        $allowed_extensions = explode(',', $_ENV['ALLOWED_EXTENSIONS']);

        if (!\in_array($extension, $allowed_extensions)) {
            return ['success' => false, 'message' => 'Invalid file type'];
        }

        $dest = 'storage/' . uniqid('', true) . '.' . $extension;

        if (!move_uploaded_file($file['tmp_name'], $dest)) {
            return ['success' => false, 'message' => 'Failed to save file'];
        }

        return ['success' => true, 'path' => $dest];
    }
}
```

## 2. コード説明
- `app\aura\utils` 名前空間下に `File` クラスを定義
- **メソッド**
  - `uploadFile(array $file_data): array`
    - 引数 `$file_data` : `$_FILES` 相当のファイル配列（複数のinput名、および `name="files[]"` のような複数選択にも対応）
    - `$data['name']` が配列（複数ファイル選択）の場合はループしてそれぞれ `processFile()` に渡す
    - 戻り値はファイルごとの結果を格納した配列（`['success' => bool, 'path' or 'message' => string]` の配列）
  - `processFile(array $file): array`（private）
    - アップロードエラーの確認（`UPLOAD_ERR_OK` でなければ失敗）
    - 拡張子チェック（`.env` の `ALLOWED_EXTENSIONS`、カンマ区切りで許可拡張子を指定）
    - `storage/` ディレクトリへ、`uniqid()` によるユニークなファイル名で保存
    - 成功時は `['success' => true, 'path' => $dest]`、失敗時は `['success' => false, 'message' => ...]`

- `.env` の設定例：
```env
ALLOWED_EXTENSIONS=gif,jpg,jpeg,png
```

## 3. 使い方 / 利用例

### ■ HTML フォーム（複数ファイル選択も可能）
```html
<form method="post" enctype="multipart/form-data" action="/upload">
    <input type="file" name="upfile" multiple>
    <button type="submit">Upload</button>
</form>
```

### ■ FormRequestでのアップロード有無チェック（`requests/FileRequest.php`）
```php
class FileRequest extends Request {
    public ?array $upfile = null;

    protected function rules(Validator $validator): void {
        $files = $this->input('_files.upfile');
        $validator->hasFile($files, 'files');
    }
}
```

### ■ サービスクラス内での使用例（`services/UserService.php`）
```php
use app\aura\utils\File;
use app\requests\FileRequest;

class UserService extends Service {
    public function __construct(
        private UserRepository $user_repository,
        private File $file,
        private Mail $mail,
        private Session $session
    ) {
        parent::__construct();
    }

    public function upload(FileRequest $file_request): void {
        $results = $this->file->uploadFile($file_request->files());
        // $resultsは ['success' => bool, 'path'|'message' => string] の配列
        foreach ($results as $result) {
            if (!$result['success']) {
                // 失敗したファイルの処理（ログ出力など）
            }
        }
    }
}
```

`File` はコンストラクタに依存を持たないため、`Router` のDI解決で自動的にインスタンス化される（[304_router_class.md](304_router_class.md)）。

</nuxt-content-wrapper>
