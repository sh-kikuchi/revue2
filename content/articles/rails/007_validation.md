---
title: バリデーション
description: 不正データの保存を防ぐ
category: rails
createdAt: 2023-05-30
updatedAt: 2023-05-30
sortNumber: 007
path: "/articles/rails/007_validation"
---

<nuxt-content-wrapper>

# 1.はじめに
不正なデータを保存ないしは更新しないようにするのにバリデーションという形でデータチェックを行う。このバリデーションに引っかかった場合にはデータベースには保存されない。

<br>

# 2. モデル内でヴァリデーションの制約を記述する
- presenceは存在チェック
- uniquenessは一意チェック

```ruby
class User < ApplicationRecord    
    validates :name,{presence: true}
    validates :email,{presence: true, uniqueness: true}
    validates :password_digest,{presence: true}

end
```

<br>

他にも
- length: { minimum: 1, maximum: 10 }
- post_code: true
- presence: { if: '!mail_magazine.blank?' }
- numericality: { only_integer: true}

<br>

# 3. コントローラ
`if @user.save~`で成功した時と失敗した時の条件分岐が書かれているが、その前にモデルのバリデーションチェックがなされる。データの保存に成功した時と失敗した時の条件分岐で処理を変えることもできる。

```ruby
  def create
    @user                  = User.new
    @user.name             = params[:name]
    @user.email            = params[:email]
    @user.password  = params[:password]
    if @user.save
      session[:user_id] = @user.id
      flash[:notice] = USER["flash_message"]["create"]
      redirect_to("/users/#{@user.id}")
    else
      @title = USER["register"]["title"]
      @form  = USER["register"]["form"]
      render("users/new")
    end
  end
```

<br>

# 4　エラーメッセージを画面に表示
バリデーションエラーになった時は` @user.errors.full_messages`にエラーメッセージが格納される

```ruby
  <% if @user.errors.full_messages.present? %>
    <div class="flash mt-2 mb-2">
      <article class="message is-danger">
        <div class="message-body">
          <ul>
              <% @user.errors.full_messages.each do |message| %>
              <li><%= message %></li>
              <% end %>
          </ul>
        </div>
      </article>
    </div>
  <% end %>
```


# 6. おわりに


</nuxt-content-wrapper>