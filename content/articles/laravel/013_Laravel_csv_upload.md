---
title: LaravelでCSV出力
description: StreamedResponseを使ってみよう。
category: laravel
createdAt: 2021-11-03
updatedAt: 2021-11-03
sortNumber: 12
path: "/articles/laravel/013_Laravel_csv_upload"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. アップロード機能](#2-アップロード機能)
- [3. おわりに](#3-おわりに)

<br>

# 1. はじめに
前回がCSVのダウンロード機能であったので、アップロード機能をまとめたい。なお、ルーティングやビューの内容は省略する。

<br>

# 2. アップロード機能
```php
<?php
use Illuminate\Http\Request;
public function import_csv(Request $request)
{
    // アップロードファイルのファイルパスを取得
    $file_path = $request->file('csv')->path();
    // CSV取得
    $file = new \SplFileObject($file_path);
    $file->setFlags(
        \SplFileObject::READ_CSV |　　　　　// CSVとして行を読み込み
        \SplFileObject::READ_AHEAD |　　　　// 先読み／巻き戻しで読み込み
        \SplFileObject::SKIP_EMPTY |　　　　 // 空行を読み飛ばす
        \SplFileObject::DROP_NEW_LINE　　　　// 行末の改行を読み飛ばす
    );
    // 一行ずつ処理
    foreach($file as $line)
    {
        $data = [
            ‘id’     => $line[0],
            ‘name’   => $line[1],
            ‘sex’    => $line[2],
            ‘message’=> $line[3],
        ];
    }
    exit;
}
```



# 3. おわりに
`SplFileObject`をつかえば比較的簡単にアップロード機能が実装できることがわかった。フォームリクエストやCSVの中身のバリデーションについても今後学んでいきたい（2022-11-07）

</nuxt-content-wrapper>
