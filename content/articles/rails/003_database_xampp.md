---
title: MySQLと連携
description: Windows×XAMPP
category: rails
createdAt: 2023-05-04
updatedAt: 2023-05-04
sortNumber: 003
path: "/articles/rails/003_database_xampp"
---

<nuxt-content-wrapper>

# 1.はじめに
「React触ったことないよ」って言っとるのに、スクラム開発の現場にアサインされてしまった。そんなヤバい状況で今こうして勉学に励もうとしている。残業続きの中、やっととれた時間なので、ゆるくやっていく。

<br>

# 2. mysql2を入れる。
### ■ mysql-connectorのインストール
### ■ gemコマンド(ユーザー名は任意)
  ```ruby
  gem install mysql2 --platform=ruby -- '--with-mysql-lib="C:\Users\ユーザ名\mysql-connector-c-6.1.11-win32\lib" --with-mysql-include="C:\Users\nbcc9\mysql-connector-c-6.1.11-win32\include" --with-mysql-dir="C:\Users\ユーザ名\mysql-connector-c-6.1.11-win32"'
  ```

<br>

# 3. 環境の切り替え
■ 現状を確認したい時はRailsコンソールで確かめる
```
rails c
Loading development environment (Rails 7.0.4.3)
irb(main):001:0> Rails.env
=> "development"
```

<br>

■ 切り替えたい時
※Railsコンソールにいる時は抜けて、プロジェクトディレクトリでコマンドを打つ。
```ruby
export RAILS_ENV=test
```



<br>

# 4. おわりに
- [Windows環境でmysql2を入れるには。](https://qiita.com/takkii/items/f652df5cc30c2ea29aff)

</nuxt-content-wrapper>