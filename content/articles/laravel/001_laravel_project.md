---
title: インストールとログイン
description: プロジェクトの準備をしよう
category: laravel
createdAt: 2021-11-18
updatedAt: 2021-11-18
sortNumber: 001
path: "/articles/laravel/001_laravel_project"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. インストール](#2-インストール)
- [3. ログイン](#3-ログイン)
- [4. おわりに](#4-おわりに)

<br>


# 1. はじめに
Laravelで自分用メモアプリを作る。これは自分で作ったグループチャットアプリからリカットして編集してみた。そのアプリの「ひとりごと」コーナーは本当に愚痴の掃きだめにしかならないけど、モノは言いよう。同じ技術でもメモアプリと名を冠せば、有用性がぐーんとアップする（気がする）

[smalltalk](http://toolbox-smalltalk.herokuapp.com/login)


<br>

# 2. インストール
[レファレンスをこちら](https://readouble.com/laravel/8.x/ja/installation.html)
> Laravel8をcomposerを使ってインストールしてみましょう。<br>
> 【準備】XAMMPのhtdocsに「mymemo」というフォルダを作成しよう。

- XAMPP>htdocs>mymemoで下記コマンドを打つ
  ```
  composer create-project laravel/laravel プロジェクト名
  ```

  ※バージョン指定する場合
  ```
  composer create-project --prefer-dist laravel/laravel smalltalk "6.*"
  ```

- プロジェクトディレクトリの中でローカル開発サーバを起動
  ```
  cd mymemo
  php artisan serve
  ```

<br>

# 3. ログイン
[レファレンスをこちら](https://readouble.com/laravel/8.x/ja/installation.html)
> Laravel8をcomposerを使ってインストールしてみましょう。<br>
> 【準備】XAMMPのhtdocsに「mymemo」というフォルダを作成しよう。

- laravel/ui
  ```
  <!-- Laravel6.xの場合 -->
  composer require laravel/ui:^1.0 --dev

  <!-- laravel7の場合 -->
  composer require laravel/ui:^2.4

  <!-- laravel8の場合 -->
  composer require laravel/ui
  ```
※今回はLaravel8の場合でinstall（2021/11/18）<br>
　バージョン：`Using version ^3.3 for laravel/ui`
<br>
　⇒マイグレーション、モデル、ファクトリーのファイルが作られる。

- ログイン機能実装
  ```
  php artisan ui bootstrap --auth
  ```

- プロジェクトディレクトリの中でローカル開発サーバを起動
  ```
  npm install
  npm run dev
  ```

- .envにAPP_KEYが設定されていなかった場合。
  ```
  php artisan key:generate
  ```
  すると...
  ```
  APP_KEY=base64:hl3dMKQcGdRmrzUKz5kN44LWZWHs6Bc/2UfD1qJgXdo=
  ```


- マイグレーションしてusersテーブルを使えるようにしよう

  ■ XAMPPでデータベース[mymemo]を作っておく。
  > .envファイルをつくる。
    ```
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=mymemo 
    DB_USERNAME=root
    DB_PASSWORD=
    ```

- テーブルを作成する。

	```
  > php artisan migrate
    Migration table created successfully.
    Migrating: 2014_10_12_000000_create_users_table
    Migrated:  2014_10_12_000000_create_users_table (48.39ms)
    Migrating: 2014_10_12_100000_create_password_resets_table
    Migrated:  2014_10_12_100000_create_password_resets_table (41.44ms)
    Migrating: 2019_08_19_000000_create_failed_jobs_table
    Migrated:  2019_08_19_000000_create_failed_jobs_table (44.68ms)
    Migrating: 2019_12_14_000001_create_personal_access_tokens_table
    Migrated:  2019_12_14_000001_create_personal_access_tokens_table (50.61ms)
  ```

<br>

# 4. おわりに
これでユーザー情報を格納するテーブルが用意でき、ログイン画面が実装できタ(´▽｀)

</nuxt-content-wrapper>
