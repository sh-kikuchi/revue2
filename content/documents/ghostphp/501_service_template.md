---
title: サービスとテンプレートの関係
category: php
createdAt: 2025-10-12
updatedAt: 2025-10-12
sortNumber: 501
path: "/documents/ghostphp/501_service_template"
---

<nuxt-content-wrapper>

GhostPHPでは、アプリケーションの関心事を明確に分離する設計が採用されている。  
特に **サービス** と **テンプレート** は、アプリケーションのビジネスロジックと画面表示を切り離す重要な役割を担う。

## 1. 概要

- **サービス（Service クラス）**  
  ビジネスロジックを担当し、データ操作や検証、リポジトリとのやり取りを行う。  
  コントローラーから呼び出され、アプリケーションの「処理部分」を実装する。

- **テンプレート（Template クラス）**  
  PHPテンプレートファイルをレンダリングして画面表示するための基底クラス。  
  サービスやコントローラーから渡されたデータを変数として展開し、HTMLを出力する。

**関係性のポイント**：

1. コントローラーがサービスを呼び出してビジネスロジックを実行  
2. サービスは必要なデータを作成・加工  
3. サービスやコントローラーは Template クラスを使用してデータを画面に表示  

## 2. 処理フロー例（概略）
- クライアントのリクエストがルーターで解決され、コントローラーへ
- コントローラーがサービスを呼び出して処理
- サービスが必要に応じてリポジトリにアクセス
- サービスで整形したデータをコントローラーに返す
- コントローラーは Template クラスにデータを渡し、HTMLとしてレンダリング
- レンダリングされた画面がクライアントに返される

## 3. サービスとテンプレートの具体例

### サービス側
```php
class PostService extends Service {
    public function getPostsForPage(int $page, int $perPage) {
        $all_posts = (new PostRepository())->all();
        $offset = ($page - 1) * $perPage;
        $data = array_slice($all_posts, $offset, $perPage);

        return [
            'data' => $data,
            'max_page' => ceil(count($all_posts)/$perPage)
        ];
    }
}
```

### コントローラーでの呼び出し
```php
class PostController extends Controller {
    public function index() {
        $service = new PostService();
        $pagination = $service->getPostsForPage($_GET['page_id'] ?? 1, 10);

        $template = new Template('post/index', [
            'posts' => $pagination['data'],
            'max_page' => $pagination['max_page']
        ]);

        return $template->render();
    }
}
```

この例では、サービスがデータを整形し、テンプレートに渡して表示する流れが明確に分離されている。  
これにより、ビジネスロジックと画面表示の責務が独立し、コードの保守性や再利用性が高まる。

</nuxt-content-wrapper>
