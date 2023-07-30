---
title: トラブルシューティング
description: Fluter doctor
category: flutter
createdAt: 2023-07-16
updatedAt: 2023-07-16
sortNumber: 901
path: "/articles/flutter/901_flutter_doctor"
---

<nuxt-content-wrapper>

- [1. cmdline-toolsのインストール](#1-cmdline-toolsのインストール)
    - [■ 現象](#-現象)
    - [■ 対処](#-対処)
- [2. Visual Studio is missing necessary components.](#2-visual-studio-is-missing-necessary-components)
    - [■ 現象](#-現象-1)
    - [■ 対処](#-対処-1)

<br>

# 1. cmdline-toolsのインストール

### ■ 現象
- flutter doctorコマンド実行時に発生
```dart
[!] Android toolchain - develop for Android devices (Android SDK version 32.1.0-rc1)
    X cmdline-tools component is missing
      Run `path/to/sdkmanager --install "cmdline-tools;latest"`
      See https://developer.android.com/studio/command-line for more details.
    X Android license status unknown.
      Run `flutter doctor --android-licenses` to accept the SDK licenses.
      See https://flutter.dev/docs/get-started/install/windows#android-setup for more details.
```

### ■ 対処
- Android StudioのSDK Managerを起動
- 「Android SDK」（サイドバー）-「SDK Tools」タブ）を押下して一覧を表示させる
- 「Android SDK Command-line tools(latest)」にチェックしてインストール
-  Android Toolchanのライセンスの同意(`flutter doctor --android-licenses`)

<br>


# 2. Visual Studio is missing necessary components.

### ■ 現象
- flutter doctorコマンド実行時に発生
```dart
[!] Visual Studio - develop for Windows (Visual Studio Community 2022 17.2.6)
    X Visual Studio is missing necessary components. Please re-run the Visual Studio installer for the "Desktop
      development with C++" workload, and include these components:
        MSVC v142 - VS 2019 C++ x64/x86 build tools
         - If there are multiple build tool versions available, install the latest
        C++ CMake tools for Windows
        Windows 10 SDK
```

### ■ 対処
- Visual Studio Installerを開く
- 変更をクリックして、「C++によるデスクトップ開発」にチェックしてインストール



</nuxt-content-wrapper>
