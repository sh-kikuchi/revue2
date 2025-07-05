---
title: ページネーション
description: パッケージなしで素のPHPでやる
category: php
createdAt: 2023-06-10
updatedAt: 2023-06-10
sortNumber: 304
path: "/articles/php/304_pagination"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. SQLでデータ取得](#2-sqlでデータ取得)
    - [■ モデル例](#-モデル例)
- [3. ページネーション](#3-ページネーション)
    - [■ 実装例](#-実装例)
- [4. おわりに](#4-おわりに)

<br>

# 1. はじめに
PHPで実装するページネーションを学ぶ。

<br>

# 2. SQLでデータ取得
### ■ モデル例
※下記コードの`db_connect();`はdb_connect.phpという別ファイルを読み込んでDB接続しているものというテイで。データ取得方法の詳細は本テーマから脱線するので割愛。
```php
<?php
require_once '../../database/db_connect.php';
class Artist
{
  /**
   * show artists
   * @param array $postData
   * @return $artists
   */
  public function show(){
    $pdo = db_connect();
    $sql = "SELECT * FROM artists ORDER BY id ASC;";
    $artists = $pdo->query($sql);
    return $artists->fetchAll();
  }
}
```

<br>

# 3. ページネーション

### ■ 実装例
```php

<?php
  require_once '../../class/Artist.php';

  //モデルからデータを取得している。
  $models = new Artist();
  $artists = $models->show(); 

  //データ取得
  define('MAX','10');
  $artist_count = count($artists);
  $max_page = ceil($artist_count / MAX);
  $now = !isset($_GET['page_id'])? 1: $_GET['page_id'];
  $start_no = ($now - 1) * MAX;
  $disp_data = array_slice($artists, $start_no, MAX, true);
 
?>
<?php foreach ($disp_data as $artist){?>
  //データを流す部分
<?php }?>

<!--pagenation-->　//ページネーション箇所
<div class="flex-box justify-center my-2">
    <?php for($i = 1; $i <= $max_page; $i++){?>
      <a href="/the-elephant-in-the-room/page/artist?page_id=<?php echo $i; ?>" > <?php echo  $i ?></a>
    <?php }?>
  </div>
</div>

```
<br>

# 4. おわりに
お意外と簡単にできる印象。ページネーションの処理部分はのちのち切り出しをしよう。

</nuxt-content-wrapper>
