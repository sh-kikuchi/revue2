---
title: LaravelでCSV出力
description: StreamedResponseを使ってみよう。
category: laravel
createdAt: 2021-11-03
updatedAt: 2021-11-03
sortNumber: 12
path: "/articles/laravel/012_Laravel_csv_download"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. ボタン作り](#2-ボタン作り)
- [3. ルーティング](#3-ルーティング)
- [4. おわりに](#4-おわりに)

<br>

# 1. はじめに
 Bookstockというアプリを作った。そこではテーマごとに本を整理することができ、且つ本のブックメモが書ける、けどCSV出力が出来ると良いな・・・と。なので、今回はLaravelのCSV出力にチャレンジしてみたいと思ふ。<br>

 [Bookstock](http://sk-bookstock.herokuapp.com) <br> 
- メールアドレス：test@test.com
- パスワード：testtest

<br>

※ マイグレーションファイル
- 今回はマイグレーションの解説は省略しますが、テーブル「books」を用意していることを前提に本記事の話を進めていきます。
- 説明の便宜上、実際書いたコードとは若干異なります
```
    public function up()
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('name');
            $table->string('title');
            $table->string('publisher');
            $table->string('year');
            $table->timestamps();
        });
    }
```

<br>

# 2. ボタン作り
- ここでは、「CSV出力」のボタンを押下した時に、引数としてユーザーIDとテーマIDをとってみたいと思います。フォームのPOST通信を使い、隠れINPUTを用意して値を渡してみます。<br>

- inputの中身
```html
<form id='csvform' action="{{ route('book.csv.export') }}" method="POST">
    @csrf
    <input hidden name="book_id" value ="{{ $theme -> id }}">
    <button type='submit' class="btn btn-primary">csv出力</button>
</form>
```

<br>

# 3. ルーティング
- Laravel8の場合
```php
Route::post('book/csv/export',[App\Http\Controllers\BookController::class,'csvExport'])->name('book.csv.export');
```
- Laravel8より前の場合
```php
Route::post('csv/export', 'BookController@csvExport')->name('book.csv.export');
```

■ CSV出力（Controllerに記述する）
```php
    public function csvExport(Request $request) {

            //フォームからテーマIDを受け取る
            $book_id = $request->book_id;

            //StreamedResponseの処理で使うuse ($request, $book_id)を忘れずに
            $response = new StreamedResponse(function () use ($request, $book_id) {
                $stream = fopen('php://output','w');

                // 文字化け回避
                stream_filter_prepend($stream, 'convert.iconv.utf-8/cp932//TRANSLIT');

                // 任意のSQL文（今回は引数として$book_idを使っています）
                $results  = Theme::find($book_id)->books()->get();

                //存在する場合はデータをCSVに書き出す（fputcsv）
                if (empty($results[0])) {
                        fputcsv($stream, [
                            'データがありませんでした。',
                        ]);
                } else {
                    foreach ($results as $row) {
                        fputcsv($stream, $this->_csvRow($row));
                    }
                }
                fclose($stream);
            });
            $response->headers->set('Content-Type', 'application/octet-stream');
            $response->headers->set('content-disposition', 'attachment; filename=ブックリスト.csv');

            return $response;
    }

    //出力したいカラムを調整できる。
    public function _csvRow($row){
      return [
          $row->name,
          '『'.$row->title.'』', ←書名なので『』つけてみた♪
          $row->publisher,
          $row->year
      ];
    }

    //ヘッダーを定義する
    public function _csvHeader(){
        return [
            '著者名',
            'タイトル',
            '出版社',
            '出版年'
        ];
    }
```

<br>

# 4. おわりに
下記、参考にしていたんだけど、Yuus Memoのサイト閉じちゃっているっぽい。残念だな。（お世話になりました。どうもありがとうございました。）

- [Yuus Memo -【Laravel】CSVエクスポート ☆超簡単！！](https://www.yuu-progra.com/2021/04/25/%e3%80%90laravel%e3%80%91csv%e3%82%a8%e3%82%af%e3%82%b9%e3%83%9d%e3%83%bc%e3%83%88-%e2%98%86%e8%b6%85%e7%b0%a1%e5%8d%98%ef%bc%81%ef%bc%81/)

</nuxt-content-wrapper>
