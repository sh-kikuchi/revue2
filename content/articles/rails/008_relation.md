---
title: リレーション
description: 「1対多」
category: rails
createdAt: 2023-05-30
updatedAt: 2023-05-30
sortNumber: 008
path: "/articles/rails/008_relation"
---

<nuxt-content-wrapper>

# 1.はじめに
1人のユーザーは多くのノート（メモ）を書くことができるというケースを想定する。その場合、ユーザーとノートの関係は「1対多」となる。ここでそれぞれのモデルにリレーションを記述してみる。　　

<br>

# 2. モデルでリレーションを設定する
selfはモデル自身なので、Userモデルでself.idとなれば、usersテーブルのidを指す。下記は特定のユーザーに紐づくnotesのデータを取得していることになる。
```ruby
class User < ApplicationRecord    
  def notes
      return Note.where(user_id: self.id)
  end
end
```

<br>

ユーザーとノートは「1対多」の関係性なので、Noteモデルが持つユーザーの外部キーを使ってユーザーを特定できる。
```ruby
class Note < ApplicationRecord
  def user
    return User.find_by(id: self.user_id)
  end
end
```

<br>

# 3. コントローラでの呼び出し
下記はユーザーのインスタンスを作ってのち、モデルで定義したリレーション`notes`を呼び出している例である。

```ruby
  def index
    user = User.find_by(id: @current_user.id)
    @notes = user.notes
  end
```

<br>

# 4. おわりに
「1対多」の例を挙げたが、「1対1」も同じように出来よう。「多対多」の時は別途中間テーブルが必要かもしれぬ故、少し手間がかかるかもしれない。そこはこれから勉強しておこう。

</nuxt-content-wrapper>