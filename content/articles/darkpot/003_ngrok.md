---
title: ngrokを使う
description: localhost環境を外部へ
category: darkpot
createdAt: 2023-03-05
updatedAt: 2023-03-05
sortNumber: 003
path: "/articles/darkpot/003_ngrok"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. ngrokとは](#2-ngrokとは)
- [3. ngrokのアカウント登録](#3-ngrokのアカウント登録)
- [4. Chocolateyで ngrokをインストール](#4-chocolateyで-ngrokをインストール)
- [5. Configファイルに設定](#5-configファイルに設定)
- [6. 起動してみる](#6-起動してみる)
- [7. おわりに](#7-おわりに)

<br>


## 1. はじめに
2023/02/23、下記のDownloadボタンを押してもダウンロードが始まらず。ファイアウォールが原因なのか、なんかコンソール真っ赤だし、よく分からなかったのでChocolatey経由でインストールしてみた。
https://ngrok.com/download

<br>

## 2. ngrokとは
ローカルPC上で起動しているネットワーク（TCP）サービスを外部へ向けて公開することが出来るサービス

<br>

## 3. ngrokのアカウント登録
- Sign up（GitHubやGoogleアカウントもOK）
- アカウントページのYour Authtokenでトークンをコピーしておくこと

<br>

## 4. Chocolateyで ngrokをインストール
- Chocolateyがインストール済みであることが前提(`choco -v`)
  ```
  0.10.15
  ```
- インストール
  ```
   choco install ngrok
  ```
- バージョン確認：`ngrok --version`
  ```
  ngrok version 2.3.35
  ```

<br>

## 5. Configファイルに設定

- トークンを設定する
  ```
   ngrok config (トークン)
  ```

- 　結果、下記の`ngrok.yml`に追加される（私は下記のディレクトリだった）
  ```
   C:\Users\ユーザー名\AppData\Local/ngrok/ngrok.yml
  ```

<br>

## 6. 起動してみる
- プロジェクトディレクトリで`
ngrok http 3000`のコマンドを打って、起動する。

  ```
  Session Status                online
  Account                       xxxxxxxxxxx (Plan: Free)
  Version                       3.1.1
  Region                        Japan (jp)
  Latency                       20ms
  Web Interface                 http://xxxxxxxxxxxxxxx
  Forwarding                    https://xxxxxxxxxx.jp.ngrok.io -> http://

  Connections                   ttl     opn     rt1     rt5     p50     p90       
                                1       0       0.01    0.00    24.00   24.00     

  HTTP Requests
  ```

  <br>

## 7. おわりに
ローカルでのアプリの起動と一緒にngrokも起動すれば、localhostで動いているサービスを外部に公開することが可能になることが分かった。
