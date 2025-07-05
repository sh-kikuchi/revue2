---
title: ポリモーフィズムとインターフェース
description: 同じメソッドをオーバーライドする
category: php
createdAt: 2023-03-19
updatedAt: 2023-07-15
sortNumber: 903
path: "/documents/ghostphp/903_object_oriented_2"
---

<nuxt-content-wrapper>


- [1. はじめに](#1-はじめに)
- [2. ポリモーフィズム](#2-ポリモーフィズム)
    - [■ ポリモーフィズムとは](#-ポリモーフィズムとは)
    - [■ 抽象メソッド](#-抽象メソッド)
- [3. インターフェース](#3-インターフェース)
    - [■ インターフェースとは？](#-インターフェースとは)
    - [■ インターフェース例](#-インターフェース例)
    - [■ 実装クラス（インターフェースを実装したクラス）](#-実装クラスインターフェースを実装したクラス)
- [4. おわりに](#4-おわりに)


<br>

# 1. はじめに
ポリモーフィズム（polymorphism）は「それぞれ異なる型の実体に一つのインターフェース」であり、クラスのオーバーライドとも深く関連するものであるようだ。難しそうなイメージがあり、なかなか手つかずだったが、インターフェースの概念にも触れるとあってここで漸く腰を据えてまとめてみようと決意した。

<br>

# 2. ポリモーフィズム
### ■ ポリモーフィズムとは
- あるクラスを継承する複数のクラスで同名のメソッドをオーバーライドしてそれぞれ異なる動きを可能にする。→複数のクラスの同じメソッド名が使える。

<br>

### ■ 抽象メソッド
- 確実にポリモーフィズムを実現させる。
- 抽象メソッド自体にはメソッドの中身はない。（オーバーライド専用）
- クラスがサブクラスに対して、オーバーライドして下さいねと強制する感じ。
```
  protected abstract function getArea(): float;
```

例）
  ```php
  <?php
  abstract class Artist {
    public abstract function likeArtist(): string;
  }

  class Idol extends Artist {
    public final function likeArtist(): string {
      return 'ExWHYZ';
    }
  }
  class RockBand extends Artist {
    public final function likeArtist(): string {
      return 'GLAY';
    }
  }
  class ElectroMusicGroup extends Artist {
    public final function likeArtist(): string {
      return 'minus(-)';
    }
  }

  $idol = new Idol();
  print $idol->likeArtist() . '<br />';
  $rockBand = new RockBand();
  print $rockBand->likeArtist() . '<br />';
  $electroMusicGroup = new ElectroMusicGroup();
  print $electroMusicGroup->likeArtist() . '<br />';

  ```

<br>

仮にArtistクラスの`abstract`を取り覗いてみると下記のようなエラーが出る。
abstractのメソッドが1つでもあるとクラス自体もabstractにしなくちゃならなそう。
サブクラスからすると、抽象クラスの一部のメソッドしか使いたくないのに結果的に余分なメソッドまで読み込むことに気づかされる。

> Fatal error: Class Artist contains 1 abstract method and must therefore be declared abstract or implement the remaining methods (Artist::likeArtist) 

# 3. インターフェース
### ■ インターフェースとは？
- ポリモーフィズムの問題として、PHPは単一継承しかできないので、不要なメソッドまでもオーバーライドしないといけない。これを解消するのに「インターフェース」が有効。
- インターフェースの特徴
  1. 抽象メソッドや定数のみしか定義できない。
  2. abstract修飾子、アクセス修飾子が不要。
  3. クラスと異なり、多重継承が可能。


### ■ インターフェース例
  ```php
 <?php
  interface InterfaceGcm {
    function getCalc(): string;
  }

  ```

<br>

### ■ 実装クラス（インターフェースを実装したクラス）
- class クラス名 implements インターフェース名で`interface`を実装する
  ```php
  <?php
  require_once '../interface/InterfaceGcm.php';
  class Gcd2 implements InterfaceGcm{
    private int $num1;
    private int $num2;

    public function __construct() {
      $this->setNum1(1);
      $this->setNum2(1);
    }
    /**
     * num1
     */
    public function getNum1(): int {
      return $this->num1;
    }
    public function setNum1(int $num1) : void {
      if ($num1 <= 0) {
        throw new Exception('num1は正の整数で指定します。');
      }
      $this->num1 = $num1;
    }
    /**
     * num2
     */
    public function getNum2(): int {
      return $this->num2;
    }
    public function setNum2(int $num2) : void {
      if ($num2 <= 0) {
        throw new Exception('num2は正の整数で指定します。');
      }
      $this->num2 = $num2;
    }
    /**
     * Calc Greatest Common Divisor
     */
    public function getCalc(): string {
      $num1 = $this->getNum1();
      $num2 = $this->getNum2();

      $big = 0;
      $small = 0;
      $remainder = 0;

      if($num1 > $num2){
        $big   = $num1;
        $small = $num2;
      }else{
        $big   = $num2;
        $small = $num1;
      }

      while(($remainder = $big % $small) != 0){
        $big = $small;
        $small = $remainder;
      }

      $msg = "最大公約数は". $small . "です";

      return $msg;
    }
  }

  ```

<br>

# 4. おわりに
抽象クラスというものがイマイチ何なのかが分かっていなかったが、今回学習してみて、スーパークラスに中身のない抽象メソッドを用意することで、そのクラスは抽象クラスとなり、各サブクラスはそれを継承してはオーバーライド（上書き）することが分かった。そして、インターフェースを使うことによってクラスでは出来ない多重継承が可能となり、必要なメソッドを自在に読み込むことが出来そうだということも知れたので活用してみたい。

</nuxt-content-wrapper>
