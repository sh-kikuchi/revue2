---
title: Getting Started（User / Post 実装をなぞって学ぶ）
description: リポジトリに実装済みのUser（認証）・Post（CRUD）機能を出発点にした実践チュートリアル
category: php
createdAt: 2026-09-15
updatedAt: 2026-10-25
sortNumber: 700
path: "/documents/ghostphp/700_getting_started"
---

<nuxt-content-wrapper>

このドキュメントは、リポジトリに **サンプル実装として既に存在する `User`（サインアップ／サインイン）と `Post`（CRUD）** の
コードを実際に読みながら、GhostPHPの「1機能ぶんの実装」がどう組み立てられているかを一本の流れで理解するためのチュートリアルである。

各クラスの詳細仕様は個別ドキュメント（[301](301_httprequest_class.md)〜[605](605_logger_class.md)）を参照。
ここでは **「ルーティング → Controller → FormRequest → Service → Repository → Entity → Template」** の一連の流れを、
実在するコードの引用だけで追っていく。

## 0. 準備（すでに動く状態にする）

```bash
composer install

# .env を作成し、.env.dev のキーを参考にDB/SMTP設定を記入

php ghost migrate   # users, posts テーブル作成
php ghost seed      # ダミーデータ投入
```

詳細は [606_cli_commands.md](606_cli_commands.md)。以降はブラウザから `/signup` `/signin` `/post` にアクセスできる状態を前提に読み進める。

## 1. ルート定義（`index.php`）

まずエントリーポイントで、URLとコントローラーメソッドが1対1で紐づいていることを確認する。

```php
use app\controllers\UserController;
use app\controllers\PostController;

// User
$app->router->get('signin',  [UserController::class, 'showSignInForm']);
$app->router->get('signup',  [UserController::class, 'showSignUpForm']);
$app->router->post('signin', [UserController::class, 'signin']);
$app->router->post('signup', [UserController::class, 'signup']);
$app->router->post('signout',[UserController::class, 'signout']);

// Post
$app->router->get('post',         [PostController::class, 'index']);
$app->router->get('post/create',  [PostController::class, 'showCreateForm']);
$app->router->post('post/create', [PostController::class, 'create']);
$app->router->get('post/update',  [PostController::class, 'showUpdateForm']);
$app->router->put('post/update',  [PostController::class, 'update']);
$app->router->delete('post/delete',[PostController::class, 'delete']);
```

ここから「サインアップ」と「投稿作成」の2本の線を最後まで追う。

## 2. サインアップの流れを追う（User）

### 2-1. フォーム表示：`UserController::showSignUpForm()`

```php
public function showSignUpForm(): void {
    if ($this->home_service->checkSign()) {
        Redirect::to('index');
        return;
    }

    $template = new Template('user/form', [
        'csrf' => $this->setToken('signup'),
        'errors' => $_SESSION['ERROR_MESSAGES'] ?? null,
        'old' => $_SESSION['old'] ?? null,
        'form_name' => 'signup',
    ]);

    unset($_SESSION['ERROR_MESSAGES'], $_SESSION['old']);

    $template->render();
}
```

- すでにログイン済みなら `/index` へ流す
- `$this->setToken('signup')`（`Controller` 由来。[305_controller_class.md](305_controller_class.md)）でCSRFトークンを発行
- `templates/user/form.php` に `csrf` / `errors` / `old` / `form_name` を渡して描画

### 2-2. `templates/user/form.php`（抜粋・簡略化）

```php
<form method="post" action="<?= route('signup') ?>">
    <input type="hidden" name="csrf_token" value="<?= h($csrf) ?>">

    <input type="text" name="name" value="<?= h($old['name'] ?? '') ?>">
    <input type="email" name="email" value="<?= h($old['email'] ?? '') ?>">
    <input type="password" name="password">
    <input type="password" name="password_conf">

    <button type="submit">SIGN UP</button>
</form>
```

`name` / `email` / `password` / `password_conf` という input 名は、後述する `UserRequest` の public プロパティ名と **一致させる必要がある**（`Request::fill()` が同名プロパティに自動代入するため）。

### 2-3. 送信：`UserRequest`（FormRequest）

```php
class UserRequest extends Request {
    public int $id;
    public string $name;
    public string $email;
    public string $password;
    public string $password_conf;

    protected function rules(Validator $validator): void {
        $validator->required($this->email, 'email');
        $validator->mailFormat($this->email, 'email');
        $validator->passwordFormat($this->password, 'password');

        if (!empty($this->password_conf)) {
            $validator->passwordConfirm($this->password, $this->password_conf);
        }

        if (!empty($_SESSION['ERROR_MESSAGES'])) {
            (new Session)->oldPostValue($this->all());
        }
    }
}
```

`POST /signup` を受けると、`Router::resolve()` が **`UserController::signup(UserRequest $user_request)` の引数型を見て自動的に**：

1. `UserRequest` を生成
2. `fill($_POST + $_FILES情報)` → `email`/`password` 等のプロパティに値がセットされる
3. `validate()` → `rules()` が実行される

検証NGなら、`UserController::signup()` は **呼ばれずに** リファラ（この場合は `/signup` フォーム画面）へリダイレクトされ、`$_SESSION['ERROR_MESSAGES']` にエラーが積まれる（[304_router_class.md](304_router_class.md)）。次に `showSignUpForm()` が再表示されるとき、そのエラーと `old`（入力し直させたい値）がテンプレートに渡る。

### 2-4. 検証OKの場合：`UserController::signup()`

```php
public function signup(UserRequest $user_request): void {
    if (!$this->checkToken('signup')) {
        return;
    }

    if (!$this->home_service->signup($user_request)) {
        Redirect::to('signup');
        return;
    }

    Redirect::to('index');
}
```

CSRFトークンを検証したうえで `UserService::signup()` に渡す。コントローラー自身はDBやハッシュ化のことを一切知らない。

### 2-5. ビジネスロジック：`UserService::signup()`

```php
class UserService extends Service {
    public function __construct(
        private UserRepository $user_repository,
        private File $file,
        private Mail $mail,
        private Session $session
    ) {
        parent::__construct();
    }

    public function signup(UserRequest $user_request): bool {
        $this->beginTransaction();

        try {
            $user = $this->makeUser($user_request);

            if (!$this->user_repository->signup($user)) {
                throw new \Exception('Signup failed.');
            }

            $this->commit();
            return true;
        } catch (\Exception $e) {
            $this->rollBack();
            return false;
        }
    }

    private function makeUser(UserRequest $user_request): User {
        $user = new User();
        $user->setEmail($user_request->input('email'));
        $user->setPassword($user_request->input('password'));
        if (!empty($user_request->input('name'))) {
            $user->setName($user_request->input('name'));
        }
        return $user;
    }
}
```

ここで初めて `UserRequest`（入力の入れ物）から `UserEntity`（DBとやり取りするためのデータ構造。[402_repository_class.md](402_repository_class.md)の隣接ドキュメント）へ変換される。`UserService` のコンストラクタ引数（`UserRepository` / `File` / `Mail` / `Session`）は、`UserController` を経由してRouterが再帰的にDI解決している。

### 2-6. データ保存：`UserRepository::signup()`

```php
class UserRepository extends Repository implements IUserRepository {
    public function __construct(?PDO $pdo = null) {
        parent::__construct('users', $pdo);
    }

    public function signup(User $user): bool {
        $data = [
            'name' => $user->getName(),
            'email' => $user->getEmail(),
            'password' => password_hash($user->getPassword(), PASSWORD_DEFAULT),
        ];

        return $this->create($data); // Repository::create() が INSERT を実行
    }
}
```

パスワードのハッシュ化はこの層で行う。実際のSQL発行は基底クラス `Repository::create()`（[402_repository_class.md](402_repository_class.md)）に委譲している。

### まとめ（サインアップの1本道）

```
[POST /signup]
  → Router: UserController を DI 生成、UserRequest を fill+validate
  → UserController::signup()  … CSRF検証
  → UserService::signup()     … トランザクション、UserRequest→UserEntity変換
  → UserRepository::signup()  … パスワードハッシュ化してINSERT
  → 成功: Redirect::to('index') / 失敗: Redirect::to('signup')
```

## 3. 投稿一覧・CRUDの流れを追う（Post）

Postはログイン後に使う機能で、一覧表示・作成・更新・削除の4アクションがある。作成の流れはUserと同型なので、ここでは **一覧表示（ページネーション付き）** と **削除（Controller内で直接IDを扱う例）** を中心に見る。

### 3-1. 一覧表示：`PostController::index()`

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

サインイン判定（`UserService::checkSign()`）は、`showCreateForm()` などほかのアクションと同じくコントローラーの冒頭で行う。`PostService::index()` は投稿の配列を返すだけで、0件なら空配列になる（その場合も一覧画面はそのまま表示される）。

`paginate()`（`aura/utils/functions/pagination.php`）で全件配列を10件ずつに切り出し、`posts` / `max_page` としてテンプレートへ渡す。削除フォーム用のCSRFトークンも、一覧表示の時点で `setToken('post_delete')` として発行しておく。

### 3-2. `PostService::index()`

```php
public function index(): array {
    return $this->postRepository->show();
}
```

画面遷移の判断（未サインインならサインイン画面へ）はコントローラーの責務なので、サービスには置かない。サービスが「未サインイン」を偽の値で返すと、コントローラー側で「投稿0件（空配列）」と区別できなくなるためである。

### 3-3. `templates/post/index.php`（一覧・削除フォーム、抜粋）

```php
<?php foreach ($posts as $post): ?>
<tr>
    <td><?= h($post["title"]) ?></td>
    <td><?= h($post["body"]) ?></td>
    <td>
        <a href="<?= route('post/update') ?>?id=<?= h($post["id"]) ?>">EDIT</a>
        <form method="POST" action="<?= route('post/delete') ?>">
            <input type="hidden" name="_method" value="DELETE">
            <input type="hidden" name="csrf_token" value="<?= h($csrf) ?>">
            <input type="hidden" name="id" value="<?= h($post["id"]) ?>">
            <button type="submit">DELETE</button>
        </form>
    </td>
</tr>
<?php endforeach; ?>

<?php for ($i = 1; $i <= $max_page; $i++): ?>
    <a href="<?= route('post') ?>?page_id=<?= $i ?>"><?= $i ?></a>
<?php endfor; ?>
```

### 3-4. 削除：`PostController::delete()`（FormRequestを使わない例）

```php
public function delete(): void {
    if (!$this->checkToken('post_delete')) {
        return;
    }

    $id = \intval($this->request->body()['id'] ?? 0);

    if (!$this->post_service->delete($id)) {
        Redirect::to('post');
        return;
    }

    Redirect::to('post');
}
```

削除は `id` という単一の整数しか使わないため、`PostRequest` のようなFormRequestを介さず、**引数を取らないメソッド**として実装し、`$this->request->body()['id']` で直接読んでいる（v4.2〜。`$_POST` ではなく `body()` から読むので、API から本当の DELETE で送られた場合も読める）。

削除フォームには `_method=DELETE` を付け、ルートは `delete()` で登録する（v4.2〜）。投稿の更新も同じく、更新フォームに `_method=PUT` を付け、ルートは `put()` で登録している。詳しくは [301_httprequest_class.md](301_httprequest_class.md) の4章を参照。GhostPHPでは「フォーム全体の検証が必要ならFormRequest、単純な1値なら直接読む」という両方の書き方が許容されている。

### 3-5. `PostService::delete()` → `PostRepository::deletePost()`

```php
// Service
public function delete(int $id): bool {
    $this->beginTransaction();
    try {
        $result = $this->postRepository->deletePost($id);
        if (!$result) {
            throw new \Exception('Post deletion failed.');
        }
        $this->commit();
        return true;
    } catch (\Exception $e) {
        $this->rollBack();
        $this->logger->error($e->getMessage());
        return false;
    }
}

// Repository
public function deletePost(int $id): bool {
    return parent::delete($id); // 基底クラスのDELETE文を利用
}
```

作成（`create`）・更新（`update`）は、サインアップと同じ「FormRequest → Entity組み立て（`makePost()`) → Repository」の型に従う。[102_framework_flow.md](102_framework_flow.md) の全体フロー図・[306_request_validation.md](306_request_validation.md) のFormRequest実装例も参照。

## 4. この2機能から学べる「GhostPHPでの機能追加の型」

User・Postの実装を並べると、1機能を作る手順は次の型に収まっていることが分かる。

1. **Entity** を `entities/` に定義する（getter/setterのみのデータ構造）
2. **Repository**（＋`interfaces/repositories/` にインターフェース）を作り、テーブル固有のCRUDを実装する。基本操作は `Repository` 基底クラスに委譲する
3. 入力を伴う操作があれば **FormRequest** を `requests/` に作り、`rules()` にバリデーションを書く（[306_request_validation.md](306_request_validation.md)）
4. **Service** を `services/` に作り、コンストラクタで必要なRepository/ユーティリティをDI注入。トランザクション制御とEntity組み立てを行う
5. **Controller** を `controllers/` に作り、コンストラクタでServiceをDI注入。CSRF検証・Serviceの呼び出し・`Template`描画または`Redirect`のみを行う
6. **`index.php`** にルートを追加する：`$app->router->post('xxx', [XxxController::class, 'method'])`
7. `templates/` にビューを追加し、`h()` / `route()` / `paginate()` ヘルパーを使って表示する

新しい機能（例：コメント機能）を追加する場合も、この7ステップを `Post` の実装をテンプレートとしてコピー・改変していくのが最も早い。

</nuxt-content-wrapper>
