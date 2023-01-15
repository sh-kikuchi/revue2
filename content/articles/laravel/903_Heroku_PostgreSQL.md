---
title: HerokuのDB設定（PostgreSQL）
description: Herokuのマイグレーション
category: laravel
createdAt: 2021-10-28
updatedAt: 2021-10-28
sortNumber: 903
path: "/articles/laravel/903_heroku_postgresql"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. herokuのアドオンにPostgreSQLを作成する](#2-herokuのアドオンにpostgresqlを作成する)
- [3. 環境変数の取得](#3-環境変数の取得)
- [4. DBのマイグレーション](#4-dbのマイグレーション)
- [5. おわりに](#5-おわりに)

<br>

# 1. はじめに
LaravelをHerokuにデプロイしてからのデータベース作成をしよう。ここではPostgreSQLの設定をheroku-postgresqlというHerokuのアドオンを用いて行う。

<br>

# 2. herokuのアドオンにPostgreSQLを作成する
```
$ heroku addons:create heroku-postgresql:hobby-dev
```

<br>

# 3. 環境変数の取得
```
$ heroku config:get DATABASE_URL
```
下記のURLが出現
> postgres://<ユーザ名>:<パスワード>@<ホスト>:5432/<DB名>
```
$ heroku config:set DB_CONNECTION=pgsql
$ heroku config:set DB_HOST=<ホスト>
$ heroku config:set DB_DATABASE=<DB名>
$ heroku config:set DB_USERNAME=<ユーザ名>
$ heroku config:set DB_PASSWORD=<パスワード>
```
※configを設定する際、イコールより先はクオーテーションマークは要らない。そのままコピぺ。

<br>

# 4. DBのマイグレーション
※準備：composer.jsonに加筆
> Laravelの.env はgit管理外なので、Heroku用の.env.heroku を用意。デプロイの際にHerokuサーバー内で.env.heroku を.env にコピーするようにする。
```
    "scripts": {
        (前略)
        "compile": [
            "@php -r \"file_exists('.env') ││ copy('.env.example', '.env');\""
        ]
    },
```
マイグレーション
```
$ heroku run php artisan migrate
```

マイグレーションをやり直したい場合
```
# (マイグレーションをやり直したい場合)
> heroku run php artisan migrate:refresh --seed
```

<br>

# 5. おわりに
MySqlよりはPostgreSQLの方が簡単な印象。

</nuxt-content-wrapper>
