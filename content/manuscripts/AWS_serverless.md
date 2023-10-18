---
title: Firebase
description: key-value型データベース
category: flutter
createdAt: 2021-09-09
updatedAt: 2021-09-09
sortNumber: 011
path: "/articles/flutter/011_googlefont"
---

<nuxt-content-wrapper>


- [1. はじめに](#1-はじめに)
- [2. Cloud Firestoreの準備](#2-cloud-firestoreの準備)
    - [■ NoSQLドキュメント指向データベース](#-nosqlドキュメント指向データベース)
    - [■ 設定](#-設定)
- [3. main.dart](#3-maindart)
- [4. todo.dart](#4-tododart)
- [5. CRUD](#5-crud)
    - [■ READ](#-read)
    - [■ CREATE](#-create)
    - [■  UPDATE](#--update)
    - [■ DELETE](#-delete)
- [8. おわりに](#8-おわりに)
- 
<br>

# 1. はじめに


# 2. DynamoDB テーブルを作成
- [DynamoDB コンソール](https://console.aws.amazon.com/dynamodb/)
- テーブル作成
- テーブル名を入力
- パーティションキーは「id」（データ型は数値）とする

<br>

# 3. Lambda 関数を作成する
- [Lambda コンソール](https://console.aws.amazon.com/dynamodb/)
- 関数の作成
- 関数名を入力
- アクセス権限の編集
  - AWSポリシーテンプレートから新しいロールを作成
  - ロール名をにゅるよく
  - ポリシーテンプレート - オプション:「シンプルなマイクロサービスのアクセス権限 DynamoDB」
- index.mjsにコードを記述

<br>

# 4. API Gateway 
### ■　HTTP API を作成する
- [API Gateway コンソール](https://console.aws.amazon.com/apigateway)
- [API を作成] を選択
- [HTTP API] で [構築] を選択
- API 名を入力
- 「次へ」を何度か押し進めて、「作成」

### ■ ルートを作成する
- [API Gateway コンソール](https://console.aws.amazon.com/apigateway)
- 「ルート」 を選択し、「作成」
  - GET /items/{id}
  - GET /items
  - PUT /items
  - DELETE /items/{id}

### ■ 統合
- 「統合を管理」タブの「作成」ボタンを押下
- 統合ターゲットの統合タイプでLambdaを選択
- 「統合ルートにアタッチする」ですべてのルートで下記のことを行う。
  - 「既存の統合を選択する」で作成した関数名を選択
  - 統合をアタッチする


# 8. おわりに

参考(最終閲覧日:2023/09/14)
- [チュートリアル: Lambda と DynamoDB を使用した CRUD API の構築](https://docs.aws.amazon.com/ja_jp/apigateway/latest/developerguide/http-api-dynamo-db.html#http-api-dynamo-db-cleanup)




</nuxt-content-wrapper>
