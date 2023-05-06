---
title: PHP8.2にした時。
description: 
category: php
createdAt: 2023-04-16
updatedAt: 2023-04-16
sortNumber: 17
path: "/articles/php/017_php_ini_php82"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. 原因](#2-原因)
- [3. 対処](#3-対処)
- [4. おわりに](#4-おわりに)


<br>

# 1. はじめに
Laravelで`composer update`した時（XAMPPでPHP8.2を使用）、下記のようなエラーが出現した。

```cmd
Failed to download sebastian/object-reflector from dist: The zip extension and unzip/7z commands are both missing, skipping.
The php.ini used by your command-line PHP is: C:\xampp\php\php.ini                                                                                                                                                   
Now trying to download from source
```

<br>

# 2. 原因
Composerでパッケージを入手しようとしたが、Zipが展開できないというもの（OSで提供されているunzipユーティリティかPHPのphpのzipエクステンションであるZipArchiveクラスが使えない）

<br>

# 3. 対処
[PHPドキュメント](https://www.php.net/manual/ja/zip.installation.php)を見ると。「PHP 8.2.0 以降では、 php_zip.dll を php.ini で有効にする必要があります。 それより前のバージョンでは、この拡張モジュールは標準で PHP に組み込まれていました。」という説明が記されていました。したがって、PHP.iniに`extension=php_zip.dll`を追加したところ、`composer update`は通った。


<br>

# 4. おわりに
今回の事例は`composer update`時だったが、PHPドキュメントにある通り、PHPのバージョンアップに起因したエラーのため、`composer install`だったとしても同様のエラーが出る可能性は高いと思われる（実際、試したわけではない）。

</nuxt-content-wrapper>
