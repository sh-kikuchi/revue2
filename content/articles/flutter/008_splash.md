---
title: スプラッシュ画面
description: flutter_native_splash
category: flutter
createdAt: 2021-07-06
updatedAt: 2021-07-06
sortNumber: 008
path: "/articles/flutter/008_splash"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. pubspec.yaml](#2-pubspecyaml)
- [3. スプラッシュ画面の自動生成](#3-スプラッシュ画面の自動生成)
- [4. おわりに](#4-おわりに)

<br>

# 1. はじめに
アプリ起動時に出るスプラッシュ画面の実装をしてみる。今回はコードを書かないので画像とFlutterコマンドが打てれば問題なし。

```
プロジェクトディレクトリ
│
│── images ←追加
│
│── lib
│   │──main
│      │── sql_helper.dart
│      │── main.dart
│
```

<br>

# 2. pubspec.yaml
pubspec.yamlに`flutter_native_splash`を追加。使う画像もセットしておく。インデントを分かりやすくするため、余計なものも一緒に載せておく。

```yaml
dependencies:
  flutter:
    sdk: flutter
  sqflite: 2.0.3
  path:
  table_calendar: ^3.0.6
  intl: ^0.17.0
  dropdown_textfield: ^1.0.3
  flutter_native_splash:

flutter_native_splash:
  image: images/revue.png
  color: "42a5f5"
```

<br>

# 3. スプラッシュ画面の自動生成
プロジェクトディレクトリに下記のコマンドを打つ。画像を変更したい時も改めて、下記コマンドを打つ...という認識。

```cmd
flutter pub get
flutter pub run flutter_native_splash:create
```

<br>

あとは動作確認。

<br>

# 4. おわりに
とても簡単に出来ました。これは2022年7月29日のこと。まだ細かいカスタマイズをしていないのでこれからやってみて、この記事も充実させてく。

参考↓
- [【Flutter】コマンド一発でスプラッシュ画面を実装する](https://zenn.dev/susatthi/articles/20220406-061305-flutter-native-splash)
- [flutter_native_splash](https://pub.dev/packages/flutter_native_splash)

</nuxt-content-wrapper>
