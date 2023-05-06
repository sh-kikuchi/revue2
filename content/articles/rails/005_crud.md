---
title: CRUD
description: 追加・表示・更新・削除
category: rails
createdAt: 2023-05-05
updatedAt: 2023-05-05
sortNumber: 005
path: "/articles/rails/005_crud"
---

<nuxt-content-wrapper>

# 1.はじめに
ここではMVCのC（コントローラ）に焦点をあてて、CRUD個々の記述の仕方についてまとめておきたい。言うなれば、カンペ作成。

<br>

# 2. Create
- name属性の値の受け取り方： params[:content] (getパラメータと同じ）
```ruby
  def create
    @note = Note.new
    @note.title   = params[:title]
    @note.date    = params[:date]
    @note.content = params[:content]
    @note.save
    redirect_to('/')
  end
```

<br>

# 3. Read
### ■ 全表示
```ruby
  @note = Note.all
```

<br>

### ■ 特定レコード表示
```ruby
  @note = Note.find_by(id: params[:id])
```

<br>

### ■ 並べ替え
```ruby
  @notes = Note.all.order(created_at: :desc)
```


<br>

# 4. Update
- name属性の値の受け取り方： params[:content] (getパラメータと同じ）
```ruby
  def update
    @note         = Note.find_by(id: params[:id])
    @note.title   = params[:title]
    @note.date    = params[:date]
    @note.content = params[:content]
    @note.save
    redirect_to('/')
  end
```

<br>

# 5. Delete

```ruby
  def destroy
    @note = Note.find_by(id: params[:id])
    @note.destroy
    redirect_to('/')
  end
```


<br>

# 6. おわりに
フォームの入力値も`params[:name属性名]`で簡単に取得でき、クエリパラメータの時と値の取り方が変わらない点も分かりやすくて良いなという印象を受けた。CRUDが一通りできればある程度アプリは作れるようになるが、ここではまだ1テーブルしか使っていないので幅を広げていかなければならない。


↓注意　<br>
https://qiita.com/takuo_maeda/items/d237fdb33411a20b9ec4

</nuxt-content-wrapper>