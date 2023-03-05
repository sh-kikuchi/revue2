---
title: Expressのインストール
description: + TypeScript
category: express
createdAt: 2022-09-14
updatedAt: 2023-03-05
sortNumber: 001
path: "/articles/express/001_express_install"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. 各種インストール](#2-各種インストール)
    - [■ expressのインストール(ジェネレータ使用)](#-expressのインストールジェネレータ使用)
    - [■ テンプレートエンジンについて](#-テンプレートエンジンについて)
- [3. APIテストして見よう](#3-apiテストして見よう)
    - [■ index.tsを用意](#-indextsを用意)
    - [■ postman](#-postman)
- [4. おわりに](#4-おわりに)

<br>

# 1. はじめに
しごとがうまくいかない。そんな時は軽い気持ちでプログラミングをやってみようではないか。2022年9月に現場で使っているReactとSpringbootのうち、Reactのスキルだけを奪って、Express.jsと連携させてみる。

<br>

# 2. 各種インストール

### ■ expressのインストール(ジェネレータ使用)

下記のコマンドでExpress.jsをインストールする。`express-generator-typescript`はexpressの雛形のディレクトリ構成を提供してくれる。まあどうせ、普通にインストールした時は0からこつこつやらないとだし、雛形といっても変えることは出来るんだから使っておきましょうよと。
```ts
npm install express-generator-typescript
npx express-generator-typescript "プロジェクト名 (デフォルトはexpress-gen-ts)"
```

【ツリーはこんな感じ】

```
├─spec
│  ├─support
│  ├─tests
│  └─types
│      └─supertest
└─src
│   ├─models
│   ├─pre-start
│   │  └─env
│   ├─public
│   │  ├─scripts
│   │  └─stylesheets
│   ├─repos
│   ├─routes
│   ├─services
│   ├─shared
│   ├─types
│   │  └─express
│   ├─util
│   └─views
│
│─build.ts
│─package-lock.json
│─package.json
│─tsconfig.json
│─tsconfig.prod.json
```

### ■ テンプレートエンジンについて
こんなノリでテンプレートエンジンを用意しないってことある？
> Due to the heavy use of single-page-applications, no view-engine is configured by default.
→ SPAを多用するため、デフォルトでテンプレートエンジンはない。(Viewフォルダにはhtmlファイル)
 [express-generator-typescript](https://www.npmjs.com/package/express-generator-typescript)


<br>

# 3. APIテストして見よう

### ■ index.tsを用意
プロジェクトディレクトリ直下に`index.ts`を作成して下記のようなコードを用意

```ts
import express from 'express'
const app: express.Express = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//CROS対応
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader('Content-Type', 'application/json');
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTION"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
})

//expressのportは3001にセット
app.listen(3001, () => {
  console.log("Start on port 3001.")
})

type GLAY = {
  id: number
  name: string
  email: string
};

const users: GLAY[] = [
  { id: 1, name: "TAKURO", email: "takuro@test.jp" },
  { id: 2, name: "TERU", email: "teru@test.jp" },
  { id: 2, name: "HISASHI", email: "hisashi@test.jp" },
  { id: 3, name: "JIRO", email: "jiro@test.jp" }
]

//一覧取得
app.get('/users', (req: express.Request, res: express.Response) => {
  res.send(JSON.stringify(users))
})

```

<br>

### ■ postman
さっきindex.tsでnode側のポートは3001にセットした。ファイル中に一覧取得のAPIも作った。さあ、テストの時。

```
//一覧取得
app.get('/users', (req: express.Request, res: express.Response) => {
  res.send(JSON.stringify(users))
})
```

postmanでGetメソッドにセットして下記のURLをSendする
`http://localhost:3001/users`

<br>

下記のレスポンスが出てくればOK
```json
[
    {
        "id": 1,
        "name": "TAKURO",
        "email": "takuro@test.jp"
    },
    {
        "id": 2,
        "name": "TERU",
        "email": "teru@test.jp"
    },
    {
        "id": 2,
        "name": "HISASHI",
        "email": "hisashi@test.jp"
    },
    {
        "id": 3,
        "name": "JIRO",
        "email": "jiro@test.jp"
    }
]
```

<br>

# 4. おわりに
`Parsing error: Cannot read file '~~~\tsconfig.json'`にうんざりするわ。ESLINTのエラーに引っかかる。面倒くさいので一旦無視（2022/09/14）。それはそうと、APIのテストが簡単に出来たことで少しばかりの自由を手に入れた。NEXTステップはDBの接続をしてみようかね。。


参考
- [express-generator-typescript](https://www.npmjs.com/package/express-generator-typescript)

</nuxt-content-wrapper>
