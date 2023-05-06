---
title: Herokuでバッチを実行する
description: Heroku Scheduler
category: laravel
createdAt: 2023-04-27
updatedAt: 2023-04-27
sortNumber: 905
path: "/articles/laravel/905_heroku_batch"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. HerokuScheduler](#2-HerokuScheduler)
- [3. おわりに](#3-おわりに)

<br>

# 1. はじめに
Laravelアプリのバッチの実行をherokuでやってみる。`php artisan make:command ●●`でコマンドを作成していることを前提とする。

<br>

# 2. HerokuScheduler
### ■ アドオンを追加する
```
heroku addons:create scheduler
```

<br>

### ■ ダッシュボードを開く
```
heroku addons:open scheduler
```

###　■ Run Commandに設定
- Run Commandの「$」に続けて、`php artisan [Command_name]`
- 日ごとや〇時間ごとなど間隔を決めることができる（UTC）

<br>

# 3. おわりに
cronのようにジョブを定期的に実行できるし、しかもその設定が簡単なので使いやすい。

</nuxt-content-wrapper>
