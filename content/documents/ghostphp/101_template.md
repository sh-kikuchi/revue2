---
title: Template クラス
description:
category: php
createdAt: 2025-04-28
updatedAt: 2025-04-28
sortNumber: 101
path: "/documents/ghostphp/101_template"
---

# Template クラス

`Template` クラスは、指定されたテンプレートファイルをレンダリングし、そのファイル内で使用するデータを提供します。このクラスを使用することで、HTMLテンプレートに動的なデータを簡単に埋め込むことができます。

## 機能概要

### 1. テンプレートのレンダリング
このクラスは、指定されたテンプレートファイルを読み込み、テンプレート内で使えるようにデータを変数として抽出します。その後、テンプレートファイルをインクルードして出力します。

- **メソッド**: `render()`
  - **説明**: テンプレートファイルをレンダリングし、テンプレート内で渡されたデータを変数として利用できるようにします。指定されたテンプレートファイル（`templates/` フォルダ内）を読み込んで表示します。
  - **返り値**: なし

### 2. コンストラクタ
- **メソッド**: `__construct(string $path, array $data)`
  - **説明**: `Template` クラスのインスタンスを初期化します。`$path` にはテンプレートファイルのパス（ファイル名）、`$data` にはそのテンプレートに渡すデータを指定します。

  - **引数**:
    - `$path`: テンプレートファイルのパス（文字列）。`templates/` フォルダ内のPHPファイルを指定します。
    - `$data`: テンプレートに渡すデータ（連想配列）。データが空でない場合、そのデータをテンプレートに渡します。

## 利用例

### テンプレートのレンダリング

```php
$data = [
    'title' => 'Welcome to My Website',
    'content' => 'This is the content of the page.'
];

$template = new Template('homepage', $data);
$template->render();
