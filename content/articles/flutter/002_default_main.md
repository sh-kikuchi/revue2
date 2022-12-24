---
title: ウィジェット
description: デフォルトのmain.dartをコンパクトに理解する
category: flutter
createdAt: 2021-07-02
updatedAt: 2021-07-02
sortNumber: 002
path: "/articles/flutter/002_default_main"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. コンパクトに画面構成を理解していく。](#2-コンパクトに画面構成を理解していく)
    - [■ ざっくり構成を見てみる。](#-ざっくり構成を見てみる)
    - [■ AppBar](#-appbar)
    - [■ body](#-body)
      - [【Centerヴィジェット】](#centerヴィジェット)
      - [【ColumnヴィジェットとRowヴィジェット】](#columnヴィジェットとrowヴィジェット)
      - [【MainAxisAlignment】](#mainaxisalignment)
- [3. ヴィジェットのプロパティの調べ方](#3-ヴィジェットのプロパティの調べ方)
- [4. おわりに](#4-おわりに)

<br>

# 1. はじめに
2022年1月にFlutterをやるゼと意気込んで半年、成果0（中途半端になって全部忘れた）。Express.jsやAWSを仕事で勉強しなくてはならなかったし、プライベートではVue.js、Laravelに奔走していたからという言い訳も出来るが、そこで止めようとしないというのが褒められたいポイント。ダッシュ君/ちゃんのヴィジュアルがかわいいうちは頑張ってやろう。

<br>

【前提】新しいプロジェクトを立ち上げる

<br>

# 2. コンパクトに画面構成を理解していく。
プロジェクトを新規作成し、まずは何も手をつけずに`main.dart`を眺めてみる。すると` Widget build(BuildContext context)`という部分がアプリのUIを形作っていることが分かる。下記はFlutter3.0.4のバージョンのデフォルトの`main.dart`である。

### ■ ざっくり構成を見てみる。
どんなヴィジェットがあるか。まずはアプリの大元として<b>Scaffold</b>がある。<br>
これはアプリの足場のような役割を果たしているようだ。その中にあるものを大別すると...
- appBar：ヘッダーのようなもの
- body：アプリのコンテンツ
- floatingActionButton：ボタン

<br>

```dart
@override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headline4,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ),
    );
  }
```

### ■ AppBar
- 一言で「ヘッダー」
- 下記例だと、タイトルには`Text`ヴィジェットが使われている。
```dart
    appBar: AppBar(
      title: Text(widget.title),
    ),
```
<br>
Textヴィジェットの括弧内を決め打ちで文字列を指定する時は`Text("Re:Vue")`みたいな感じ

### ■ body
- アプリのコンテンツ
```dart
  body: Center(
    child: Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        const Text(
          'You have pushed the button this many times:',
        ),
        Text(
          '$_counter',
          style: Theme.of(context).textTheme.headline4,
        ),
      ],
    ),
  ),
```

<br>

#### 【Centerヴィジェット】
Centerはウィジェットを中央に配置できる。またchildプロパティを持つことが出来る。

<br>

#### 【ColumnヴィジェットとRowヴィジェット】
Columnは複数のヴィジェットを縦に並べることが出来る。ここではmainAxisAlignmentとchildrenというプロパティを持っていることが分かる。ちなみにRowは複数のヴィジェットを横に並べることが出来る。mainAxisAlignmentは次項目に譲って、childrenプロパティの中でまた複数のヴィジェットを持てるのもポイント（？）

<br>

#### 【MainAxisAlignment】
フレックスレイアウトで子を主軸に沿って配置する方法。主軸はColumnヴィジェットの時は縦方向、Rowの場合は横方向という考え方になる。種類を見ると、CSSでいうところのFlex boxが近い。
- MainAxisAlignment.start（主軸の開始位置）
- MainAxisAlignment.end（主軸の終了位置）
- MainAxisAlignment.center（主軸の中央配置）
- MainAxisAlignment.spaceAround
- MainAxisAlignment.spaceBetween
- MainAxisAlignment.spaceEvenly

<br>

# 3. ヴィジェットのプロパティの調べ方
下記ドキュメントを参照すると良さげ。<br>
https://api.flutter.dev/flutter/widgets/widgets-library.html


<br>

# 4. おわりに
とりあえず、成果物。新しく`Container`ヴィジェットがあるが、これはHTMLの`<div>`タグみたいな理解で良いかなって。コメントアウトしてあるけど、`Container`ヴィジェットには幅、高さ、色、子のプロパティがあるが、子（child:)のパターンとして、①テキスト単体（コメントアウト）、②　複数のテキストの横並び（コメントアウト）、③ 複数のテキストの縦並びを用意してみた。今回の成果物に関しては[【Flutter超入門2022】①基本的なWidgetの使い方【Flutter3.0】](https://www.youtube.com/watch?v=4b6DuHGcltI&list=PLuLRJz1UnJzHX1dDN-jnaa7gQ3Av7eEmJ&index=2)を参照した。分かりやすくてありがとう。


```dart
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Re:Vue")),
      body: Container(
          width: double.infinity,
          height: 300,
          color: Colors.teal,
          // child: const Text('Re:Vue'),
          // child: Column(children: const [
          //   Text("まだ27歳"),
          //   Text("獅子座"),
          //   Text("B型"),
          //   Text("7/26"),
          //   Text("2x歳から自力の東京育ち"),
          // ])),
          child: Row(children: const [
            Text("まだ27歳"),
            Text("獅子座"),
            Text("B型"),
            Text("7/26"),
            Text("2x歳から自力の東京育ち"),
          ])),
    );
  }
```
</nuxt-content-wrapper>
