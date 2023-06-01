---
title: Google Fontを使う
description: google_fonts
category: flutter
createdAt: 2021-06-06
updatedAt: 2021-06-06
sortNumber: 011
path: "/articles/flutter/011_googlefont"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. pubspec.yaml](#2-pubspecyaml)
- [3. フォントを読み込む](#3-フォントを読み込む)
- [4. おわりに](#4-おわりに)

<br>

# 1. はじめに
フォントを自分の好みのものにしてみる。今回はGoogleフォントを使ってフォントを自在に使いこなせるようになることが目的。今回の題材は[Yusei Magic](https://fonts.google.com/specimen/Yusei+Magic)。

```
プロジェクトディレクトリ
│
│── lib
│   │──main.dart

```

<br>

# 2. pubspec.yaml
pubspec.yamlに`google_fonts`を追加。

```yaml
dependencies:
  flutter:
    sdk: flutter
  google_fonts: ^4.0.4
```

<br>

# 3. フォントを読み込む（個別））
`GoogleFonts.【フォント名】`で（）にカスタマイズで細かいスタイルをセットできる。
```dart
  Widget build(BuildContext context) {
    return AppBar(
        centerTitle: true,
        title: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                'Diary...',
                style:
                    GoogleFonts.yuseiMagic(fontSize: 30, color: Colors.black),
              ),
            ]),
      );
  }
```

<br>

# 4. おわりに
Googleフォントは種類豊かなので、好みのものを選んで読み込みも簡単だなという印象。



</nuxt-content-wrapper>
