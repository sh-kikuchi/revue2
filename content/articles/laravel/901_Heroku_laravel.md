---
title: Herokuのデプロイ方法
description: Laravel篇
category: laravel
createdAt: 2021-10-28
updatedAt: 2021-10-28
sortNumber: 901
path: "/articles/laravel/901_Heroku_laravel"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. Heroku CLIのインストール](#2-heroku-cliのインストール)
- [3. herokuをログイン](#3-herokuをログイン)
- [4. Procfileを作成する](#4-procfileを作成する)
- [5.レポジトリを作成する](#5レポジトリを作成する)
- [6. アプリの情報を設定する](#6-アプリの情報を設定する)
- [7. herokuサーバーにpush](#7-herokuサーバーにpush)
- [8. おわりに](#8-おわりに)

<br>

# 1. はじめに
HerokuにLaravelのアプリをインストールしてみる。まずはアプリをデプロイするところから順序立ててやってみる。

<br>

# 2. Heroku CLIのインストール
- 【事前準備】gitを使えるようにしておくこと
- herokuのインストール
  https://devcenter.heroku.com/ja/articles/heroku-cli#download-and-install


<br>

# 3. herokuをログイン
- コマンドをたたく場所はプロジェクトディレクトリ
> heroku login -i
```
$ heroku login -i
heroku: Enter your login credentials
Email :自分のメールアドレス
Password: **************
Logged in as ~~　←loggedでログイン成功！
```

<br>

# 4. Procfileを作成する
- HerokuでWebアプリを動かす指示書のようなもの
```
  $ touch Procfile
  $ echo web: vendor/bin/heroku-php-apache2 public/ > Procfile
```

<br>

# 5.レポジトリを作成する
- コマンドをたたく場所はプロジェクトディレクトリ
> $ heroku create 任意のアプリ名

```
$ heroku create toolbox-kanban
Creating ⬢ toolbox-kanban... done
https://toolbox-kanban.herokuapp.com/ │ https://git.heroku.com/toolbox-kanban.git

```
<div style="page-break-before:always"></div><br>


# 6. アプリの情報を設定する
```
$ heroku config:set APP_KEY=$(php artisan key:generate --show)
```
上記のコマンドが効かない場合は予め、php artisan key:generate --showでアプリキーを取得して、heroku config:set APP_KEY=<アプリキー>のコマンドを打つこと。

<div style="page-break-before:always"></div><br>

# 7. herokuサーバーにpush

①　既にアプリが出来上がっている場合
（Gitも使っている状態）
```
$ heroku git:remote -a Herokuアプリの名前
```
```
$ git push heroku master
```
【注意】　開発ブランチ（develop）をherokuのmasterブランチにpushする場合
```
$ git push heroku develop:master
```

②　これからアプリを作る場合(リポジトリ新規作成の場合)
```
$ git init 
```
```
$ heroku git:remote -a Herokuアプリの名前 
```
```
$ git add .
```
```
$ git commit -m "the first commit"
```
```
$ git push heroku master
```

<br>

# 8. おわりに
procfileの用意とアプリキーの設定は漏れているとデプロイしても、上手く表示できないっぽい。気を付けないと。

</nuxt-content-wrapper>
