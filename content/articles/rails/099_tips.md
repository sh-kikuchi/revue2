---
title: MVC
description: マイグレーションファイル
category: rails
createdAt: 2023-05-05
updatedAt: 2023-05-05
sortNumber: 099
path: "/articles/rails/099_tips"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. ngrokとは](#2-ngrokとは)
- [3. ngrokのアカウント登録](#3-ngrokのアカウント登録)
- [4. Chocolateyで ngrokをインストール](#4-chocolateyで-ngrokをインストール)
- [5. Configファイルに設定](#5-configファイルに設定)
- [6. 起動してみる](#6-起動してみる)
- [7. おわりに](#7-おわりに)


# 1.はじめに


<br>

# 2. Railsコンソール
- 開始：`rails console` (`rails c`でも可)
- 終了：quit
- DBにデータを入れる  変数 = モデル名.new 変数.save

```ruby
[1] pry(main)> note = Note.new(content: "Test")
=> #<Note:0x0000563ff4a29330 id: nil, content: "Test", created_at: nil, updated_at: nil>
[2] pry(main)> note.save
   (0.1ms)  begin transaction
  SQL (0.5ms)  INSERT INTO "notes" ("content", "created_at", "updated_at") VALUES (?, ?, ?)  [["content", "Test"], ["created_at", "2023-05-03 13:50:47.607004"], ["updated_at", "2023-05-03 13:50:47.607004"]]
   (4.3ms)  commit transaction
=> true
```

# 3. リンク

```ruby
 <%= link_to("MENU", "/") %>
 <%= link_to(note.content, "/notes/#{note.id}") %>
 <%= link_to(note.content, "/notes/#{note.id}"), {method: "note"} %>
```



<br>

# 9. おわりに
- [Windows環境でmysql2を入れるには。](https://qiita.com/takkii/items/f652df5cc30c2ea29aff)

</nuxt-content-wrapper>