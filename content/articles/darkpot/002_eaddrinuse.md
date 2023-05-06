---
title: EADDRINUSEエラー（for Windows)
description: node.js
category: darkpot
createdAt: 2023-03-18
updatedAt: 2023-03-18
sortNumber: 002
path: "/articles/darkpot/002_eaddrinuse"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. エラー内容](#2-エラー内容)
- [3. 対処方法1](#3-対処方法1)
- [4. 対処方法2](#4-対処方法2)
- [5. おわりに](#5-おわりに)

<br>

## 1. はじめに
Node.jsで`npm run start`などをした時にたまにエラーで、そんなに遭遇しないのでそのエラーが出ては「なんだっけ」と調べるのに時間がかかるので、ここで書き留めておこう。。そう思った。

<br>

## 2. エラー内容
```
listen EADDRINUSE: address already in use :::3000
```

<br>

## 3. 対処方法1
- タスクマネージャーを開いて、ProcessesかServicesのタブをクリック
- 該当のPIDを探し出して、タスクを終了する

<br>

## 4. 対処方法2
- タスクマネージャーを開いて、ProcessesかServicesのタブをクリック
- `netstat -ano|findstr "PID :3000"`を実行（PIDは任意のもの）
  <br>
  > Proto Local Address Foreign Address State PID
  TCP 0.0.0.0:3000 0.0.0.0:0 LISTENING 18264

- `taskkill`コマンド
  例）`taskkill /pid 18264 /f`

<br>

## 5. おわりに
[How to kill server when seeing “EADDRINUSE: address already in use”](https://levelup.gitconnected.com/how-to-kill-server-when-seeing-eaddrinuse-address-already-in-use-16c4c4d7fe5d)

</nuxt-content-wrapper>
