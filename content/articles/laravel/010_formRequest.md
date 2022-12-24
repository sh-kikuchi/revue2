---
title: フォームリクエスト
description: ヴァリデーションの色々
category: laravel
createdAt: 2022-04-13
updatedAt: 2022-04-13
sortNumber: 10
path: "/articles/laravel/010_formRequest"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2.  php artisanでまずはファイル生成](#2--php-artisanでまずはファイル生成)
- [3. 権限付与する？](#3-権限付与する)
- [4. ヴァリデーション設定](#4-ヴァリデーション設定)
- [5. エラーメッセージをつくる](#5-エラーメッセージをつくる)
- [6.コントローラー](#6コントローラー)
- [7. ビューにエラーメッセージを表示](#7-ビューにエラーメッセージを表示)
- [8. おわりに](#8-おわりに)

<br>

# 1. はじめに
Laravelのヴァリデーションも色々あるけど、フォームリクエストはお手軽。
コントローラーの処理に入る前にヴァリデーションが行われる（リクエスト段階）ので、
コントローラーの処理とヴァリデーションを分けて管理することが出来て良いわ。

<br>

# 2.  php artisanでまずはファイル生成

```
 php artisan make:request ReviewRequest
```

プロジェクトディレクトリで上記コマンド（ReviewRequestの部分は任意）を叩けば、`app/Http/Requests`内にReviewRequestというファイルが生成されますわ。ではその中はいかに。。

<br>

# 3. 権限付与する？
```php
public function authorize()
{
    return true;
}
```
特定のユーザーにこのリクエストの権限を付与することが出来る。といっても、Policyという別なやつを僕は使っているので、[Laravell9のレファレンス](https://readouble.com/laravel/9.x/ja/validation.html)でも下記の記述があるようにauthorizeメソッドからtrueを返すだけにするわ。だから、ここは楽する。

>アプリケーションの別の部分でリクエストの認可ロジックを処理する場合は、authorizeメソッドからtrueを返してください。

<br>

# 4. ヴァリデーション設定
```php
public function rules()
{
    return [
      'name' => 'required|string|max:25',
      'email'=>'string|email|max:255',
      'new_pass'=>'min:4|max:12|nullable',
      'bio'=>'max:200',
    ];
}
```
↑ 
それぞれフォームのヴァリデーションを設定することが出来る。

<br>

# 5. エラーメッセージをつくる
```php
public function messages()
{
    return [
        'required'  =>"入力必須です",
        'name.max'  => '25文字以下で入力して下さい',
        'string'    =>"文字を入力してください",
        'email'     => 'メールアドレスの形式で入力して下さい',
        'email.max' => '255文字以下で入力して下さい',
        'new_pass.min' => '4文字以上で入力して下さい',
        'new_pass.max' => '12文字以下で入力して下さい',
        'bio.max' => '200文字以下で入力して下さい',
    ];
}
```
↑ 
ここでオリジナルのメッセージを作ってみようかね...

<br>

# 6.コントローラー
edit(Request $request)⇒`edit(UserRequest $request)`

```php
public function edit(UserRequest $request){

    try{
        $user = User::find(Auth::user()->id);
        $user -> name = $request -> name;
        $user -> bio = $request -> bio;

        #メールアドレスの入力がある場合
        if($user->email !== $request->email){
            $user->email  = $request->email;
        }

        #新パスワードに入力がある場合。
        if (!empty($request -> new_pass)){
            $user -> password =bcrypt($request -> new_pass);
        }

        $user->save();
    }catch(\Exception $e){
        $e->getMessage();
    }

    return redirect()->route('profile.show');
}

```
↑
こんなにコード載せたけど１行目があれば、充分

<br>

# 7. ビューにエラーメッセージを表示
```php
<input type="text" name="name">
@if($errors->has('name')) <span>{{ $errors->first('name') }}</span> @endif
```

コントローラーで`UserRequest`を設定しておけば、ヴァリデーションに引っかかた時、errorsを利用して、よしなにやってくれる。ありがたい。has()とかfirst()の括弧内はname属性。なんか例はややこしくなっちゃったかな(´・ω・｀)

<br>

# 8. おわりに
仕事帰りの面談後にまとめるにしてはめんどくさかった。

</nuxt-content-wrapper>
