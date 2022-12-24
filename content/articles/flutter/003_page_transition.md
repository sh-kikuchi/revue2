---
title: 画面遷移
description: ButtonとNavigator
category: flutter
createdAt: 2021-07-03
updatedAt: 2021-07-03
sortNumber: 003
path: "/articles/flutter/003_page_transition"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. main.dart (全文)](#2-maindart-全文)
- [3. first\_page.dart (全文)](#3-first_pagedart-全文)
    - [■ Navigator.push](#-navigatorpush)
- [4. second\_page.dart (全文)](#4-second_pagedart-全文)
    - [■ Navigator.pop](#-navigatorpop)
- [5. 【 補足 】main.dartにルーティングを書く方法](#5--補足-maindartにルーティングを書く方法)
- [6. おわりに](#6-おわりに)

<br>

# 1. はじめに
とりあえず、学習を継続出来るようになろうと。今回は画面遷移。main.dartだけでなく、ページごとにファイルを用意して遷移できるようにしていきたい。今回扱うファイルは下記ディレクトリである。

```
プロジェクトディレクトリ
│
│── lib
│   │──main
│      │── first_page.dart
│      │── main.dart
│      │── second_page.dart
│
```


<br>

# 2. main.dart (全文)
`main.dart`の`main()`にある`runApp`でアプリが起動される。ここでは`MyApp`のクラスが呼びされている。`Widget build`中の`MaterialApp`を返している部分を見てみると、homeプロパティをみると、` const FirstPage(),`とある。ここがアプリ起動した時の最初のページにあたる。（importでfirst_page.dartを呼び出している点にも注目）
```dart
import 'package:flutter/material.dart';
import 'first_page.dart';

//アプリの起動
void main() {
  runApp(const MyApp());
}

//最初に呼び出されるクラス
class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.lightGreen,
      ),
      home: const FirstPage(),
    );
  }
}
```

<br>

# 3. first_page.dart (全文)

```dart
import 'package:flutter/material.dart';
import 'package:flutter_sample/second_page.dart';

class FirstPage extends StatelessWidget {
  const FirstPage({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: const Text("Page1")),
        body: Center(
            child: ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => const SecondPage(),
                      fullscreenDialog: true),
                );
          },
          child: const Text("Next"),
        )));
  }
}

```

<br>

### ■ Navigator.push

ページ遷移する時には`Navigator`を利用する。pushで画面遷移することができる。ここでは` builder: (context) => const SecondPage()`とあるように`const SecondPage()`に遷移するのだが、それは`second_page.dart`で用意している。

```dart
Navigator.push(
  context,
  MaterialPageRoute(
      builder: (context) => const SecondPage(),
      fullscreenDialog: true),
);
```

<br>

# 4. second_page.dart (全文)

```dart
import 'package:flutter/material.dart';

class SecondPage extends StatelessWidget {
  const SecondPage({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: const Text("Page2")),
        body: Center(
            child: ElevatedButton(
              onPressed: () {
                Navigator.pop(context);
              },
         child: const Text("Back"),
        )));
  }
}
```

<br>

### ■ Navigator.pop
前ページに戻りたい時はpopを使う。下記は公式ドキュメントにある定型の書き方。

```dart
 Navigator.pop(context);
```

<br>

# 5. 【 補足 】main.dartにルーティングを書く方法

```dart
return MaterialApp(
  title: 'Flutter Demo',
  theme: ThemeData(
    primarySwatch: Colors.blue,
  ),
  home: const MyHomePage(title: 'Flutter Demo Home Page'),
  //名前付きルーティング
  routes: {
    "/test1": (BuildContext context) => const TestPage1(),
    "/test2": (BuildContext context) => const TestPage2(),
    "/test3": (BuildContext context) => const TestPage3(),
  },
);
```

■ 「進む」はpush,「戻る」はpop
- 名前付きルーティングを使う場合の「進む」`pushNamed`(遷移先の指定も必要→import必要)
- 「戻る」はpop（遷移先の指定なくても平気→import不要）
```dart
  TextButton(
      //進むボタン
      onPressed: () => {Navigator.of(context).pushNamed("/test3")},
      child: const Text("Up", style: TextStyle(fontSize: 80))),
  TextButton(
      //戻るボタン
      onPressed: () => {Navigator.of(context).pop()},
      child: const Text("Down", style: TextStyle(fontSize: 80)))
```

<br>

# 6. おわりに
今回もFlutter大学のYoutubeも参考にしたが、それを見ながら英語の公式ドキュメントに抵抗をなくしていくということが出来そうだなと思った。これになれることで調べ方が上手くなる気がする。


参考↓
- [ボタンの種類（公式ドキュメント）](https://docs.flutter.dev/release/breaking-changes/buttons)
- [ページ遷移例](https://docs.flutter.dev/cookbook/navigation/navigation-basics)

</nuxt-content-wrapper>
