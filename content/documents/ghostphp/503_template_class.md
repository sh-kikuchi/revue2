---
title: Templateクラス
category: php
createdAt: 2025-10-12
updatedAt: 2025-10-12
sortNumber: 204
path: "/documents/ghostphp/204_template"
---

<nuxt-content-wrapper>

`Template` クラスは、PHPテンプレートファイルのレンダリングと関連データの管理を行う 基底クラスの一種です。コントローラーやサービスから継承して利用することを想定しており、テンプレート内に変数を展開して画面表示を行うことができます。

## 1. コード

```php
<?php

namespace app\aura;

class Template {

    protected string $path;
    protected array $data;

    public function __construct(string $path, array $data) {
        $this->path  = $path;
        $this->data = !empty($data) ? $data : [];
    }

    public function render() {
        if (count($this->data) > 0) {
            foreach ($this->data as $key => $value) {
                ${$key} = $value;
            }
        }

        include "templates/" . $this->path . '.php';
    }
}
```

## 2. コード説明

- **クラス定義と名前空間**
  ```php
  namespace app\aura;
  class Template { ... }
  ```
  - `app\aura` 名前空間下に Template クラスを定義

- **プロパティ**
  ```php
  protected string $path; // テンプレートファイルのパス
  protected array $data;  // テンプレートに渡すデータ配列
  ```

- **コンストラクタ**
  ```php
  public function __construct(string $path, array $data) {
      $this->path  = $path;
      $this->data = !empty($data) ? $data : [];
  }
  ```
  - `$path` : レンダリング対象のテンプレートファイル名（拡張子なし）
  - `$data` : テンプレートに渡す連想配列。キーがテンプレート内の変数名になる

- **レンダリングメソッド**
  ```php
  public function render() { ... }
  ```
  - `$data` 配列を変数として展開
  - `templates/` ディレクトリ内の指定テンプレートファイルを `include` して出力

## 3. 使い方 / 利用例

### ■ サービスクラスでのレンダリング
- 第一引数：パス指定
- 第二引数：データ（画面に出力したい値）

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

#### 1ページに表示する件数を定義
```php
$per_page = 10;
```

#### 表示するデータのスライス
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

### ■ テンプレートファイルの書き方例
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
