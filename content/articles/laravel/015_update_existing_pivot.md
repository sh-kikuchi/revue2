---
title: 中間テーブルの更新
description: updateExistingPivotの活用方法
category: laravel
createdAt: 2022-06-15
updatedAt: 2022-06-15
sortNumber: 15
path: "/articles/laravel/015_update_existing_pivot"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. 中間テーブルのマイグレーション（参考）](#2-中間テーブルのマイグレーション参考)
- [3. updateExistingPivotメソッド](#3-updateexistingpivotメソッド)
- [4. おわりに](#4-おわりに)

<br>

# 1. はじめに
中間テーブルに外部キーとは別に、statusというカラムを作って、1だったら「承認」、0だったら「承認まち」というような処理を書きたいと思った。なので、ビュー側からアクションがあった時に中間テーブルのカラムをどうやって更新すれば良いか。

<br>

■ この実装を行ったアプリ: [smalltalk](http://toolbox-smalltalk.herokuapp.com/login)
- メールアドレス（テスト用）：test@test.com
- パスワード（テスト用）：testtest

<br>

# 2. 中間テーブルのマイグレーション（参考）
外部キーだけでなく、チャンネルに属するユーザーのステータス（チャンネル参加の承諾）用のカラムを用意している。
今回はその更新処理を実装する。

```php
class CreateChannelUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('channel_user', function (Blueprint $table) {
            $table->id();
            $table->BigInteger('user_id')->unsigned()->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->uuid('channel_id')->nullable(false);
            $table->foreign('channel_id')->references('id')->on('channels')->onDelete('cascade');
            $table->BigInteger('status')->unsigned()->default(0); //0:承認待ち 1:承認
            $table->timestamps();
            $table->unique([
                'user_id',
                'channel_id'
            ]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('channel_user');
    }
}

```

<br>

# 3. updateExistingPivotメソッド
公式ドキュメントが頼りになりました。（日本語訳、ありがとう）

---
> リレーションの中間テーブルの既存のカラムを更新する必要がある場合は、updateExistingPivotメソッドを使用します。このメソッドは、更新する中間レコードの外部キーと属性の配列を引数に取ります。
---

<br>

私のアプリの中では下記のように実装しています。あるユーザーが有するチャンネルの中から、指定のチャンネルIDで検索をかけ、ステータスを1に更新するという動作。

<br>

```php
    /**
     * 承認待ち
     */
    public function join(Channel $channel, Request $request)
    {
        $user_id = $request-> user_id;
        $channel_id = $channel-> id;

        try{
            $user = User::find($user_id);
            // 中間テーブルのレコード更新
            $user->channels()->updateExistingPivot($channel_id,['status' => 1]);
        }catch(\Exception $e){
            $e->getMessage();
        }

        return redirect()->route('user.index',compact('channel'));
    }
```

<br>

# 4. おわりに
なかなか中間テーブルに外部キー以外のカラムを追加して更新するみたいな実装のカンペを見つけるのが大変だったが、Laravelの公式ドキュメントで分かりやすく書いてあったので大助かり。。

- [Laravel9.x Eloquent:リレーション](https://readouble.com/laravel/9.x/ja/eloquent-relationships.html?header=%25E4%25B8%25AD%25E9%2596%2593%25E3%2583%2586%25E3%2583%25BC%25E3%2583%2596%25E3%2583%25AB%25E3%2581%25AE%25E3%2583%25AC%25E3%2582%25B3%25E3%2583%25BC%25E3%2583%2589%25E6%259B%25B4%25E6%2596%25B0)

</nuxt-content-wrapper>
