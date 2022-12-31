---
title: 非同期処理
description: 処理タイミングを理解しよう
category: JavaScript
createdAt: 2021-01-30
updatedAt: 2022-08-21
sortNumber: 99
path: "/articles/javascript/099_asynchronous"
---

<nuxt-content-wrapper>

<!-- code_chunk_output -->
- [1. はじめに](#1-はじめに)
- [2. setTimeout](#2-settimeout)
- [3. Promiseを使った非同期処理](#3-promiseを使った非同期処理)
- [4. Promiseの直列処理](#4-promiseの直列処理)
- [5. asyncとawait](#5-asyncとawait)
- [6. Promise(並列処理)](#6-promise並列処理)
- [7. おわりに](#7-おわりに)

<br>

# 1. はじめに
同期処理は上から順に一つずつ処理が動く。その間に重い処理があるとそれだけ時間がかかってしまう。それに対して非同期処理はレスポンスが返るまでに別の処理も進めてレスポンスを受け取り次第、呼び出し元に値を返すことをする。今回は非同期処理の代表例としてsetTimeout関数・Promise・async/awaitの使い方を簡単にまとめてみる。

# 2. setTimeout
`setTimeout`関数を使うと任意のタイミングで処理を動かすことが出来る。下記のsetTimeout関数の例では、起動してから5秒後に処理が動く。

```js
console.log('ぎりぎりセーフ', new Date());
setTimeout(() => {
  console.log('いや、5秒遅刻だ', new Date);
}, 5000);
```
↓（結果）
```
ぎりぎりセーフ Sun Jan 30 2022 00: 49: 03 GMT + 0900(日本標準時)
いや、5秒遅刻だ Sun Jan 30 2022 00: 49: 08 GMT + 0900(日本標準時)
```

<br>

# 3. Promiseを使った非同期処理
Promiseオブジェクトも非同期処理を扱う機能。この処理が成功した時には`resolve`、失敗した時には`reject`で値をセットする。`then`メソッドはPromise関数が成功した時に動く処理を指す。それに対して失敗した時に動く処理が`catch`メソッド。

```js
let result = true;
const test = new Promise((resolve, reject) => {
  if (result === true) {
    resolve("Succeed");
  } else {
    reject("Failed");
  }
})
  //処理成功時
  .then((value) => {
    console.log(value);
  })
  .catch((value) => {
    console.log(value);
  }); //←メソッドチェーン：一番最後に;をつける
```

<br>

# 4. Promiseの直列処理
処理が終わった後に、次の処理を繋げることも出来る。
```js
Promise.resolve()
  .then(() =>
    new Promise((resolve) => {
      resolve(console.log("1回目の処理(起動時)"));
    })
  )
  .then(
    () =>
      new Promise((resolve) => {
        setTimeout(() => {
          console.log("2回目の処理(5秒経過)");
          resolve();
        }, 5000);
      })
  );
```
<br>

# 5. asyncとawait
非同期処理は`async`と`await`を使って書くことも出来る。Promiseを利用した構文よりも、簡潔に書けるのが特徴的である。async function内の処理の中にawaitをしていたPromise構文を作成する。そうすることでawaitを指定した関数のPromiseの結果が返されるまで、async function内の処理が一時停止される。
```js
let X = 1
console.log(X);
start();

async function start() {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(console.log(X += 1));
    }, 1000);
  })
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(console.log(X += 1));
    }, 1000);
  })

  return X;
}
```

<br>

# 6. Promise(並列処理)
下記ではP1とP2の関数を用意している。P1は起動から2秒後に処理が動き、P2では起動時に処理が動く。`Promise.all`を使うことによって、結果をまとめて取得することが出来る。
```js
function P1() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve('P1');
    }, 2000)
  })
}

function P2() {
  return new Promise(function (resolve) {
    resolve('P2');
  })
}

Promise.all([
  P1(),
  P2()
])
  .then(function (result) {

    console.log(result);

  })
```

<br>

# 7. おわりに
Node.jsを触っていると非同期処理から逃れられず、苦手意識があったとしても理解しておかないといけないなと痛感する。この記事は好例があれば更新したいと思う。まずは覚書程度ですが、参考になればと思う。

<br>

</nuxt-content-wrapper>
