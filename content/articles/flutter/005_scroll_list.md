---
title: スクロールできるリスト
description: ListView/SingleChildScrollView
category: flutter
createdAt: 2021-07-06
updatedAt: 2021-07-06
sortNumber: 005
path: "/articles/flutter/005_scroll_list"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. ListView](#2-listview)
    - [■ ListView.builder](#-listviewbuilder)
    - [■ ListView.separated](#-listviewseparated)
- [2. SingleChildScrollView](#2-singlechildscrollview)
- [3. とりあえず、練習でこんなやつを。](#3-とりあえず練習でこんなやつを)
    - [■ main.dart](#-maindart)
    - [■ first\_page.dart](#-first_pagedart)
    - [■ second\_page.dart](#-second_pagedart)
- [4. おわりに](#4-おわりに)

<br>

# 1. はじめに
リスト表示、それも画面からスクロールできるヴィジェットを2つ。`ListView`と`SingleChildScrollView`。

今回扱うファイルは下記ディレクトリである。

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

# 2. ListView
直線的に配置された、スクロール可能なリストが作成出来るヴィジェット

```dart
body: Center(
  child: ListView(
    reverse: true, //要素を逆にすることも可
    children: <Widget>[
      const Text('こんにちは'),
      const Text('こんばんは'),
      Container(width: 200, height: 1000, color: Colors.red)
    ],
  ),
),
```

<br>

### ■ ListView.builder
表示したい要素が動的な場合は`ListView.builder`ヴィジェットを使うと良い


```dart
body: Center(
      child: ListView.builder(
        itemCount: 10,
        itemBuilder: (context, index) {
          return Container(
              child: Text('$index'),
              alignment: Alignment.center,
              width: 200,
              height: 100,
              color: Colors.red,
              margin: const EdgeInsets.symmetric(vertical: 10));
        },
      ),
    ),
```

<br>

### ■ ListView.separated
1行ごとに何かしらの要素を加えたい場合

```dart
body: Center(
  child: ListView.separated(
    separatorBuilder: (context, item) {
      return Container(color: Colors.blue, height: 20);
    },
    itemCount: 10,
    itemBuilder: (context, index) {
      return Container(
          child: Text('$index'),
          alignment: Alignment.center,
          width: 200,
          height: 100,
          color: Colors.red,
          margin: const EdgeInsets.symmetric(vertical: 10));
    },
  ),
),
```


<br>

# 2. SingleChildScrollView
子ヴィジェットでColumnやRowと一緒に用いられる。例えば、`SingleChildScrollView`の中に`Column`の子ヴィジェットがあれば、縦にはみ出すときに上下スクロールが出来るようになる。`Row`の場合は左右スクロールが可能になる。

```dart
      body: Center(
          child: SingleChildScrollView(
              scrollDirection: Axis.vertical,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  const Text('こんにちは'),
                  const Text('こんばんは'),
                  Container(
                    width: 200,
                    height: 1000,
                    color: Colors.red,
                  )
                ],
              ))
          ),
```

<br>

# 3. とりあえず、練習でこんなやつを。
べたーとはるだけ。

### ■ main.dart
ここはとくに。
```dart
import 'package:flutter/material.dart';
import 'first_page.dart';

//アプリの起動
void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.lightGreen,
      ),
      home: FirstPage(),
    );
  }
}
```

<br>

### ■ first_page.dart
スクロールできるように無駄にテキストが長い。
```dart
import 'package:flutter/material.dart';
import 'package:flutter_sample/second_page.dart';

class FirstPage extends StatelessWidget {
  FirstPage({Key? key}) : super(key: key);
  String description = '';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Page1")),
      body: Center(
        child: ListView(
          reverse: false, //要素を逆にすることも可
          children: <Widget>[
            const Padding(
              padding: EdgeInsets.all(8.0),
              child: Text(
                'List Viewのいろいろ',
                textAlign: TextAlign.center,
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20),
              ),
            ),
            SizedBox(
              width: 200,
              height: 200,
              child: Image.network('https://picsum.photos/250?image=9'),
            ),
            Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: const [
                Text('List Viewは'),
                Text('直線的に配置されたスクロール可能な'),
                Text('リストが作れる。'),
                Text('表示する要素が動的な場合'),
                Text('ListView.builderを使うと良い'),
                Text('表示する要素が事前に把握しており、'),
                Text('且つ一行ごとに何か要素を差し込みたい場合は'),
                Text('ListView.separated'),
                Text('を使うと良い'),
                Text('もう一度言います（再放送）'),
                Text('List Viewは'),
                Text('直線的に配置されたスクロール可能な'),
                Text('リストが作れる。'),
                Text('表示する要素が動的な場合'),
                Text('ListView.builderを使うと良い'),
                Text('表示する要素が事前に把握しており、'),
                Text('且つ一行ごとに何か要素を差し込みたい場合は'),
                Text('ListView.separated'),
                Text('を使うと良い'),
                Text('もう一度言います（再々放送）'),
                Text('List Viewは'),
                Text('直線的に配置されたスクロール可能な'),
                Text('リストが作れる。'),
                Text('表示する要素が動的な場合'),
                Text('ListView.builderを使うと良い'),
                Text('表示する要素が事前に把握しており、'),
                Text('且つ一行ごとに何か要素を差し込みたい場合は'),
                Text('ListView.separated'),
                Text('を使うと良い'),
              ],
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => SecondPage(),
                      fullscreenDialog: true),
                );
              },
              child: const Text("Go to Page2"),
            ),
          ],
        ),
      ),
    );
  }
}

```
<br>

### ■ second_page.dart
リストの項目間で` separatorBuilder`で見られるように戻るボタンを挟む（珍）。

```dart
import 'package:flutter/material.dart';

class SecondPage extends StatelessWidget {
  const SecondPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Page2")),
      body: SizedBox(
        child: ListView.separated(
          separatorBuilder: (context, item) {
            return ElevatedButton(
              onPressed: () {
                Navigator.pop(context);
              },
              child: const Text("Back"),
            );
          },
          itemCount: 10,
          itemBuilder: (context, index) {
            return Container(
                alignment: Alignment.center,
                width: 200,
                height: 100,
                color: Colors.lime,
                margin: const EdgeInsets.symmetric(vertical: 10),
                child: Text('$index'));
          },
        ),
      ),
    );
  }
}

```

<br>

# 4. おわりに
UdemyのFlutterラボの講座に依存しつつ、公式ドキュメントを含めた肉付けをしようとしたが、案外さっぱり目。


参考↓
- [ListView Flutter Doc JP](https://flutter.ctrnost.com/basic/layout/listview/#:~:text=ListView%E3%81%AF%E7%9B%B4%E7%B7%9A%E7%9A%84%E3%81%AB,%E3%81%AA%E3%82%B9%E3%82%AF%E3%83%AD%E3%83%BC%E3%83%AB%E3%82%A6%E3%82%A3%E3%82%B8%E3%82%A7%E3%83%83%E3%83%88%E3%81%A8%E3%81%AA%E3%82%8A%E3%81%BE%E3%81%99%E3%80%82)
- [SingleChildScrollViewクラス](https://api.flutter.dev/flutter/widgets/SingleChildScrollView-class.html)

</nuxt-content-wrapper>
