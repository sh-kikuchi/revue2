---
title: 認証機能
description: ログイン/ログアウト
category: rails
createdAt: 2023-05-08
updatedAt: 2023-05-08
sortNumber: 006
path: "/articles/rails/006_login"
---

<nuxt-content-wrapper>

# 1.はじめに


<br>

# 2. パスワードのハッシュ化
- パスワードをハッシュ化(bcrypt)：gem
- gemfile: gem bcrypt → bundle install
-  has_secure_passwordというメソッドが使えるようになる。 <br>
　→DBではpassword_digestというカラム名で保存することが決まり。


<br>

# 3. ログイン/ログアウト
### ■ 全表示
```ruby
  def login
    @user = User.find_by(email: params[:email], password_digest: params[:password])
    if @user
      session[:user_id] = @user.id
      flash[:notice] = "logged in !"
      redirect_to("note/index")
    else
      @error_message ="Mail address or password is incorrect."
      @email    params[:email]= params[:email]
      @password = params[:password]
      render("users/login_form")
    end
  end
  def logout
    session[:user_id] = nil
  end
```

<br>

# 4. ログイン状態
### ■ ApplicationController
```ruby
class ApplicationController < ActionController::Base
  before_action :set_current_user
  
  def set_current_user
    @current_user = User.find_by(id: session[:user_id])
  end
  
  # authenticate_userメソッドを定義してください
  def authenticate_user
    if @current?user == nil
      flash[:notice] = "ログインが必要です"
      redirect_to("login")
    end
  end
end

``` 

### ■　個々のコントローラ
```ruby
before_action :authenticate_user, {only: [:index, :show, :edit, :update]}
```


# 6. おわりに
フォームの入力値も`params[:name属性名]`で簡単に取得でき、クエリパラメータの時と値の取り方が変わらない点も分かりやすくて良いなという印象を受けた。CRUDが一通りできればある程度アプリは作れるようになるが、ここではまだ1テーブルしか使っていないので幅を広げていかなければならない。


↓注意　<br>
https://qiita.com/takuo_maeda/items/d237fdb33411a20b9ec4

</nuxt-content-wrapper>