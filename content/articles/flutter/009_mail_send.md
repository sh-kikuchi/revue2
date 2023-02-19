---
title: メール送信する方法
description: flutter_email_sender
category: flutter
createdAt: 2023-02-19
updatedAt: 2023-02-19
sortNumber: 009
path: "/articles/flutter/009_mail_send"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. pubspec.yaml](#2-pubspecyaml)
- [3. AndroidManifest.xmlへの追記](#3-androidmanifestxmlへの追記)
- [4. まずは全体像](#4-まずは全体像)
- [5. メールを送るためのコア実装](#5-メールを送るためのコア実装)
- [6. コントローラ](#6-コントローラ)
- [7. おわりに](#7-おわりに)

<br>

# 1. はじめに
アンドロイド端末向けで、`flutter_email_sender`を使ったメール送信を整理してみたい。

<br>

# 2. pubspec.yaml
pubspec.yamlで下記のパッケージのバージョンを追記して、`flutter pub get`を実行する。

```yaml
dependencies:
（中略）
  flutter_email_sender: ^3.0.1
```

<br>

# 3. AndroidManifest.xmlへの追記
Android端末でメール送信機能を実装す時には、`AndroidManifest.xml`で下記のような設定を施す。
<manifest package="com.example.journals">
    <queries>
        <intent>
            <action android:name="android.intent.action.SENDTO" />
            <data android:scheme="mailto" />
        </intent>
    </queries>

</manifest>

<br>

# 4. まずは全体像

<details><summary>サンプルコード</summary>

```js
import 'package:flutter/material.dart';
import 'package:flutter_email_sender/flutter_email_sender.dart';

import '../../common/footer.dart';

void main() => runApp(const Inquiry());

class Inquiry extends StatelessWidget {
  const Inquiry({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: MailPage(),
    );
  }
}

class MailPage extends StatefulWidget {
  const MailPage({Key? key}) : super(key: key);

  @override
  State<MailPage> createState() => _MailPage();
}

class _MailPage extends State<MailPage> {
  late TextEditingController _emailController;
  late TextEditingController _bodyController;
  late TextEditingController _subjectController;

  @override
  void initState() {
    super.initState();
    _emailController = TextEditingController();
    _bodyController = TextEditingController();
    _subjectController = TextEditingController();
  }

  @override
  void dispose() {
    _emailController.dispose();
    _bodyController.dispose();
    _subjectController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('メール送信')),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: Column(
            children: [
              const SizedBox(height: 40),
              TextFormField(
                controller: _emailController,
                decoration: const InputDecoration(hintText: '宛先'),
              ),
              const SizedBox(height: 20),
              TextFormField(
                controller: _subjectController,
                decoration: const InputDecoration(hintText: '件名'),
              ),
              const SizedBox(height: 20),
              TextFormField(
                controller: _bodyController,
                decoration: const InputDecoration(hintText: '本文'),
              ),
              const SizedBox(height: 20),
              ElevatedButton(onPressed: _sendEmail, child: const Text('送信する')),
              const SizedBox(height: 40),
            ],
          ),
        ),
      ),
      bottomNavigationBar: const Footer(),
    );
  }

  Future<void> _sendEmail() async {
    final email = Email(
      body: _bodyController.text,
      subject: _subjectController.text,
      recipients: [_emailController.text],
      isHTML: false,
    );

    await FlutterEmailSender.send(email);
  }
}

```

</details>

<br>

# 5. メールを送るためのコア実装
下記のコードで実際メールで送る内容を盛り込む。
- body:メール内容
- subject:議題・タイトル
- recipients: 差出人
- その他 ccやbccなどの設定も可

```js
 Future<void> _sendEmail() async {
    final email = Email(
      body: _bodyController.text,
      subject: _subjectController.text,
      recipients: [_emailController.text],
      isHTML: false,
    );
    await FlutterEmailSender.send(email);
  }
```

<br>

# 6. コントローラ
`#55`のように実際メール内容は直書きではなく、コントローラを使ってみている。パターンとしては各項目のコントローラを定義して、`initState`でインスタンスを生成する。生成したら、画面が消える時にインスタンスを破棄したいので、`dispose`メソッドってやつで使い終わったら破棄出来るようにする。

```js
  late TextEditingController _emailController;
  late TextEditingController _bodyController;
  late TextEditingController _subjectController;

  @override
  void initState() {
    super.initState();
    _emailController = TextEditingController();
    _bodyController = TextEditingController();
    _subjectController = TextEditingController();
  }

  @override
  void dispose() {
    _emailController.dispose();
    _bodyController.dispose();
    _subjectController.dispose();
    super.dispose();
  }
```

<br>

# 7. おわりに
2023年2月段階で気づいたことがもう既に`flutter_email_sender 5.2.0`とバージョンアップしていること。ぱっと見では差異はないように見えたが、変更点が充分に終えていないのと書いている内容が少し古いかもしれないので、そこは実機テストを踏まえて確認をしていきたい。

<br>

参考↓
- [Flutterでメール送信する方法](http://pineplanter.moo.jp/non-it-salaryman/2020/08/31/post-9008/)
- [flutter_email_sender](https://pub.dev/packages/flutter_email_sender)
- [可茂IT塾](https://www.kamo-it.org/blog/flutter-mail/)
</nuxt-content-wrapper>
