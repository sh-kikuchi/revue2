---
title: クラスとオートロード
category: php
createdAt: 2025-10-12
updatedAt: 2026-09-15
sortNumber: 202
path: "/documents/ghostphp/v4.0/202_class_autoload"
---
<nuxt-content-wrapper>

## 概要

この章では **AutoloadManager** の役割と基本構造を説明する。
フレームワーク内でどのように機能するか、また開発者がどのように利用できるかを示す。

v4.0でもクラス自体の実装に変更はない（PSR-4名前空間クラスはComposerのオートローダーが解決するため、
`AutoloadManager` は主に名前空間を持たない関数ファイルや設定ファイルの読み込みに使われる）。

## 1. クラス / モジュールのコード

```php
<?php

namespace app\aura;

class AutoloadManager {
    protected array $dirs;

    public function registerDir(string $target_dir) {
        $this->dirs[] = $target_dir;
    }

    public function autoload() {
        foreach ($this->dirs as $dir) {
            // Scan files in the directory
            $files = scandir($dir);

            if ($files === false) {
                echo "Failed to open directory: " . $dir;
                die();
            }

            if (!empty($files)) {
                foreach ($files as $file) {
                    if ($file == '.' || $file == '..') continue;
                    require_once $dir . '/' . $file;
                }
            }
        }
    }
}
```

## 2. コード説明
主要機能: コードが何をしているかを簡潔に説明

- プロパティ
  - $dirs : 登録されたディレクトリの配列

- メソッド
  - registerDir(string $target_dir) : 指定したディレクトリを $dirs に登録する
  - autoload() : 登録されたディレクトリを順番に読み込み、PHP ファイルを require_once する

- 注意点
  - ディレクトリが存在しない場合、die() で処理が停止する
  - ファイル名が . または .. の場合はスキップされる

## 3. 使い方 / 利用例
主要機能: コードが何をしているかを簡潔に説明

- 初期化とディレクトリ登録
  ```php
  $loader = new \app\aura\AutoloadManager();
  $loader->registerDir(__DIR__ . '/aura/utils/functions');
  $loader->registerDir(__DIR__ . '/interfaces/repositories');
  ```

- 自動読み込みの実行
  ```php
  $loader->autoload();
  ```

- 処理フロー
1. AutoloadManager をインスタンス化
2. registerDir() で必要なディレクトリを登録
3. autoload() を呼ぶと、登録ディレクトリ内の PHP ファイルをすべて読み込む
4. 読み込まれたクラス・関数がアプリケーションで使用可能になる

- 注意点
  - ディレクトリが存在しない場合、die() で処理が停止する
  - ファイル名が . または .. の場合はスキップされる
  - `controllers/` `services/` `repositories/` `entities/` `requests/` 配下のクラスは
    `AutoloadManager` ではなく、Composer の PSR-4 オートローダー（`vendor/autoload.php`）が解決する。
    実際にどのディレクトリが `AutoloadManager` に登録されているかは [203_bootstrap.md](203_bootstrap.md) を参照。

</nuxt-content-wrapper>
