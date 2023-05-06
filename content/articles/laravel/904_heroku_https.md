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
- [2. TrustProxies](#2-trustproxies)
- [3. おわりに](#3-おわりに)

<br>

# 1. はじめに
LaravelをHerokuにデプロイしてからのデータベース作成をしよう。ここではPostgreSQLの設定をheroku-postgresqlというHerokuのアドオンを用いて行う。

<br>

# 2. TrustProxies
```
~app\Http\Middleware\TrustProxies.php
```

<br>

```php
<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Http\Middleware\TrustProxies as Middleware;

class TrustProxies extends Middleware
{
    /**
     * The trusted proxies for this application.
     *
     * @var array
     */
    protected $proxies = '*';

}

```


<br>

# 3. おわりに
参考
- [HerokuにデプロイしたLaravelアプリのアセットのURLをhttpsにする手順](https://blog.hrendoh.com/laravel-on-heroku-loading-blade-assets-with-https/)

</nuxt-content-wrapper>
