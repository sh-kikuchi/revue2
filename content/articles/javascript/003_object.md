---
title: オブジェクトのあんちょこ
description: オブジェクトの使い方をマスターしよう
category: JavaScript
createdAt: 2022-01-14
updatedAt: 2022-08-21
sortNumber: 3
path: "/articles/javascript/003_object"
---

<nuxt-content-wrapper>

<!-- code_chunk_output -->
- [1. はじめに](#1-はじめに)
- [2. オブジェクト](#2-オブジェクト)
- [3.おわりに](#3おわりに)

<br>

# 1. はじめに
オブジェクトの基礎的な使い方をすぐ復習出来るようにと思って。もうこれ以上の言葉はない。

<br>

# 2. オブジェクト
```js
//オブジェクトのキホン
let user = {
  name: 'しゅう',
  age: 27,
  address: '東京都北区赤羽',
  skill: ['vue.js', 'Laravel', 'Flutter'],
  getName: function () {
    return this.name;
  }
}
console.log(user);
console.log(user.name);
console.log(user['name']);
console.log(user.getName());

//プロパティの更新
user.name = 'shu'
console.log(user.name);

//プロパティの追加
user.hometown = 'Kanagawa';
console.log(user);

//プロパティの削除
delete user.address;
console.log(user);

//プロパティの存在判定
console.log(user.hasOwnProperty('skill'));

//ループ処理を使ってプロパティ名を出す
for (key in user) {
  console.log(user[key]);
}

//キー取得
let keyArray = Object.keys(user);
console.log(keyArray);

//値取得(forEach)
let keyArray2 = Object.keys(user);
keyArray2.forEach(function (element) {
  console.log(user[element]);
});

//値取得（value）
let valueArray = Object.values(user);
console.log(valueArray);

//キーと値の一覧取得(連想配列)
let propertyArray = Object.entries(user);
console.log(propertyArray);
//forEachで一行ずつ取り出す
propertyArray.forEach(function (element) {
  console.log(element);
});

```

<br>

# 3.おわりに
もう少しコンテンツを増やせる気もする。mapやfilterとかのメソッドもあることだし。充実してくれば、そんなに悪くない記事になってくれる予感。

</nuxt-content-wrapper>
