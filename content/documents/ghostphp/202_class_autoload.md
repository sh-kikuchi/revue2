---
title: クラスとオートロード
category: php
createdAt: 2025-10-12
updatedAt: 2025-10-12
sortNumber: 202
path: "/documents/ghostphp/202_class_autoload"
---
<nuxt-content-wrapper>

## 概要

この章では **AutoloadManager** の役割と基本構造を説明する。  
フレームワーク内でどのように機能するか、また開発者がどのように利用できるかを示す。

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
  $loader->registerDir(__DIR__ . '/models');
  $loader->registerDir(__DIR__ . '/services');
  ```

- 自動読み込みの実行
  ```php
  $loader->autoload();
  ```

- 処理フロー
1. AutoloadManager をインスタンス化
2. registerDir() で必要なディレクトリを登録
3. autoload() を呼ぶと、登録ディレクトリ内の PHP ファイルをすべて読み込む
4. 読み込まれたクラスがアプリケーションで使用可能になる


- 注意点
  - ディレクトリが存在しない場合、die() で処理が停止する
  - ファイル名が . または .. の場合はスキップされる
</nuxt-content-wrapper>