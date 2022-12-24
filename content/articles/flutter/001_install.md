---
title: Flutterのインストール
description: Flutterをやってみる
category: flutter
createdAt: 2021-07-02
updatedAt: 2022-07-09
sortNumber: 001
path: "/articles/flutter/001_install"
---

<nuxt-content-wrapper>

- [1. Flutterの公式サイトより、インストール](#1-flutterの公式サイトよりインストール)
- [2. 環境変数の設定](#2-環境変数の設定)
- [3. Flutter doctorでエラーをつぶそう。](#3-flutter-doctorでエラーをつぶそう)
    - [■ cmdline-tools component is missing](#-cmdline-tools-component-is-missing)
    - [■ Android license status unknown.](#-android-license-status-unknown)
    - [▼これで無敵](#これで無敵)
- [4. Code Formatting](#4-code-formatting)
- [5. おわりに](#5-おわりに)

<br>

# 1. Flutterの公式サイトより、インストール
（Get the Flutter SDK）<br>
https://docs.flutter.dev/get-started/install/windows<br>
※flutter_windows_2.8.1-stable

<br>

# 2. 環境変数の設定
※flutter_windows_2.8.1-stable.zipを解凍するとFlutterのフォルダが出来る。私の場合、Cドライブ直下で解凍した。

> コントロールパネル > システムとセキュリティ > システム > システムの詳細設定 > [環境変数]ボタン押下

⇒ Flutter SDK配下にあるbinのパスを環境変数に設定<br>
 例） C:\flutter\bin

<br>

# 3. Flutter doctorでエラーをつぶそう。
`C:\flutter\bin>flutter doctor`
```
Doctor summary (to see all details, run flutter doctor -v):
[√] Flutter (Channel stable, 2.8.1, on Microsoft Windows [Version 10.0.19042.1415], locale ja-JP)
[!] Android toolchain - develop for Android devices (Android SDK version 31.0.0)
    X cmdline-tools component is missing
      Run `path/to/sdkmanager --install "cmdline-tools;latest"`
      See https://developer.android.com/studio/command-line for more details.
    X Android license status unknown.
      Run `flutter doctor --android-licenses` to accept the SDK licenses.
      See https://flutter.dev/docs/get-started/install/windows#android-setup for more details.
[√] Chrome - develop for the web
[√] Android Studio (version 2020.3)
[√] VS Code (version 1.63.2)
[√] Connected device (2 available)
```

### ■ cmdline-tools component is missing
> Android SDK Command-lineがインストールされていないのが原因
1. Android studioで[ファイル]＞[設定]
2. 左サイドバーより外観&振る舞い＞システム設定＞Android SDK
3. SDKツールのタブをクリックして、Android SDK Command-line Tools (latest)にチェックして、「OK」ボタンを押下。（インストールされる。）

### ■ Android license status unknown.
```
flutter doctor --android-licenses
```

### ▼これで無敵
```
Doctor summary (to see all details, run flutter doctor -v):
[√] Flutter (Channel stable, 2.8.1, on Microsoft Windows [Version 10.0.19042.1415], locale ja-JP)
[√] Android toolchain - develop for Android devices (Android SDK version 31.0.0)
[√] Chrome - develop for the web
[√] Android Studio (version 2020.3)
[√] VS Code (version 1.63.2)
[√] Connected device (2 available)

• No issues found!
```

<br>

# 4. Code Formatting
> ファイル保存時にソースコードの自動整形を効かせたいね。
1. [ファイル]＞[設定]
2. [言語とフレームワーク]より[Flutter]を選択
3. 「保存時にコードをフォーマットする」にチェック

<br>

# 5. おわりに
この記事を作成したのが、2022/07/02、この記事を更新したのが、2022/07/09。1年間、やるやる詐欺をしていました。
その間にヴァージョンが変わったりと。今度こそついていけるのか。

<br>

参考：<br>
- 『現場で使えるFlutter開発入門』
- https://www.ccs1981.jp/blog/flutter%E7%92%B0%E5%A2%83%E6%A7%8B%E7%AF%89-windows%E7%B7%A8/
- https://qiita.com/pe-ta/items/e5a1813b21de8d446407

</nuxt-content-wrapper>
