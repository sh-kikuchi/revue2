---
title: Templateクラス
category: php
createdAt: 2025-10-12
updatedAt: 2026-10-03
sortNumber: 503
path: "/documents/ghostphp/503_template_class"
---

<nuxt-content-wrapper>

`Template` クラスは、PHPテンプレートファイルのレンダリングと関連データの管理を行う基底クラスの一種である。
**呼び出し元がServiceからControllerに変わった**点に注意（[501_service_template.md](501_service_template.md)）。

> v4.0での変更点: テンプレートの探索先ディレクトリを `setBasePath()` で設定できるようになった（旧版は `"templates/"` をクラス内に直書きしていた）。
> テンプレートはフレームワーク（`aura/`）ではなくアプリケーション側のファイルであるため、場所の指定はアプリ側の `bootstrap.php` で行う（[203_bootstrap.md](203_bootstrap.md)）。

## 1. コード

```php
<?php

namespace app\aura;

class Template {

    protected string $path;
    protected array $data;

    private static string $basePath = 'templates';

    public static function setBasePath(string $path): void {
        self::$basePath = rtrim($path, '/');
    }

    public function __construct(string $path, array $data) {
        $this->path  = $path;
        $this->data = !empty($data) ? $data : [];
    }

    public function render() {
        if (\count($this->data) > 0) {
            foreach ($this->data as $key => $value) {
                ${$key} = $value;
            }
        }

        include self::$basePath . '/' . $this->path . '.php';
    }
}
```

## 2. コード説明

- **クラス定義と名前空間**
  ```php
  namespace app\aura;
  class Template { ... }
  ```

- **プロパティ**
  ```php
  protected string $path; // テンプレートファイルのパス
  protected array $data;  // テンプレートに渡すデータ配列
  private static string $basePath = 'templates'; // テンプレートの探索先ディレクトリ
  ```

- **探索先ディレクトリの設定（`setBasePath()`）**
  - 静的メソッドのため、起動時に1回呼べば全ての `Template` インスタンスに反映される
  - GhostPHPでは `bootstrap.php` で `Template::setBasePath(__DIR__ . '/templates');` のように絶対パスを設定しており、実行時のカレントディレクトリに依存せずテンプレートを読み込める
  - 呼ばなかった場合は既定値 `'templates'`（カレントディレクトリからの相対パス）が使われ、v2.x系と同じ挙動になる

- **コンストラクタ**
  - `$path` : レンダリング対象のテンプレートファイル名（拡張子なし、探索先ディレクトリからの相対パス）
  - `$data` : テンプレートに渡す連想配列。キーがテンプレート内の変数名になる

- **レンダリングメソッド**
  - `$data` 配列を変数として展開（`extract()` と同等の処理を手動で実装）
  - 探索先ディレクトリ内の指定テンプレートファイルを `include` して出力

> **注意**: `setBasePath()` が効くのは `Template` が読み込むファイルだけである。テンプレート内で `include('templates/layouts/header.php')` のように書いている部分は、引き続きカレントディレクトリからの相対パスで解決される。

## 3. 使い方 / 利用例

### ■ コントローラーでのレンダリング
- 第一引数：パス指定
- 第二引数：データ（画面に出力したい値）

```php
public function index(): void {
    if (!$this->home_service->checkSign()) {
        Redirect::to('signin');
        return;
    }

    $data = $this->post_service->index();
    $pagination = paginate($data, 10);

    $template = new Template('post/index', [
        'csrf' => $this->setToken('post_delete'),
        'posts' => $pagination['data'],
        'max_page' => $pagination['max_page'],
        'errors' => $_SESSION['ERROR_MESSAGES'] ?? null,
    ]);

    unset($_SESSION['ERROR_MESSAGES']);

    $template->render();
}
```

> `errors` に渡すセッションキーは `$_SESSION['ERROR_MESSAGES']` である。これはFormRequestのバリデーションに失敗した際、
> `Router` が自動的にセットするキーと同じもの（[304_router_class.md](304_router_class.md) / [306_request_validation.md](306_request_validation.md)）。旧ドキュメントの `$_SESSION['errors']` は使われていない。

### ■ ページネーション（`aura/utils/functions/pagination.php` の `paginate()` ヘルパー）

```php
function paginate(array $data, int $showPerPage) {
    $data_count = count($data);
    $max_page = ceil($data_count / $showPerPage);
    $now = max(1, (int)($_GET['page_id'] ?? 1));
    $start_no = ($now - 1) * $showPerPage;
    $disp_data = array_slice($data, $start_no, $showPerPage, true);

    return ['data' => $disp_data, 'max_page' => $max_page];
}
```

ページリンクの生成（テンプレート内）：
```php
<?php for ($i = 1; $i <= $max_page; $i++): ?>
  <a href="<?php echo route('post'); ?>?page_id=<?php echo $i; ?>">
    <?php echo $i; ?>
  </a>
<?php endfor; ?>
```

### ■ テンプレートファイルの書き方例（`templates/post/index.php`）
```php
<?php include('templates/layouts/header.php'); ?>

<div class="ghost-wrapper px-2">
    <?php if (isset($errors)) : ?>
        <ul>
            <?php foreach ($errors as $error): ?>
                <?php foreach ($error as $message): ?>
                    <li class="text-center" style="list-style:none;"><?php echo h($message); ?></li>
                <?php endforeach; ?>
            <?php endforeach; ?>
        </ul>
    <?php endif; ?>

    <h2 class="text-center pt-2">Posts</h2>

    <div class="text-right">
        <a href="<?php echo route('post/create'); ?>">create a new post</a>
    </div>

    <table class="mx-3">
        <thead>
            <tr><th>Title</th><th>Body</th><th>Updated_at</th><th></th></tr>
        </thead>
        <tbody>
            <?php foreach ($posts as $post): ?>
            <tr>
                <td class="text-center"><?php echo h($post["title"]); ?></td>
                <td class="text-center"><?php echo h($post["body"]); ?></td>
                <td class="text-center"><?php echo h($post["updated_at"]); ?></td>
                <td class="text-center">
                    <a class="crud-edit" href="<?php echo route('post/update'); ?>?id=<?php echo h($post["id"]); ?>">EDIT</a>
                    <form method="POST" action="<?php echo route('post/delete'); ?>">
                        <input type="hidden" name="csrf_token" value="<?php echo h($csrf); ?>">
                        <input type="hidden" name="id" value="<?php echo h($post["id"]); ?>">
                        <button type="submit" class="crud-delete">DELETE</button>
                    </form>
                </td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>

    <!-- Pagination -->
    <div class="flex-box justify-center my-2">
        <?php for ($i = 1; $i <= $max_page; $i++): ?>
            <a class="pagenation" href="<?php echo route('post'); ?>?page_id=<?php echo $i; ?>"><?php echo $i; ?></a>
        <?php endfor; ?>
    </div>
</div>

<?php include('templates/layouts/footer.php'); ?>
```

- `$errors` は `[[$field => $message], ...]` の形（[604_validator_class.md](604_validator_class.md)）なので、二重ループでメッセージを取り出す。`h($error)` のように配列をそのまま渡すと `TypeError` になる
- `h()` は `aura/utils/functions/htmlspecialchars.php` で定義されたXSS対策用エスケープ関数（`htmlspecialchars($str ?? '', ENT_QUOTES, 'UTF-8')`）
- `route()` は `aura/utils/functions/route.php` で定義された、現在のスクリプトディレクトリを基準に相対URLを組み立てるヘルパー関数

</nuxt-content-wrapper>
