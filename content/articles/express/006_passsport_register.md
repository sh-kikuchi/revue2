---
title: 認証機能の実装Ⅲ
description: ユーザー登録機能
category: express
createdAt: 2023-03-05
updatedAt: 2023-03-05
sortNumber: 006
path: "/articles/express/006_passport_register"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. ユーザーの新規作成](#2-ユーザーの新規作成)
- [3. おわりに](#3-おわりに)

<br>


# 1. はじめに
ユーザーの新規登録をする時のサーバーサイド側の処理を書いてみた。パスワードをどのようにしてユーザーテーブルに格納するかをポイントになりそう。
フロント側のフォームには下記の項目があるものとする。
- ユーザー名（username）
- Eメール(Email)
- パスワード(password)
- パスワード確認用(passwordConfirm)

<br>

# 2. ユーザーの新規作成
- バリデーションはEmailの形式チェックとパスワードチェック。
- ユーザーテーブルにEmailが存在しない時のみ、インサートする。
- パスワードは`bcrypt`を使って、ハッシュ化して格納する。

```js
import { Request, Response } from 'express';
const { pool } = require("../../../database/pool");
const bcrypt = require('bcrypt');
const TAG = "[api/auth/register.ts]"

async function userRegister(req: Request, res: Response) {
  console.log(TAG + ' is called');
  let { username, email, password, passwordConfirm } = req.body;
  let errors: any = [];
  //ヴァリデーション
  if (!username || !email || !password || !passwordConfirm) {
    errors.push({ message: "全ての項目を入力してください" });
  }
  const regexp = /^[a-zA-Z0-9_+-]+(\.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
  if (!regexp.test(email)) {
    errors.push({ message: "メールアドレスの形式が正しくありません" });
  }
  if (password.length < 6) {
    errors.push({ message: "パスワードは6字以上です" });
  }
  if (password !== passwordConfirm) {
    errors.push({ message: "パスワードとパスワード（確認用）が一致していません" });
  }
  //登録処理
  if (errors.length > 0) {
    return res.status(400).send(errors[0]); //エラーの一番上のみ表示
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    //既存データの判定
    pool.query(
      `SELECT * FROM users
        WHERE email = $1`,
      [email],
      (err: string, results: any) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ message: "DB接続に失敗しました" });
        }
        if (results.rows.length > 0) {
          return res.status(400).send({ message: "メールアドレスが登録済みです" });
        } else {
          pool.query(
            `INSERT INTO users (name, email, password)
                VALUES ($1, $2, $3)
                RETURNING id, password`,
            [username, email, hashedPassword],
            (err: string, results: any) => {
              if (err) {
                return res.status(500).send({ message: "DB接続に失敗しました" });
              }
              return res.status(200).send({ message: "ユーザー登録に成功しました" });
            }
          );
        }
      }
    );
  }
}
module.exports = userRegister;
```

<br>

# 3. おわりに
バリデーションしてエラーがなければ、既存のデータチェックして、それらが問題ない時にやっとユーザー登録処理が走るという仕組みにしてみた。bcryptはパスワードをハッシュ化するのにとてもお便利で助かった。

</nuxt-content-wrapper>
