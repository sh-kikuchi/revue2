<script setup lang="ts"></script>

<template>
  <section class="project-page">
    <div class="container">
      <h1 class="text-center">Ghost PHP</h1>
      <div class="flex">
        <img class="logo-img" src="/assets/images/projects/ghostphp/microma.png" />
      </div>
      <section class="project-section">
        <h2>セットアップ</h2>
        <p>PHP 8.4 以上と Composer が必要です。</p>
        <ul class="features">
          <li>
            プロジェクトをクローンしてください。<br />
            <pre><code>git clone https://github.com/sh-kikuchi/GhostPHP.git
cd GhostPHP</code></pre>
          </li>
          <li>
            以下のコマンドで依存パッケージをインストールします。<br />
            <pre><code>composer install</code></pre>
          </li>
          <li>
            プロジェクトルートに `.env`
            ファイルを作成し、データベース接続情報を設定してください（`.env.dev`
            のキーを参考にしてください）。
            <pre><code>DB_HOST = 'localhost'
DB_NAME = 'test'
DB_USER = 'root'
DB_PASS = ''</code></pre>
            <p>
              メール送信を使う場合は `SMTP_*` / `MAIL_FROM`、ファイルアップロードの許可拡張子は
              `ALLOWED_EXTENSIONS` も設定します。
            </p>
          </li>
          <li>
            テーブルを作成するには、以下のコマンドを実行します。<br />
            <pre><code>php ghost migrate</code></pre>
          </li>
          <li>
            データを挿入するには、次のコマンドを実行します。<br />
            <pre><code>php ghost seed</code></pre>
          </li>
        </ul>
      </section>
      <section class="project-section">
        <h2>CSVによるデータのインポートとエクスポート</h2>
        <ul class="features">
          <li>
            データのインポート<br />
            <p>
              例えば、`users.csv` というファイルを `storage/csv`
              ディレクトリに作成し、最初の行にカラム名を記載します。次に、以下のコマンドでデータをインポートします。
            </p>
            <pre><code>php ghost importCSV users</code></pre>
            <p>
              ※
              値をバインドせずにSQLを組み立てるため、信頼できないCSVの取り込みには使わないでください（開発用のダミーデータ投入向け）。
            </p>
          </li>
          <li>
            データのエクスポート<br />
            <p>
              データをエクスポートするには、次のコマンドを実行します（`storage/csv/posts.csv`
              に出力されます）。
            </p>
            <pre><code>php ghost exportCSV posts</code></pre>
          </li>
        </ul>
      </section>
      <section class="project-section">
        <h2>アーキテクチャ</h2>
        <p>このフレームワークは4層アーキテクチャに基づいています。</p>
        <ul>
          <li>
            <strong>コントローラー</strong
            >：HTTPリクエストを受け取りサービスを呼び出す。ビジネスロジックは持たず、各層の橋渡しとCSRF検証のみを担当（v4.0で新設）
          </li>
          <li>
            <strong>サービス</strong
            >：ユースケース単位のビジネスロジックを実装し、リポジトリを通じてデータを取得・保存する
          </li>
          <li>
            <strong>モデル</strong>：データベース処理を担当（Entity：テーブルを表すデータ構造 /
            Repository：CRUD操作をカプセル化）
          </li>
          <li>
            <strong>ビュー</strong>：ユーザーインターフェースを担当し、`Template`
            クラスで動的に描画する
          </li>
        </ul>
        <p>
          ルーティング層でのコンストラクタインジェクション（DI）自動解決や、`FormRequest`
          による自動バリデーションにも対応しています。各層を独立して開発・テスト・保守できるため、コードの可読性・再利用性・保守性が向上します。
        </p>
      </section>
      <section class="project-section">
        <h2>ディレクトリ構成</h2>
        <pre><code>├─aura
│  ├─database       // DB接続関連
│  ├─https          // リクエスト・レスポンス管理（HttpRequest / Request / Response / Redirect / Validator）
│  ├─routes         // ルーティング定義（DI解決・自動バリデーション）
│  └─utils
│      ├─commands    // CLIコマンド処理（Migrate / Seed / ImportCSV / ExportCSV）
│      └─functions   // View補助関数（h() / route() / paginate() / date系）
├─config             // 設定ファイル（Message / LABEL）
├─controllers        // コントローラー層
├─requests           // FormRequestクラス（旧 form_classes）
├─interfaces
│  └─repositories    // リポジトリ用インターフェース
├─entities           // Entityクラス（旧 models/entities）
├─repositories       // Repositoryクラス（旧 models/repositories）
├─services           // サービス層
├─logs               // ログ出力
├─migrations         // マイグレーション関連
│  ├─migrate
│  └─seed
├─public             // 公開アセット
│  └─assets
│      ├─css
│      ├─img
│      └─js
├─storage            // アップロードファイル・CSVなど
│  └─csv
└─templates          // テンプレート
    ├─errors         // エラーページ
    ├─layouts        // レイアウト（ヘッダー・フッター）
    ├─post
    └─user
</code></pre>
      </section>
      <section class="project-section">
        <h2>依存関係</h2>
        <ul>
          <li><strong>vlucas/phpdotenv</strong>：`.env` の読み込み</li>
          <li><strong>phpmailer/phpmailer</strong>：SMTP経由のメール送信</li>
          <li><strong>guzzlehttp/guzzle</strong>：シーダー等での外部API呼び出し</li>
          <li><strong>tecnickcom/tcpdf</strong>：PDF生成</li>
        </ul>
        <p>
          開発用：<strong>phpunit/phpunit</strong>（テスト）、<strong>phpstan/phpstan</strong>（静的解析）
        </p>
      </section>
      <section class="project-section">
        <h2>テスト</h2>
        <p>テストはPHPUnitを使用して実行できます。</p>
        <pre><code>vendor/bin/phpunit</code></pre>
      </section>
      <section class="project-section">
        <h2>開発ドキュメント</h2>
        <div class="features">
          <h4>はじめに</h4>
          <ul>
            <li>
              <nuxt-link :to="'/documents/ghostphp/000_whats_new_v4'"
                >v4.0での変更点まとめ</nuxt-link
              >
            </li>
            <li>
              <nuxt-link :to="'/documents/ghostphp/700_getting_started'">Getting Started</nuxt-link>
            </li>
          </ul>

          <h4>基本設計・要件</h4>
          <ul>
            <li>
              <nuxt-link :to="'/documents/ghostphp/101_framework_requirements'"
                >フレームワークの要件</nuxt-link
              >
            </li>
            <li>
              <nuxt-link :to="'/documents/ghostphp/102_framework_flow'"
                >フレームワークの処理の流れ</nuxt-link
              >
            </li>
          </ul>

          <h4>アプリケーション基盤</h4>
          <ul>
            <li>
              <nuxt-link :to="'/documents/ghostphp/201_app_boot_structure'"
                >アプリ起動構成</nuxt-link
              >
            </li>
            <li>
              <nuxt-link :to="'/documents/ghostphp/202_class_autoload'"
                >クラスのオートロード</nuxt-link
              >
            </li>
            <li><nuxt-link :to="'/documents/ghostphp/203_bootstrap'">Bootstrap</nuxt-link></li>
          </ul>

          <h4>リクエストとルーティング</h4>
          <ul>
            <li>
              <nuxt-link :to="'/documents/ghostphp/301_httprequest_class'"
                >HttpRequestクラス</nuxt-link
              >
            </li>
            <li>
              <nuxt-link :to="'/documents/ghostphp/302_response_class'">Responseクラス</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="'/documents/ghostphp/303_redirect_class'">Redirectクラス</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="'/documents/ghostphp/304_router_class'">Routerクラス</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="'/documents/ghostphp/305_controller_class'"
                >Controllerクラス</nuxt-link
              >
            </li>
            <li>
              <nuxt-link :to="'/documents/ghostphp/306_request_validation'"
                >FormRequestとバリデーション</nuxt-link
              >
            </li>
          </ul>

          <h4>データベースとセッション管理</h4>
          <ul>
            <li>
              <nuxt-link :to="'/documents/ghostphp/401_database_connect'"
                >DataBaseConnectクラス</nuxt-link
              >
            </li>
            <li>
              <nuxt-link :to="'/documents/ghostphp/402_repository_class'"
                >Repositoryクラス</nuxt-link
              >
            </li>
          </ul>

          <h4>サービスとテンプレート</h4>
          <ul>
            <li>
              <nuxt-link :to="'/documents/ghostphp/501_service_template'"
                >サービスとテンプレートの関係</nuxt-link
              >
            </li>
            <li>
              <nuxt-link :to="'/documents/ghostphp/502_service_class'">Serviceクラス</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="'/documents/ghostphp/503_template_class'">Templateクラス</nuxt-link>
            </li>
          </ul>

          <h4>ユーティリティ</h4>
          <ul>
            <li><nuxt-link :to="'/documents/ghostphp/601_file_class'">Fileクラス</nuxt-link></li>
            <li><nuxt-link :to="'/documents/ghostphp/602_mail_class'">Mailクラス</nuxt-link></li>
            <li>
              <nuxt-link :to="'/documents/ghostphp/603_session_class'">Sessionクラス</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="'/documents/ghostphp/604_validator_class'">Validatorクラス</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="'/documents/ghostphp/605_logger_class'">Loggerクラス</nuxt-link>
            </li>
            <li><nuxt-link :to="'/documents/ghostphp/606_cli_commands'">CLIコマンド</nuxt-link></li>
          </ul>
        </div>
      </section>
      <section class="project-section">
        <h2>🔗 リンク</h2>
        <div class="links">
          <a href="https://github.com/sh-kikuchi/ghostphp" target="_blank">GitHub</a>
        </div>
      </section>
    </div>
  </section>
</template>
<style scoped>
.project-page {
  max-width: 860px;
  margin: 1rem auto;
  padding: 1rem;
  font-family: "Segoe UI", sans-serif;
  background: #fff;
  color: #333;
}
.project-title {
  font-size: 2.2rem;
  margin-bottom: 0.25rem;
}
.logo-img {
  display: block;
  width: 280px;
  height: auto;
  margin: 5px;
}
.flex {
  display: flex;
  justify-content: center;
}
.contain .project-subtitle {
  font-size: 1.1rem;
  color: #777;
  margin-bottom: 1.5rem;
}
.project-image {
  display: block;
  width: 50%;
  margin: 0 auto;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}
.project-chips {
  display: flex;
}

.project-section {
  margin-bottom: 2rem;
}
.features {
  padding-left: 1.25rem;
}
.links a {
  display: inline-block;
  margin-right: 1rem;
  color: #42b983;
  font-weight: bold;
  text-decoration: none;
}
.links a:hover {
  text-decoration: underline;
}
code {
  display: block;
  white-space: pre-wrap; /* 長いコードを折り返す */
  margin: 0;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
  font-family: "Courier New", monospace;
  font-size: 1rem;
  line-height: 1.6;
  overflow-x: auto;
}

pre {
  margin: 1rem 0;
  padding: 0;
  background-color: #f5f5f5;
  border-radius: 5px;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-x: auto;
}
</style>
