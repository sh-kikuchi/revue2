---
title: RubyonRailsのインストール
description: Windows版
category: darkpot
createdAt: 2023-03-05
updatedAt: 2023-03-05
sortNumber: 001
path: "/articles/darkpot/001_rudy"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. Rubyのインストール](#2-rubyのインストール)
- [3-1. Ruby on Railsのインストール](#3-1-ruby-on-railsのインストール)
- [3-2. Bundlerを使ったRuby on Railsのインストール](#3-2-bundlerを使ったruby-on-railsのインストール)
- [4. 起動してみる](#4-起動してみる)
- [5. おわりに](#5-おわりに)

<br>

## 1. はじめに
1995年にまつもとゆきひろ氏がオブジェクト指向スクリプト言語であるRubyを開発し、デイヴィッド・ハイネマイヤー・ハンソンによってRailsというフレームワークが作り出された。基本理念はD.R.Y(Don't Repeat Yourself)とC.o.C(Convention over Configuration)ってことでこれを体感するために触ってみようと思う。そして何より、Rubyを触ってからまつもとゆきひろ氏の故郷、島根県に訪れてみたいという個人的な欲求が大きい。

<br>

## 2. Rubyのインストール
- [RubyInstallers](https://rubyinstaller.org/downloads/)を使って、インストーラーをダウンロード。
バージョンに困ったら。。。という案内もあって安心。（2023/02/23）
  ```
  If you don’t know what version to install and you’re getting started with Ruby, we recommend that you use the Ruby+Devkit 3.1.X (x64) installer.
  ```

<br>

- `rubyinstaller-devkit-3.1.3-1-x64.exe`を実行し、Setupを起動してインストール。完了してFinishボタンを押下すると、MSYS2インストール画面が出現する。「1,3」と入力してからEnter。

  ```
  _____       _           _____           _        _ _         ___
  |  __ \     | |         |_   _|         | |      | | |       |__ \
  | |__) |   _| |__  _   _  | |  _ __  ___| |_ __ _| | | ___ _ __ ) |
  |  _  / | | | '_ \| | | | | | | '_ \/ __| __/ _` | | |/ _ \ '__/ /
  | | \ \ |_| | |_) | |_| |_| |_| | | \__ \ || (_| | | |  __/ | / /_
  |_|  \_\__,_|_.__/ \__, |_____|_| |_|___/\__\__,_|_|_|\___|_||____|
                      __/ |           _
                    |___/          _|_ _  __   | | o __  _| _     _
                                    | (_) |    |^| | | |(_|(_)\^/_>

    1 - MSYS2 base installation
    2 - MSYS2 system update (optional)
    3 - MSYS2 and MINGW development toolchain

  Which components shall be installed? If unsure press ENTER [1,3]
  ```

<br>

- `ruby -v`で確認。
  ```
  ruby 3.1.3p185 (2022-11-24 revision 1a6b16756e) [x64-mingw-ucrt]
  ```

<br>

## 3-1. Ruby on Railsのインストール
- Ruby on Railsをインストール
  ```
  gem install rails -v 7.0.3
  ```

<br>

- `rails -v`で確認できればOK
  ```
  Rails 7.0.3
  ```

<br>

## 3-2. Bundlerを使ったRuby on Railsのインストール
- `gem install bundler`
- `bundler -v`で確認できればOK
  ```
  Bundler version 2.4.7
  ```
- `bundle init`でGemfileを生成する。ひらいて見るとこんな感じ
  ```
  # frozen_string_literal: true

  source "https://rubygems.org"

  # gem "rails"
  ```
  →　gem 'rails', '7.0.3.1' を追加する

<br>

- railsをインストール
  ```
  bundle install --path vendor/bundle
  ```
※ `--path vendor/bundle`を付けるとプロジェクトディレクトリはこんな感じ
- .bunble
- vendor
- Gemfile
- Gemfile.lock

<br>

## 4. 起動してみる
- `bundle exec rails server`
- http://127.0.0.1:3000でウェルカムページが出てくればOK
  ```
  bundle exec rails server
  => Booting Puma
  => Rails 7.0.3.1 application starting in development
  => Run `bin/rails server --help` for more startup options
  *** SIGUSR2 not implemented, signal based restart unavailable!
  *** SIGUSR1 not implemented, signal based restart unavailable!
  *** SIGHUP not implemented, signal based logs reopening unavailable!
  Puma starting in single mode...
  * Puma version: 5.6.5 (ruby 3.1.3-p185) ("Birdie's Version")
  *  Min threads: 5
  *  Max threads: 5
  *  Environment: development
  *          PID: 2632
  * Listening on http://[::1]:3000
  * Listening on http://127.0.0.1:3000
  Use Ctrl-C to stop
  Started GET "/" for 127.0.0.1 at 2023-02-22 21:59:26 +0900
    (9.5ms)  SELECT sqlite_version(*)
  Processing by Rails::WelcomeController#index as HTML
    Rendering vendor/bundle/ruby/3.1.0/gems/railties-7.0.3.1/lib/rails/templates/rails/welcome/index.html.erb
    Rendered vendor/bundle/ruby/3.1.0/gems/railties-7.0.3.1/lib/rails/templates/rails/welcome/index.html.erb (Duration: 7.6ms | Allocations: 665)
  Completed 200 OK in 102ms (Views: 34.2ms | ActiveRecord: 0.0ms | Allocations: 5290)


  Started GET "/" for 127.0.0.1 at 2023-02-22 22:12:53 +0900
  Processing by Rails::WelcomeController#index as HTML
    Rendering vendor/bundle/ruby/3.1.0/gems/railties-7.0.3.1/lib/rails/templates/rails/welcome/index.html.erb
    Rendered vendor/bundle/ruby/3.1.0/gems/railties-7.0.3.1/lib/rails/templates/rails/welcome/index.html.erb (Duration: 1.5ms | Allocations: 312)
  Completed 200 OK in 15ms (Views: 5.1ms | Allocations: 1008)
  ```

<br>

## 5. おわりに
インストールしてからはGemfileでパッケージ管理をしていく感じを掴んだ。インストール自体は簡単だが、今回はDB接続のことには触れていないからまたの機会でまとめてみたい。


参考
- [Rubyの開発環境を用意しよう！（Windows用）](https://prog-8.com/docs/ruby-env-win)


</nuxt-content-wrapper>
