---
title: Ghost PHP
description: テンプレート
category: php
createdAt: 2025-06-27
updatedAt: 2025-06-27
sortNumber: 4
path: "/documents/ghostphp/104_template"
---

<nuxt-content-wrapper>


- [1. Template クラスの役割](#1-template-クラスの役割)
- [2. 基本的な記法](#2-基本的な記法)
    - [■ サービスクラスでのレンダリング](#-サービスクラスでのレンダリング)
    - [■ ページネーション](#-ページネーション)
      - [現在のページを取得](#現在のページを取得)
      - [1ページに表示する件数を定義](#1ページに表示する件数を定義)
      - [表示するデータのスライス](#表示するデータのスライス)
      - [最大ページ数の算出](#最大ページ数の算出)
      - [ページリンクの生成（テンプレート内）](#ページリンクの生成テンプレート内)
- [3. テンプレートファイルの書き方例](#3-テンプレートファイルの書き方例)

<br>

# 1. Template クラスの役割

`Template` クラスは、テンプレートファイル（HTML）を読み込み、変数を埋め込んで画面に出力するためのクラスです。

- `templates/` 配下にあるテンプレートファイルを `include` で読み込み
- 渡されたデータを変数に展開してテンプレート内で使用可能にする
- レイアウトファイル（`header.php`, `footer.php`など）と組み合わせて利用

---

<br>

# 2. 基本的な記法

### ■ サービスクラスでのレンダリング
- 第一引数：パス指定
- 第二引数：データ（画面に出力したい値）
- `templates/post/index.php` を include して画面に出力

```php
public function index() {
    $repository = new PostRepository();
    $pagination = paginate($repository->show(), 10);

    $template = new Template('post/index', [
        'csrf' => $this->setToken('post_delete'),
        'posts' => $pagination['data'],
        'max_page' => $pagination['max_page'],
        'errors' => $_SESSION['errors'] ?? null
    ]);

    return $template->render();
}
```

### ■ ページネーション

#### 現在のページを取得
```php
$page_id = isset($_GET['page_id']) ? (int)$_GET['page_id'] : 1;
```

####  1ページに表示する件数を定義
```php
$per_page = 10;
```

####   表示するデータのスライス
```php
$offset = ($page_id - 1) * $per_page;
$paginated_data = array_slice($all_data, $offset, $per_page);
```

#### 最大ページ数の算出
```php
$max_page = ceil(count($all_data) / $per_page);
```

#### ページリンクの生成（テンプレート内）
```php
<?php for ($i = 1; $i <= $max_page; $i++): ?>
  <a href="/post?page_id=<?php echo $i; ?>">
    <?php echo $i; ?>
  </a>
<?php endfor; ?>
```

<br>

# 3. テンプレートファイルの書き方例
```php
<?php include('templates/layouts/header.php'); ?>

<div class="wrapper px-2">
    <?php if (isset($errors)) : ?>
        <ul>
            <?php foreach($errors as $error): ?>
                <li class="text-center" style="list-style:none;"><?php echo h($error); ?></li>
            <?php endforeach; ?>
        </ul>
    <?php endif; ?>

    <h2 class="text-center pt-2">Posts</h2>

    <div class="text-right">
        <a href="/post/create">create a new post</a>
    </div>

    <div class="flex-box justify-center" style="height:80%; overflow-y:auto;">
        <table class="mx-3">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Body</th>
                    <th>Updated_at</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($posts as $post): ?>
                <tr>
                    <td class="text-center"><?php echo h($post["title"]); ?></td>
                    <td class="text-center"><?php echo h($post["body"]); ?></td>
                    <td class="text-center"><?php echo h($post["updated_at"]); ?></td>
                    <td class="text-center">
                        <a class="crud-edit" href="/post/update?id=<?php echo h($post["id"]); ?>">EDIT</a>
                        <form method="POST" action="/post/delete">
                            <input type="hidden" name="csrf_token" value="<?php echo h($csrf); ?>">
                            <input type="hidden" name="id" value="<?php echo h($post["id"]); ?>">
                            <button type="submit" class="crud-delete">DELETE</button>
                        </form>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>

    <!-- Pagination -->
    <div class="flex-box justify-center my-2">
        <?php for ($i = 1; $i <= $max_page; $i++): ?>
            <a class="pagenation" href="/post?page_id=<?php echo $i; ?>"><?php echo $i; ?></a>
        <?php endfor; ?>
    </div>
</div>

<?php include('templates/layouts/footer.php'); ?>

```

</nuxt-content-wrapper>