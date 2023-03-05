---
title: ファイルアップロード
description: muterの利用
category: express
createdAt: 2023-01-29
updatedAt: 2023-03-05
sortNumber: 009
path: "/articles/react_express/009_muter"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. expressでインストール](#2-expressでインストール)
- [3. express.jsのプロジェクトディレクトリのindex.ts](#3-expressjsのプロジェクトディレクトリのindexts)
- [4. おわりに](#4-おわりに)

<br>

# 1. はじめに
muterを使って、Express.jsのファイルアップロードのやり方を学ぶ。

<br>

# 2. expressでインストール
```
npm install multer
```

<br>

# 3. express.jsのプロジェクトディレクトリのindex.ts
muterをインストールしたのち、下記の`upload`メソッドにあるようにmuterでストレージをしたり、ルーティングをセットする（post)ことで、簡単にアップロードすることが出来る。それと、`storage`メソッドにある`multer.diskStorage`でファイル名を設定したり、アップロードしたいパスを指定したり出来る。

```js
import express from 'express'
const app: express.Express = express()
import multer from "multer";


//file
const storage = multer.diskStorage({
  destination(req, file, callback) {
    console.log(__dirname);
    callback(null, path.resolve(__dirname, "【パス名】"));
  },
  filename(req, file, callback) {
    const uniqueSuffix = Math.random().toString(26).substring(4, 10);
    callback(null, `${Date.now()}-${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage
}).any()

app.post('/image', (req: any, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      //アップロード失敗した場合
      res.json({
        status: "error",
        error: "fail to uplord image"
      })
    } else {
      //アップロード成功した場合
      res.json({
        status: "success",
        filename: req.files[0].filename,
        message: "ファイルアップロードに成功しました"
      })
    }
  })
});

//publicフォルダの設定
app.use("/static", express.static(path.join(__dirname, 'public')));

//アプリ起動
app.listen(3001, () => {
  console.log("Start on port 3001.")
})

module.exports = upload;

```

<br>

# 4. おわりに
muter理解すれば簡単だなと思った。

<br>

参考(最終閲覧日 2023/01/29)：
- [multerを使ってNode.js+Expressでファイルアップロードを実装する](https://moewe-net.com/nodejs/multer)
- [Node.js・Expressでmulterを使って、ファイルをアップロードする方法](https://qiita.com/tronicboy/items/e71c5f22a5a7da0faa36)

<br>

</nuxt-content-wrapper>
