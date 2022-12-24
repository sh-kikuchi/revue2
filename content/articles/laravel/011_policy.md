---
title: Policyの実装
description: 削除処理を例に
category: laravel
createdAt: 2022-04-13
updatedAt: 2022-06-15
sortNumber: 11
path: "/articles/laravel/011_policy"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2.  php artisanでまずはファイル生成](#2--php-artisanでまずはファイル生成)
- [3. Policyファイル内の編集](#3-policyファイル内の編集)
- [4. コントローラーでpolicyの読み込み](#4-コントローラーでpolicyの読み込み)
- [5. おわりに](#5-おわりに)

<br>

# 1. はじめに
例えば、ログインユーザーではない人が削除処理のURLを叩くことで処理を動かしてしまうとしたら。怖いね。なので自分しか削除できないようにしたい、そんな権限を設定したい。

<br>

# 2.  php artisanでまずはファイル生成

```
　php artisan make:policy CommentPolicy
```

プロジェクトディレクトリで上記コマンドを叩く。
`app/Policies`内に`CommentPolicy.php`ファイルが生成される。この時、このファイル内でデフォルトとしてUserモデルと●●Policy、ここではCommentモデルが使えるようになっているよ。

<br>

# 3. Policyファイル内の編集
※CommentPolicy
```php
public function destroy(User $user, Comment $comment)
{
    return $user->id === $comment->user_id;
}
```
ログインユーザーとコメントを書いたユーザーが一致したら削除処理出来るよっていう意味じゃ。

<br>

# 4. コントローラーでpolicyの読み込み
※CommentController
```php
public function destroy(chat $chat, Comment $comment)
{
    try{
        $this->authorize('destroy',$comment);
        $comment = Comment::find($comment -> id);
        $comment->delete();
    }catch(\Exception $e){
        $e->getMessage();
    }

    return redirect()->route('comment.show',$chat->id);
}
```
↑
`$this->authorize('destroy',$comment);`でpolicyファイル内のdestroyメソッドで権限があるかどうかを判定するんだ。へぇ。

<br>

# 5. おわりに
特定の人しか削除されないように、削除ボタンの表示と非表示を権限の如何で切り替えたり、
今回のようにポリシー設定をしたりとセキュリティ対策をしましょうってことだけど、
削除は気ぃつかう(;´･ω･)。メンドクナッタラニゲロ。


<br>

</nuxt-content-wrapper>
