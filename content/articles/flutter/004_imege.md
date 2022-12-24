---
title: 画像を表示する
description: Imageヴィジェット
category: flutter
createdAt: 2021-07-05
updatedAt: 2021-07-05
sortNumber: 004
path: "/articles/flutter/004_imege"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. pubspec.yaml (全文)](#2-pubspecyaml-全文)
- [3. 画像表示](#3-画像表示)
    - [BoxFitの色々](#boxfitの色々)
    - [ネットから画像を拝借する場合](#ネットから画像を拝借する場合)
- [4. おわりに](#4-おわりに)

<br>

# 1. はじめに
画像を表示してみる。今回はプロジェクトディレクトリに画像用のファイル用意してからはじめ〼 画像表示をするといっても、あまり良いサイズの画像がない時にリサイズしてくれるやり方も軽ーく触れときたい。個人開発レベルでいつも適当なサイズの画像がなくて(´・ω・)

```
プロジェクトディレクトリ
│
│── images ←追加
│
│── lib
│   │──main
│      │── first_page.dart
│      │── main.dart
│      │── second_page.dart
│
```


<br>

# 2. pubspec.yaml (全文)
プロジェクトディレクトリに「images」フォルダを用意して、そこに画像を用意する。
そのあと` pubspec.yaml`でassetsで使いたい画像のパスを書く。

<br>
assetsはもともとコメントアウトされているので、コメントアウトを外す。その際にassetsの前のインデントは2つであること。

<br>
■ 変更後

```dart
flutter:

  # The following line ensures that the Material Icons font is
  # included with your application, so that you can use the icons in
  # the material Icons class.
  uses-material-design: true

  # To add assets to your application, add an assets section, like this:
  # assets:
  #   - images/a_dot_burr.jpeg
  #   - images/a_dot_ham.jpeg

```

<br>
■ 変更後

```dart
flutter:

  # The following line ensures that the Material Icons font is
  # included with your application, so that you can use the icons in
  # the material Icons class.
  uses-material-design: true

  # To add assets to your application, add an assets section, like this:
  assets:
     - images/revue.png

```

<br>

# 3. 画像表示
> ●　 Image.asset('images/revue.png'

下記の例はSizedBoxヴィジェットで幅と高さを調節しておき、子プロパティの中で画像を表示する。その際の BoxFit.coverはSizedBoxの大きさ分の縮尺に調整してくれる。（ちなみにrevue.pngはもともと2271×2272もサイズがありやした）
```dart
 SizedBox(
    width: 150,
    height: 150,
    child: Image.asset('images/revue.png', fit: BoxFit.cover),
  ),

```

<br>

### BoxFitの色々
[BoxFit enum ](https://api.flutter.dev/flutter/painting/BoxFit.html)を参照


<br>

### ネットから画像を拝借する場合
```dart
Image.network('https://flutter.github.io/assets-for-api-docs/assets/widgets/owl-2.jpg'),
```

<br>

# 4. おわりに
 pubspec.yamlで余白にうるさいというか、書き方的なものが決まっているからそれをしっかり理解しないといけないかなという印象は受けた。それに関しては下記、参考にした「Flutterで「FlutterError: Unable to load asset」が発生した際のチェック箇所」が有益だし、そもそもyamlの書き方を勉強しても良いかも。

参考↓
- [【Flutter Coding】画像を表示するImage Widgetの使い方【画像サイズを意識して美しいレイアウトを】](https://vector-ium.com/flutter-image-widget/)
- [Flutterで「FlutterError: Unable to load asset」が発生した際のチェック箇所](https://kamotora.net/system/flutter/fluttererror-unable-to-load-asset/)
- [Image class](https://api.flutter.dev/flutter/widgets/Image-class.html)

</nuxt-content-wrapper>
