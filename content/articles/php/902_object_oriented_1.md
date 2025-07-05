---
title: オブジェクト指向
description: クラス/インスタンス/アクセス
category: php
createdAt: 2023-03-19
updatedAt: 2023-07-15
sortNumber: 902
path: "/documents/ghostphp/014_object_oriented_1"
---

<nuxt-content-wrapper>


- [1. はじめに](#1-はじめに)
- [2. クラス](#2-クラス)
    - [■ クラスとは「設計図」](#-クラスとは設計図)
    - [■ プロパティ](#-プロパティ)
    - [■ メソッド](#-メソッド)
- [3. インスタンス](#3-インスタンス)
- [4. アクセス修飾子](#4-アクセス修飾子)
- [5. アクセッサーメソッド](#5-アクセッサーメソッド)
    - [■ クラス例](#-クラス例)
  - [■ 外部ファイルで取得・設定](#-外部ファイルで取得設定)
- [5. おわりに](#5-おわりに)


<br>

# 1. はじめに
Laravelをずいぶんやってきて、そろそろ素のPHPも使いこなしたいと思うようになった。というのもオブジェクト指向構文に疎い点が個人的な弱点として自覚があるのでこの際に学んでみようと思ったのがきっかけ。PHPは厳格なオブジェクト指向プログラミング言語ではないにせよ、概念を学び他の言語にもその知識が使えると良いなという汎用性にも期待している。(2023/03/20)

<br>

# 2. クラス
### ■ クラスとは「設計図」
### ■ プロパティ
- アクセス修飾子(public/protected/private)を付与出来る。
- データ型を決められる。

### ■ メソッド
- $thisはインスタンスメソッドの中で使える（staticの時は使えない。）


<br>

# 3. インスタンス
クラスの設計図から作られたものというイメージ。クラスで定義されているプロパティやメソッドが使える。

- Javaは同一のクラスをもとに生成されたインスタンスは同一の変数を持つ性質があるが、PHPはインスタンス毎に独自の変数を持つことが出来る。


# 4. アクセス修飾子
|           | 範囲                   |
| --------- | ---------------------- |
| public    | どこからでもアクセス可 |
| protected | クラスとサブクラスのみ |
| private   | クラスのみ             |

# 5. アクセッサーメソッド
- プロパティに外部からそのままアクセスできないように、メソッドを介して値を設定したり、取得したりする。

### ■ クラス例
```php
<?php
class Gcd {
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

## ■ 外部ファイルで取得・設定
```php
<?php
require_once '../class/Gcd2.php';

$gcd = new Gcd2();
print '整数1(初期値):'.$gcd->getNum1().'<br>';
print '整数2(初期値):'.$gcd->getNum2().'<br>';
$gcd->setNum1(600);
$gcd->setNum2(20);
print '整数1:'.$gcd->getNum1().'<br>';
print '整数2:'.$gcd->getNum2().'<br>';
print "最大公約数：{$gcd->getCalc()}";

```

<br>

# 5. おわりに
２つの正の整数の最大公約数を求めるクラスを例にクラス、インスタンス、アクセッサ―などを学んできた。プログラムで初めて自作関数を作ったのがユークリッドの互除法（調べて作ってみただけだけど）だったので、そんな個人的な歴史もありつつ、クラスという設計図でインスタンス（模型）を作り、メソッドやプロパティも個々のインスタンスでカスタマイズ出来ることが分かった。

</nuxt-content-wrapper>
