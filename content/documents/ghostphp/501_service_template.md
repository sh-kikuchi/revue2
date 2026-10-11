---
title: コントローラー・サービス・テンプレートの関係
category: php
createdAt: 2025-10-12
updatedAt: 2026-09-15
sortNumber: 501
path: "/documents/ghostphp/v4.0/501_service_template"
---

<nuxt-content-wrapper>

GhostPHPでは、アプリケーションの関心事を明確に分離する設計が採用されている。
v4.0では **コントローラー** が新設され、**テンプレート** の描画責務は Service から Controller に移った。

> v2.x系では「Serviceがテンプレートを描画する」構成だったが、v4.0では **画面描画（Template::render()）はController側の責務**であり、Serviceはビジネスロジックの実行結果（bool / array / Entity 等）を返すだけになっている。`Service` クラスには（v2.x系にあった）`render()` ヘルパーメソッドは存在しない。

## 1. 概要

- **コントローラー（Controller クラス）**
  HTTPリクエストを受け取り、CSRF検証を行い、Serviceを呼び出して結果を受け取る。結果に応じて `Template` を描画するか `Redirect` する。

- **サービス（Service クラス）**
  ビジネスロジックを担当し、データ操作や検証、リポジトリとのやり取りを行う。**画面表示には関与しない。**

- **テンプレート（Template クラス）**
  PHPテンプレートファイルをレンダリングして画面表示するための基底クラス。
  コントローラーから渡されたデータを変数として展開し、HTMLを出力する。

**関係性のポイント**：

1. コントローラーがサービスを呼び出してビジネスロジックを実行
2. サービスは必要なデータを作成・加工して返す（Entity・配列・真偽値など）
3. コントローラーが `Template` クラスにデータを渡し、画面に表示する

## 2. 処理フロー例（概略）
- クライアントのリクエストがルーターで解決され、コントローラーへ
- （ルーターがコントローラー・依存・FormRequestをDIで解決し、検証を実行）
- コントローラーがサービスを呼び出して処理
- サービスが必要に応じてリポジトリにアクセス
- サービスで整形したデータをコントローラーに返す
- コントローラーは Template クラスにデータを渡し、HTMLとしてレンダリング
- レンダリングされた画面がクライアントに返される

## 3. サービスとテンプレートの具体例

### サービス側（データの整形のみ。描画はしない）
```php
class PostService extends Service {
    public function __construct(
        private Logger $logger,
        private PostRepository $postRepository,
        private UserRepository $userRepository,
        private Session $session
    ) {
        parent::__construct();
    }

    // サインイン判定はController側で済ませてから呼ぶ。投稿が0件なら空配列を返す
    public function index(): array {
        return $this->postRepository->show();
    }
}
```

### コントローラーでの呼び出しとテンプレート描画
```php
class PostController extends Controller {
    private PostService $post_service;
    private UserService $home_service;

    public function __construct(PostService $postService, UserService $UserService) {
        parent::__construct();
        $this->post_service = $postService;
        $this->home_service = $UserService;
    }

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
}
```

この例では、サービスがデータを整形し、コントローラーがテンプレートに渡して表示する流れが明確に分離されている。
これにより、ビジネスロジックと画面表示の責務が独立し、コードの保守性や再利用性が高まる。

</nuxt-content-wrapper>
