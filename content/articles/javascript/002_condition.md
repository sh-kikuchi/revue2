---
title: 条件分岐
description: if文 switch文
category: JavaScript
createdAt: 2021-11-06
updatedAt: 2022-08-21
sortNumber: 2
path: "/articles/javascript/002_condition"
---

<nuxt-content-wrapper>

<!-- code_chunk_output -->
- [1. はじめに](#1-はじめに)
- [2.  条件分岐（if篇）](#2--条件分岐if篇)
  - [■ 条件分岐（switch篇）](#-条件分岐switch篇)
- [4. おわりに](#4-おわりに)

<br>

# 1. はじめに
「ある特定の条件の時だけ処理を動かしたい」という衝動に駆られたときの条件分岐。if文とswitch文に代表される基本的な書き方を整理してみる。

# 2.  条件分岐（if篇）
- if文の基本
  ```
  if (条件式1）{
  （処理1）; → 【条件式1】が真の時、（処理1）
  }else if(条件式2）{
  （処理2）; → 【条件式2】が真の時、（処理2）
  }else{
  （処理3）; → 上記の条件以外の時、（処理3）
  }
  ```

- 複数の条件をセットすることも出来る。
  > （条件1）││ （条件2） 条件1 【または】条件２ <br>
  > （条件1）&&（条件2） 条件1 【かつ】条件２

- 条件式に使える様々な演算子
  
  ① 大小を比べる演算子
  > a < b 　(aはbより小さい)<br>
  > a <= b　(aはb以下)
  
  ② 等しいかを比べる演算子
  > a===b　(aとbが等しい)<br>
  > a!==b　(aとbが等しくない)<br>

- 3教科の点数の合計点を出してランク分けしよう
  ```js
    let japanese = 67;
    let math = 89;
    let english = 72;

    //数学だけ、値を更新したとします
     math = 91;

    //合計点を出す
    let total = japanese + math + english;
    console.log(total);

    //条件分岐でランクをつけよう
    if(total >= 270){
      console.log("S");
    }else if(total < 270 && total >= 240){
      console.log("A");
    }else if(total < 240 && total >= 210){
      console.log("B")
    }else{
      console.log("C")
    }
  ```
<br>

## ■ 条件分岐（switch篇）
- switch文の基本
  ```
  let 変数= 値;

    switch (値) {
      case "値1":
      「値1」の時の処理;
      break;        ←「break」は、caseの終了を意味する。
      case "値2":
      「値2」の時の処理;
      break;
      default :     ←いずれの条件も満たさない場合の処理
      break;
    }
  ```

- 3教科の点数の合計点でランクが「B」だったとしましょう。ランクごとに出されるメッセージをSwitch文で書いてみましょう。

	 ```js
  	let rank = "B";
  	switch(rank){
    	case "S":
      		console.log("あなたは天才だわ♪");
      		break; //これがないと以降の処理も実行されてしまう。
    	case "A":
      		console.log("あなたは優秀だわ");
      		break;
    	case "B":
      		console.log("あなた、凡人ね");
      		break;
  	}
  	```
	★ Switch文のメリット
	> 多分岐処理を記述する際に、if文よりもソースコードの読みやすさと実行速度に優れている。

<br>

# 4. おわりに
三項演算子を加えよう！これはhomework

<br>

</nuxt-content-wrapper>
