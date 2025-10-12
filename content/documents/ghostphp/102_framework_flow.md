---
title: Ghost PHP
category: php
createdAt: 2025-10-12
updatedAt: 2025-10-12
sortNumber: 0
path: "/documents/ghostphp/000_readme"
---

<nuxt-content-wrapper>
GhostPHPは、PHPで構築された軽量なMVCフレームワークであり、ルーティング、コントローラー、サービス、リポジトリの明確な分離を特徴とする。  
このドキュメントでは、リクエストがアプリケーションを通過する流れを説明する。

## 1. ルーティング

ルーティングは、HTTPリクエストをアプリケーションの適切なコントローラーやサービスにマッピングする役割を担います。

### 主要コンポーネント

- **Router クラス** (`aura/routes/Router.php`): HTTPリクエストのルーティングを処理します。
- **Request クラス** (`aura/https/Request.php`): HTTPリクエストを表し、パスとメソッドを取得するメソッドを提供します。

### 機能

- GETとPOSTリクエストの登録
- パスとコールバック関数のマッピング
- 現在のリクエストの解決と適切なコールバックの実行

### 使用例

```php
// index.phpでのルート定義
$app = new App();

// GETリクエストの登録
$app->router->get('signin', function () {
    (new UserService)->showSignInForm();
});

// POSTリクエストの登録
$app->router->post('signin', function () {
    (new UserService)->signin();
});
```

### 処理フロー

1. `App` クラスが `Request` と `Router` のインスタンスを初期化
2. `index.php` でルートが定義される
3. `$app->run()` が呼び出されると、`Router::resolve()` メソッドが現在のリクエストを解決
4. 一致するルートが見つかると、関連するコールバック関数が実行される

## 2. コントローラー

コントローラーは、HTTPリクエストを処理し、適切なサービスを呼び出し、レスポンスを返す役割を担います。

### 主要コンポーネント

- **Controller 基底クラス** (`aura/Controller.php`): すべてのコントローラーの基本機能を提供
- **UserController** (`Controllers/UserController.php`): ユーザー関連のリクエストを処理
- **PostController** (`Controllers/PostController.php`): 投稿関連のリクエストを処理

### 機能

- リクエスト、レスポンス、リダイレクト、バリデーションの処理
- CSRFトークンの生成と検証
- サービスレイヤーの呼び出し

### 使用例

```php
// UserControllerの例
class UserController {
    protected $userService;

    public function __construct() {
        $this->userService = new UserService();
    }

    public function signup() {
        // CSRFトークンの検証
        if (!$this->checkToken('signup')) {
            echo 'Invalid token.';
            return false;
        }

        // ユーザーエンティティの作成
        $user = $this->makeUser($_POST, 'signup');
        
        // サービスの呼び出し
        $this->userService->signup($user);

        // リダイレクト
        Redirect::to('index');
    }
}
```

### 処理フロー

1. ルーターがリクエストをコントローラーのメソッドにマッピング
2. コントローラーがリクエストデータを検証
3. コントローラーが適切なサービスメソッドを呼び出す
4. コントローラーがレスポンスを返すか、リダイレクトを実行

## 3. サービス

サービスは、アプリケーションのビジネスロジックを実装し、コントローラーとリポジトリの間の仲介役を果たします。

### 主要コンポーネント

- **Service 基底クラス** (`aura/Service.php`): すべてのサービスの基本機能を提供
- **UserService** (`services/UserService.php`): ユーザー関連のビジネスロジックを実装
- **PostService** (`services/PostService.php`): 投稿関連のビジネスロジックを実装

### 機能

- ビジネスロジックの実装
- トランザクション管理
- テンプレートのレンダリング
- セッション管理
- CSRFトークンの生成と検証

### 使用例

```php
// PostServiceの例
class PostService extends Service implements IPostService {
    public function create() {
        // CSRFトークンの検証
        if (!$this->checkToken('post_create')) {
            echo 'Invalid token.';
            return false;
        }

        // トランザクション開始
        $this->beginTransaction();

        try {
            // リポジトリのインスタンス化
            $post = new PostRepository();
            $post_request = $this->makePost($_POST);

            // リポジトリメソッドの実行
            $result = $post->createPost($post_request);

            if (!$result) {
                throw new \Exception('Post creation failed.');
            }

            // トランザクションのコミット
            $this->commit();

            // リダイレクト
            Redirect::to('post');
        } catch (\Exception $e) {
            // エラー時のロールバック
            $this->rollBack();
            Redirect::error(500);
        }
    }
}
```

### 処理フロー

1. コントローラーがサービスメソッドを呼び出す
2. サービスがビジネスロジックを実行
3. サービスが必要に応じてリポジトリを呼び出す
4. サービスがトランザクションを管理
5. サービスが結果を返すか、リダイレクトを実行

## 4. リポジトリ

リポジトリは、データベースとのやり取りを担当し、エンティティの永続化と取得を行います。

### 主要コンポーネント

- **Repository 基底クラス** (`aura/Repository.php`): すべてのリポジトリの基本機能を提供
- **UserRepository** (`repositories/UserRepository.php`): ユーザーエンティティのデータアクセスを実装
- **PostRepository** (`repositories/PostRepository.php`): 投稿エンティティのデータアクセスを実装

### 機能

- 基本的なCRUD操作（作成、読み取り、更新、削除）
- エンティティ固有のデータアクセスメソッド
- PDOを使用したデータベース操作

### 使用例

```php
// UserRepositoryの例
class UserRepository extends Repository implements IUserRepository {
    public function __construct() {
        parent::__construct('users');
    }

    public function signup(User $user): bool {
        $data = [
            'name' => $user->getName(),
            'email' => $user->getEmail(),
            'password' => password_hash($user->getPassword(), PASSWORD_DEFAULT),
        ];

        try {
            return $this->create($data);
        } catch (\Exception $e) {
            error_log($e, 3, '/log/error.log');
            return false;
        }
    }

    public function getUserByEmail(string $email) {
        try {
            return $this->findByColumn('email', $email);
        } catch (\Exception $e) {
            return false;
        }
    }
}
```

### 処理フロー

1. サービスがリポジトリメソッドを呼び出す
2. リポジトリがデータベース操作を実行
3. リポジトリが結果をサービスに返す

## 5. 全体のフロー

GhostPHPアプリケーションでのリクエスト処理の全体的なフローは以下の通りです：
```html
Client → Router      : HTTPリクエスト送信
Router → Controller  : ルート解決、該当コントローラーに転送
Controller → Service : リクエスト検証・バリデーション後、サービスメソッド呼び出し
Service → Service     : ビジネスロジック実行
Service → Repository  : データアクセス依頼
Repository → Database : SQL実行
Database → Repository : データ返却
Repository → Service  : 加工済みデータ返却
Service → Controller  : 処理結果返却
Controller → Client   : レスポンス生成・画面表示またはリダイレクト
```

### 具体的な例：ユーザーサインアップ

1. **ルーティング**:
   - クライアントが `/signup` にPOSTリクエストを送信
   - `Router` がリクエストを解決し、`UserService::signup()` を呼び出す

2. **サービス**:
   - `UserService::signup()` がCSRFトークンを検証
   - トランザクションを開始
   - `UserRepository` のインスタンスを作成
   - フォームデータからユーザーエンティティを作成

3. **リポジトリ**:
   - `UserRepository::signup()` がユーザーデータをデータベースに保存
   - パスワードをハッシュ化
   - 基底クラスの `create()` メソッドを使用してSQLを実行

4. **サービス（続き）**:
   - 結果に基づいてトランザクションをコミットまたはロールバック
   - 成功時にユーザーをインデックスページにリダイレクト

この流れにより、関心事の明確な分離が実現され、コードの保守性と拡張性が向上します。

</nuxt-content-wrapper>