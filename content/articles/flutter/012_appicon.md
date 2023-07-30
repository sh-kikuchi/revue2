---
title: アプリアイコン
description: flutter_launcher_icons
category: flutter
createdAt: 2021-06-01
updatedAt: 2021-06-01
sortNumber: 012
path: "/articles/flutter/012_appicon"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. pubspec.yaml](#2-pubspecyaml)
- [3. コマンド実行](#3-コマンド実行)
- [4. おわりに](#4-おわりに)

<br>

# 1. はじめに
アイコンを変えてみる。ただそれだけ。

<br>

# 2. pubspec.yaml
下記のように`flutter_launcher_icons`を追加して、さらに`image_path`で画像パスを指定する。以下はassets/imagesの配下にある画像を呼び出している。`android: true`と`ios: true`をセットすることで両デバイスでアイコンを使うことができる。

```yaml
dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_launcher_icons: ^0.13.1

flutter_icons:
  android: true
  ios: true
  image_path: "images/logo.png"
```

<br>

# 3. コマンド実行
設定終わったら、下記コマンドを打つのみ。

```yaml
flutter pub get
flutter pub run flutter_launcher_icons
```

# 4. おわりに
基本的に画像を用意してpubspec.yamlで設定するだけでホーム画面に表示されるアプリのアイコンが変えられるので簡単。

<br>

参考
- [flutter_launcher_icons](https://pub.dev/packages/flutter_launcher_icons)

</nuxt-content-wrapper>
