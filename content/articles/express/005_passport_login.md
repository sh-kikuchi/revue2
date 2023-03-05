---
title: 認証機能の実装Ⅱ
description: ログイン機能
category: express
createdAt: 2023-03-05
updatedAt: 2023-03-05
sortNumber: 005
path: "/articles/express/005_passport_login"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. 全体の流れ](#2-全体の流れ)
- [3. passport-jwtの設定](#3-passport-jwtの設定)
- [4. ログイン処理の定義](#4-ログイン処理の定義)
- [5. 認証実装](#5-認証実装)
- [おわりに](#おわりに)

<br>


# 1. はじめに
MVCのフレームワークではセッションベースの認証方式が一般的（セッションはサーバーサイドのDBに保存して管理する）。だが、SPA(Single Page Application)ではトークンを用いた認証方式が用いられる。トークンはクライアントサイドに保存される。そのトークンとしてよく用いられるのがJWTというものである。

```
プロジェクトディレクトリ
└─src
│   ├─pages
│   │  └─AuthView.tsx
|
```
<br>

# 2. 全体の流れ

<details><summary>サンプルコード</summary>

```js
import { Request, Response, NextFunction } from 'express';
const LocalStrategy = require("passport-local").Strategy;
const jwt = require('jsonwebtoken');
const { pool } = require("../../../database/pool");
const bcrypt = require('bcrypt');
const TAG = "[api/auth/login.ts]"

function initialize(passport: any, req: Request, res: Response, next: NextFunction) {
  console.log(TAG + ' is initialized');
  const email = req.body.email;
  const password = req.body.password;

  // passport-jwtの設定
  const jwtSecret = process.env.JWT_SECRET;
  const jwtOptions = {
    algorithm: 'HS256',
    expiresIn: '3600s',
  };
  //ヴァリデーション
  let errors: any = [];
  if (!email || !password) {
    errors.push({ message: "全ての項目を入力してください" });
  }
  const regexp = /^[a-zA-Z0-9_+-]+(\.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
  if (!regexp.test(email)) {
    errors.push({ message: "メールアドレスの形式が正しくありません" });
  }
  if (password.length < 6) {
    errors.push({ message: "パスワードは6字以上です" });
  }
  //ユーザー認証
  const authenticateUser = () => {
    pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
      (err: string, results: any) => {
        if (err) {
          return res.status(500).send({ token: null, message: 'DB接続エラーです' });
        }
        if (results.rows.length > 0) {
          const user = results.rows[0];
          bcrypt.compare(password, user.password, (err: string, isMatch: boolean) => {
            if (err) {
              console.log(err);
              return res.status(400).send({ token: null, message: 'Login failed' });
            }
            //パスワード照会
            if (isMatch) {
              console.log('password is correct');
              const token = jwt.sign(user, jwtSecret, jwtOptions);
              return res.status(200).send({ token: token, message: 'ログインに成功しました' });
            } else {
              console.log('password is incorrect');
              return res.status(400).send({ token: null, message: 'パスワードが間違っています' });
            }
          });
        } else {
          //ユーザが見つけられない場合
          return res.status(400).send({ token: null, message: '該当ユーザーが見つかりませんでした' });
        }
      }
    );
  };
  //バリデーションエラーがない場合に実行
  if (errors.length > 0) {
    return res.status(400).send(errors[0]); //エラーの一番上のみ表示
  } else {
    authenticateUser();
  }
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      authenticateUser
    )
  );
}
module.exports = initialize;
```

</details>

<br>

# 3. passport-jwtの設定
- JWTの署名のために用いるアルゴリズムがHS256(HMAC using SHA-256 hashと呼ばれるもの。
- JWTにトークン有効期間を設けることが可能（expiresIn））

```js
  const jwtSecret = process.env.JWT_SECRET;
  const jwtOptions = {
    algorithm: 'HS256',
    expiresIn: '3600s',
  };
```

# 4. ログイン処理の定義
- passport-local の `Strategy`を活用
- Strategy のコンストラクタに以下の設定を行う。
  - usernameField: ユーザー名のフィールド名(デフォルトはusername)
  - passwordField: パスワードのフィールド名(デフォルトはpassword)

```js
 passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      authenticateUser
    )
  );
```

<br>

# 5. 認証実装
- バリデーションでエラーがなかった場合に`authenticateUser`メソッドを動かす。
- 最初にユーザーテーブルに該当ユーザーがいるかどうかを見る。
- 該当ユーザーいる→DBに登録されているユーザーのパスワードと画面で入力されたパスワードが一致しているかを見る。
  → ` bcrypt.compare`
- パスワードが正しい場合、`jwt.sign(user, jwtSecret, jwtOptions);`でトークンを生成。

```js
  //ユーザー認証
  const authenticateUser = () => {
    pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
      (err: string, results: any) => {
        if (err) {
          return res.status(500).send({ token: null, message: 'DB接続エラーです' });
        }
        if (results.rows.length > 0) {
          const user = results.rows[0];
          bcrypt.compare(password, user.password, (err: string, isMatch: boolean) => {
            if (err) {
              return res.status(400).send({ token: null, message: 'Login failed' });
            }
            //パスワード照会
            if (isMatch) {
              const token = jwt.sign(user, jwtSecret, jwtOptions);
              return res.status(200).send({ token: token, message: 'ログインに成功しました' });
            } else {
              return res.status(400).send({ token: null, message: 'パスワードが間違っています' });
            }
          });
        } else {
          //ユーザが見つけられない場合
          return res.status(400).send({ token: null, message: '該当ユーザーが見つかりませんでした' });
        }
      }
    );
  };
  //バリデーションエラーがない場合に実行
  if (errors.length > 0) {
    return res.status(400).send(errors[0]); //エラーの一番上のみ表示
  } else {
    authenticateUser();
  }
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      authenticateUser
    )
  );
```


# おわりに

参考
- [[Node.js] Express で JWT 認証する方法](https://mseeeen.msen.jp/passport-jwt-authentication-on-express/)
- [Express.js(Node.js)で認証(ハッシュ化/JWT)](https://www.memory-lovers.blog/entry/2021/11/19/033401)
- [【Express + JWT】ExpressでJWTを使った認証機能を作る](https://www.dailyupblog.com/backend_development/1117/#chapter-7)

</nuxt-content-wrapper>
