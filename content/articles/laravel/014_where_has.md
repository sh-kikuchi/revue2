---
title: 中間テーブルに対する検索
description: whereHasの活用方法
category: laravel
createdAt: 2022-06-15
updatedAt: 2022-06-15
sortNumber: 14
path: "/articles/laravel/014_where_has"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. whereHas](#2-wherehas)
- [3. おわりに](#3-おわりに)

<br>


# 1. はじめに
「あるチャンネルに属するユーザーを出す」というクエリ文を書きたい、、こう思っていたのだが、両者の関係が「多」対「多」なので書こうと思うと意外にめんどくさい気がする。whereHasの処理は遅いらしく、ベストプラクティスではないかもしれない。けれど、スキル的にはストックしておこうと思う。ヴァージョンはLaravel9で動作検証済み。。

<br>

■ この実装を行ったアプリ: [smalltalk](http://toolbox-smalltalk.herokuapp.com/login)
- メールアドレス（テスト用）：test@test.com
- パスワード（テスト用）：testtest

<br>

# 2. whereHas
whereHasはリレーション先の中間テーブルのカラムの値に対して検索をかけたい時に使える。
- channels
- users
- channel_user(中間テーブル)

<br>


コールバック関数の中でリレーション先である中間テーブル(channel_user)の検索条件を指定してあげれば良い。
use( 変数 )と渡してあげると、変数を扱うことが可能。ここで$channel（Channelというモデルから出来たインスタンス、依存性の注入）を変数としてセットすると、その中でクエリの条件として使用することができる。

<br>


```php
    public function index(Channel $channel)
    {

        $users = User::whereHas('channels', function($query)use($channel){
             $query->where('channel_user.channel_id',$channel->id);
        })->paginate(10);

        return view('user.index',compact('users'));
    }
```

<br>

# 3. おわりに
中間テーブル（channel_user）をつくると、channelsとusersには外部キーがないため、どうやって連携するんだという少し考える必要がある。eloquentはLaravelでのDB操作の作法だから、その点ではFWならではの学習コストがかかりますなとシミジミ...。

- [【Laravel】EloquentのwhereHasで変数を扱う方法！](https://akizora.tech/laravel-wherehas-4276)
- [【Laravel】中間テーブルのカラムに対して検索をかけたい時](https://blog.popweb.dev/programming/laravel/%E3%80%90laravel%E3%80%91%E4%B8%AD%E9%96%93%E3%83%86%E3%83%BC%E3%83%96%E3%83%AB%E3%81%AE%E3%82%AB%E3%83%A9%E3%83%A0%E3%81%AB%E5%AF%BE%E3%81%97%E3%81%A6%E6%A4%9C%E7%B4%A2%E3%82%92%E3%81%8B%E3%81%91/)

</nuxt-content-wrapper>
