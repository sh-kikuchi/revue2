https://gakogako.com/flutter_android_release/#Google_Play_Console%E3%81%AB%E7%99%BB%E9%8C%B2%E3%81%99%E3%82%8B


# 1. Google Play Console
- [Google Play Console](https://play.google.com/apps/publish/signup/)
- 登録（初回リリースのみ）
- 手数料が25ドル

<br>

# 2. アプリの署名

### ■ keystore
- keystoreのファイルはアプリを署名するためのもの。
- 下記コマンドをコンソールで打って作成するが、Javaの環境が必要？
```
keytool -genkey -v -keystore ./key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias key
```

<br>

コマンドを打つと以下の感じで質問責めを受ける。受け流すところもあれば、書いとこって思った部分は応える。

```
キーストアのパスワードを入力してください:  
新規パスワードを再入力してください: 
姓名は何ですか。
  [Unknown]:  
組織単位名は何ですか。
  [Unknown]:  
組織名は何ですか。
  [Unknown]:  
都市名または地域名は何ですか。
  [Unknown]:  
都道府県名または州名は何ですか。
  [Unknown]:  
この単位に該当する2文字の国コードは何ですか。
  [Unknown]:  JP
CN=Unknown, OU=Unknown, O=Unknown, L=Unknown, ST=Unknown, C=81でよろしいですか。
  [いいえ]:  はい

10,000日間有効な2,048ビットのRSAのキー・ペアと自己署名型証明書(SHA256withRSA)を生成しています
        ディレクトリ名: CN=Unknown, OU=Unknown, O=Unknown, L=Unknown, ST=Unknown, C=JP
[./key.jksを格納中]
```

<br>

- keystoreファイルを生成後はそれをプロジェクトの`android/app`直下に格納する。

<br>

### key.propertiesのファイル生成
- プロジェクトの`android`配下に新規作成
- ファイル名は固定：「key.properties」
- ファイルの内容は以下のものだけ。
```
storePassword=<パスワード>
keyPassword=<パスワード>
keyAlias=key
storeFile=key.jks
```

<br>

###  build.gradle

```java
def localProperties = new Properties()
def localPropertiesFile = rootProject.file('local.properties')
if (localPropertiesFile.exists()) {
    localPropertiesFile.withReader('UTF-8') { reader ->
        localProperties.load(reader)
    }
}

def flutterRoot = localProperties.getProperty('flutter.sdk')
if (flutterRoot == null) {
    throw new GradleException("Flutter SDK not found. Define location with flutter.sdk in the local.properties file.")
}

def flutterVersionCode = localProperties.getProperty('flutter.versionCode')
if (flutterVersionCode == null) {
    flutterVersionCode = '1'
}

def flutterVersionName = localProperties.getProperty('flutter.versionName')
if (flutterVersionName == null) {
    flutterVersionName = '1.0'
}

apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply from: "$flutterRoot/packages/flutter_tools/gradle/flutter.gradle"

android {
    compileSdkVersion flutter.compileSdkVersion
    ndkVersion flutter.ndkVersion

    compileSdkVersion 33

    //for Release
//    signingConfigs {
//        release {
//            keyAlias keystoreProperties['keyAlias']
//            keyPassword keystoreProperties['keyPassword']
//            storeFile keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
//            storePassword keystoreProperties['storePassword']
//        }
//    }

    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }

    defaultConfig {
        applicationId "com.example.journals"
        minSdkVersion flutter.minSdkVersion
        targetSdkVersion flutter.targetSdkVersion
        versionCode flutterVersionCode.toInteger()
        versionName flutterVersionName
    }

    buildTypes {
        release {
            signingConfig signingConfigs.debug
        }
    }
}

flutter {
    source '../..'
}

```

<br>

# 3. リリースビルド
- リファクタ（com.example）
- キャッシュ削除（`flutter clean`コマンド）
- ビルド（`flutter build appbundle`コマンド）

<br>
