---
title: トレイト
description: 
category: php
createdAt: 2023-03-19
updatedAt: 2023-03-19
sortNumber: 15
path: "/documents/ghostphp/016_object_oriented_3"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. トレイト-useの利用](#2-トレイト-useの利用)
- [3. トレイト-テスト](#3-トレイト-テスト)
- [4. おわりに](#4-おわりに)


<br>

# 1. はじめに
コードを再利用するための仕組みを学んで行こうと思うのだが、トレイトの基本構文のみならず、どのような使われ方をするかを少し知れると良いなと思う。

<br>

# 2. トレイト-useの利用
- 「トレイトはクラスと似ていますが、トレイトは単にいくつかの機能をまとめるためだけのもの」（[PHPドキュメント](PHPのドキュメントを見るとトレイとは「トレイトはクラスと似ていますが、トレイトは単にいくつかの機能をまとめるためだけのもの」))
  ```php
  <?php 
  trait MachineTrait {
    private string $starting = 'Starting...Run!';

    public function run() : void {
      print $this->starting;
    } 
  }
  ```

<br>

- トレイトを使う時は`use トレイト名`で読み込む。
  以下の例のようにクラス内でuseしたトイレトのメソッドを使うことが出来る。

  ```php
  <?php
  require_once 'MachineTrait.php';

  class Fax {
    use MachineTrait;

    public function send() : void {
      print 'sending Fax...sended!';
    }
  }

  $fx = new Fax();
  $fx->run();
  print '<br />';
  $fx->send();

  ```

<br>

# 3. トレイト-テスト

  
  ```php
  <?php
  trait Car {
      public $color = "塗装前";
      protected $spead = 0;
      
      public function run(){
          print "{$this->color}の車で、時速{$this->spead}kmで走行しています。";
      }
  }
  class traitCar {
    use Car;
  }

  class MyCar extends traitCar {
      public $color = "赤い色";
      public $spead = 20;
  }

  $redCar = new MyCar();
  $redCar->run();
  ```

<br>

# 4. おわりに
クラス階層とは違う形でコードの再利用が出来るし、単一継承の制約からより自由になる点は良いなと感じた。


</nuxt-content-wrapper>
