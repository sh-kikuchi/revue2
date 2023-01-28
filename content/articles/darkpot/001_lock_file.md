---
title: lockファイル
description: npm/yarn
category: darkpot
createdAt: 2023-01-28
updatedAt: 2023-01-28
sortNumber: 001
path: "/articles/darkpot/001_lock_file"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. そもそもlockファイルって何か？](#2-そもそもlockファイルって何か)
- [3. おわりに](#3-おわりに)

<br>

# 1. はじめに
調べるきっかけとなったのは、デプロイしているアプリで脆弱性が発見され、Git Hubから下記の内容のメールが届いたことだった。結論これに関してはlockファイルで定義されている`ua-parser-js`のバージョンを上げるだけで良かった。
```
ReDoS Vulnerability in ua-parser-js version
```
その時、そもそもlockファイルって何だろうと思ったので調べてみた。

<br>

# 2. そもそもlockファイルって何か？
誰がインストールしても同じバージョンがインストールされるようにするファイル。パッケージマネージャはlockファイルがあった時にそこに記載されているバージョンに従う。npmでいえば、package-lock.json、yarnの場合はyarn.lockがlockファイルにあたる。

<br>

# 3. おわりに
共同開発とかする時にlockファイルをしっかり作成しておくとバージョンの不揃いなどが防げることが分かった。

</nuxt-content-wrapper>
