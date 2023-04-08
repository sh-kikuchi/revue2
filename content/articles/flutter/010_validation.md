---
title: バリデーション
description: フォーム入力チェックの仕方
category: flutter
createdAt: 2023-03-06
updatedAt: 2023-03-06
sortNumber: 010
path: "/articles/flutter/010_validation"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. フォームのキーを作る](#2-フォームのキーを作る)
- [3. フォームサンプル](#3-フォームサンプル)
- [4. おわりに](#4-おわりに)

<br>

## 1. はじめに
Flutterではフォームヴィジェットの中で簡単にバリデーションが出来るようなので、実践してみたい。

<br>

## 2. フォームのキーを作る
```dart
 final _formKey = GlobalKey<FormState>();
```

<br>

## 3. フォームサンプル
- フォームヴィジェットのkeyに`_formKey`を設定する。
- TextFormFieldの中に`validator`を用意する。（項目毎）
- 送信ボタン内の`_formKey.currentState!.validate()`の部分でバリデーションチェック（全体）
```dart
Form(
  key: _formKey,
  child: Column(
    mainAxisSize: MainAxisSize.min,
    crossAxisAlignment: CrossAxisAlignment.end,
    children: [
      TextFormField(
          controller: _planController,
          decoration: const InputDecoration(
              hintText: '何かご予定はありますか？（50字以内）'),
          validator: (value) {
            if (value == null || value.isEmpty) {
              return '入力必須項目です';
            } else if (value.length > 50) {
              return '50字以内で入力してください';
            } else {
              return null;
            }
          }),
      TextFormField(
        controller: _dateController,
        validator: (value) {
          if (value == null || value.isEmpty) {
            return '入力必須項目です';
          } else {
            return null;
          }
        },
        decoration: InputDecoration(
          suffixIcon: IconButton(
              onPressed: () {
                _selectDate(context);
              },
              icon: const Icon(Icons.calendar_today)),
        ),
      ),
      TextFormField(
        controller: _weatherController,
        validator: (value) {
          if (value == null || value.isEmpty) {
            return '入力必須項目です';
          } else {
            return null;
          }
        },
      ),
      ElevatedButton(
        onPressed: () async {
          // バリデーションチェック
          if (!_formKey.currentState!.validate()) {
            ScaffoldMessenger.of(context)
                .showSnackBar(const SnackBar(
              content: Text('入力内容に足りない項目があります'),
              backgroundColor: Colors.red,
            ));
          } else {
          　//成功の処理
          }
        },
        child: const Text('登録'),
      )
    ],
  ),
)
```

<br>

## 4. おわりに
フォームサンプルがそのままテンプレートになると良いなと思いつつ、まとめてみた。とても直感的に実装が出来るのでやりやすい。

<br>

参考
- [【バリデーション】Dart / Flutterでフォームの入力チェックをする方法](https://417.run/pg/flutter-dart/flutter-validation/)
- [Flutter Form系Widgetの使い方 〜 すべてのWidgetを学習](https://qiita.com/kurun_pan/items/3378875ff034614f381a)


</nuxt-content-wrapper>
