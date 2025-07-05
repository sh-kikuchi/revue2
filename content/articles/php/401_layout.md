---
title: ヘッダーとフッター
description: テンプレートを作る
category: php
createdAt: 2022-02-06
updatedAt: 2022-02-06
sortNumber: 7
path: "/documents/ghostphp/401_layout"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. テンプレート用意しましょう。](#2-テンプレート用意しましょう)
    - [■ header.php](#-headerphp)
    - [■ header.php](#-headerphp-1)
- [3. include関数](#3-include関数)
- [4. おわりに](#4-おわりに)

<br>

# 1. はじめに
ユーザーが見る画面が増える度にヘッダーとフッターをいちいち書くとなると面倒ですし、場合によってはキレそうになりますね（それは僕だけかもしれない）。なのでテンプレートを用意して、必要な時に読み込めるようにしましょう。

```html
プロジェクトディレクトリ
│
│── layout
│   │── header.php
│   │── footer.php
│
│── index.php
```

<br>


# 2. テンプレート用意しましょう。
### ■ header.php
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../../the_Elephant_in_the_Room/asset/css/style.css">
  <script type="text/javascript" src="../../the_Elephant_in_the_Room/asset/js/script.js" defer></script>
  <title>Document</title>
</head>
<body>
<header>
  // ハンバーガーメニューなど
</header>
```

<br>

### ■ header.php
```html
<footer>
<!-- フッターの内容 -->
</footer>
</body>
</html>
```

<br>

# 3. include関数
必要なファイルに下記のものを読み込めばOK。
<br><br>
■ ヘッダーを読み込む
```php
<?php include('../the_Elephant_in_the_Room/layout/header.php'); ?>
```
<br>

■ フッターを読み込む
```php
<?php include('../the_Elephant_in_the_Room/layout/footer.php'); ?>
```
<br>

# 4. おわりに
内容とかデザインは「ご自分で」って感じではありますが、テンプレート用意と読み込みの仕方が分かれば、ストレス軽減間違いなし。ファイルサイズも節約できますしねぇ～。

</nuxt-content-wrapper>
