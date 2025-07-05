<script setup lang="ts">
</script>

<template>
  <section class="project-page">
    <div class="container">
      <h1 class="text-center">Ghost PHP</h1>
      <div class="flex">
        <img
          class="logo-img"
          src="/assets/images/projects/ghostphp/microma.png"
        />
      </div>
      <section class="project-section">
        <h2>セットアップ</h2>
        <ul class="features">
          <li>プロジェクトをクローンしてください。<br>
            <pre><code>git clone https://github.com/sh-kikuchi/Ghost-PHP.git</code></pre>
          </li>
          <li>以下のコマンドで依存パッケージをインストールします。<br>
            <pre><code>composer install</code></pre>
          </li>
          <li>データベース接続をする。プロジェクトディレクトリに `.env` ファイルを作成し、次のように設定してください。
            <pre><code>DB_HOST = 'localhost' <br>DB_NAME = 'test'<br>DB_USER = 'root'<br>DB_PASS = ''<br>PASSWORD = 'password'</code></pre>
          </li>
        </ul>
        <li>テーブルを作成するには、以下のコマンドを実行します。<br>
          <pre><code>php ghost migrate</code></pre>
        </li>
        <li>データを挿入するには、次のコマンドを実行します。<br>
          <pre><code>php ghost seed</code></pre>
        </li>
      </section>
      <section class="project-section">
        <h2>CSVによるデータのインポートとエクスポート</h2>
        <ul class="features">
          <li>データのインポート<br>
            <p>例えば、`users.csv` というファイルを Storage/csv ディレクトリに作成し、最初の行にカラム名を記載します。次に、以下のコマンドでデータをインポートします。</p>
      <pre><code>php ghost importCSV users</code></pre>
          </li>
          <li>以下のコマンドで依存パッケージをインストールします。<br>
            <pre><code>composer install</code></pre>
          </li>
          <li>データのエクスポート<br>
            <p>データをエクスポートするには、次のコマンドを実行します。</p>
            <pre><code>php ghost exportCSV posts</code></pre>
          </li>
        </ul>
      </section>
      <section class="project-section">
        <h2>アーキテクチャ</h2>
        <p>このフレームワークは3層アーキテクチャに基づいています。</p>
        <ul>
            <li><strong>レポジトリ</strong>：データベース操作を担当</li>
            <li><strong>サービス</strong>：ビジネスロジックを処理し、モデルとビューの仲介をする</li>
            <li><strong>ビュー</strong>：ユーザーインターフェースを管理</li>
        </ul>
        <p>この設計により、コードの可読性と保守性が向上し、各層は独立して開発、テスト、変更することができます。</p>
      </section>
      <section class="project-section">
        <h2>ディレクトリ構成</h2>
            <pre><code>
              ├─aura
              │  ├─database       // データベース接続
              │  ├─https          // リクエストとレスポンス管理
              │  ├─routes         // ルーティング管理
              │  └─toolbox
              │      ├─commands    // コマンド処理
              │      └─functions   // ビュー用関数
              ├─config             // 設定
              ├─form_classes       // フォームデータ管理クラス
              ├─interfaces         // インターフェース
              ├─logs               // ログ
              ├─migrations         // マイグレーション（テーブル）
              │  ├─csv            // CSVインポート/エクスポート
              │  ├─migrate        // テーブル作成
              │  └─seed           // データ挿入
              ├─models             // モデルクラス
              ├─public             // 公開資産（JS, CSS, 画像）
              ├─services           // サービスクラス
              ├─storage            // ストレージ
              └─templates          // テンプレートファイル
                  ├─errors         // エラーページ
                  └─layouts        // ヘッダー、フッター
            </code></pre>
      </section>
      <section class="project-section">
        <h2>依存関係</h2>
        <ul>
            <li><strong>guzzlehttp/guzzle</strong>：HTTPリクエストを簡略化するためのPHPライブラリ</li>
            <li><strong>vlucas/phpdotenv</strong>：環境変数をロードするためのPHPライブラリ</li>
            <li><strong>phpunit/phpunit</strong>：PHPテストフレームワーク</li>
        </ul>
      </section>
      <section class="project-section">
        <h2>テスト</h2>
        <p>テストはPHPUnitを使用して実行できます。以下はテスト実行の例です。</p>
        <pre><code>vendor/bin/phpunit tests\form_classes\PostRequestTest.php</code></pre>
      </section>
      <section class="project-section">
        <h2>開発ドキュメント</h2>
        <div class="features">
          <h4>概観</h4>
          <ul>
            <li><NuxtLink :to="'/documents/ghostphp/000_readme'" class="nuxt-link">Readme</NuxtLink></li>
          </ul>

          <h4>基底クラス</h4>
          <ul>
            <li><NuxtLink :to="'/documents/ghostphp/101_routing'" class="nuxt-link">ルーティングクラス</NuxtLink></li>
            <li><NuxtLink :to="'/documents/ghostphp/102_service'" class="nuxt-link">サービスクラス</NuxtLink></li>
            <li><NuxtLink :to="'/documents/ghostphp/103_repository'" class="nuxt-link">リポジトリクラス</NuxtLink></li>
            <li><NuxtLink :to="'/documents/ghostphp/104_template'" class="nuxt-link">テンプレートクラス</NuxtLink></li>
          </ul>

          <h4>Fields</h4>
          <ul>
            <li><NuxtLink :to="'/documents/ghostphp/201_mail'" class="nuxt-link">メールクラス</NuxtLink></li>
            <li><NuxtLink :to="'/documents/ghostphp/202_file'" class="nuxt-link">ファイルクラス</NuxtLink></li>
            <li><NuxtLink :to="'/documents/ghostphp/203_session'" class="nuxt-link">セッションクラス</NuxtLink></li>
            <li><NuxtLink :to="'/documents/ghostphp/204_logger'" class="nuxt-link">ロガークラス</NuxtLink></li>
            <li><NuxtLink :to="'/documents/ghostphp/205_validation'" class="nuxt-link">バリデーションクラス</NuxtLink></li>
          </ul>
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
  font-family: 'Segoe UI', sans-serif;
  background: #fff;
  color: #333;
}
.project-title {
  font-size: 2.2rem;
  margin-bottom: 0.25rem;
}
.logo-img{
  display: block;
  width: 280px;
  height: auto;
  margin: 5px;
}
.flex{
  display: flex;
  justify-content: center;
}
.contain
.project-subtitle {
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
.project-chips{
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
  font-family: 'Courier New', monospace;
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
