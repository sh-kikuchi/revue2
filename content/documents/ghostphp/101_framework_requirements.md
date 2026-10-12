---
title: GhostPHP フレームワークの要件
category: php
createdAt: 2025-10-12
updatedAt: 2026-09-15
sortNumber: 101
path: "/documents/ghostphp/101_framework_requirements"
---

<nuxt-content-wrapper>

> v4.0での変更点は [000_whats_new_v4.md](000_whats_new_v4.md) を参照。

## 1. 概要（Overview）

**GhostPHP** は、PHPで構築された軽量なMVCフレームワークである。  
ルーティング、コントローラー、サービス、リポジトリといったレイヤーを明確に分離し、
**関心の分離（Separation of Concerns）** と **保守性の向上** を目的として設計されている。

Readme では「Thin Framework」を志向すると明言されており、すべてを内包するのではなく、
強いレイヤー分離と拡張前提の最小限の基盤を提供することを目的としている。

## 2. 目的（Purpose）

- **シンプルで理解しやすい構造**
  複雑な設定を排除し、直感的に扱える構成を採用。

- **小規模〜中規模のWebアプリケーション開発に最適化**
  必要十分な機能のみを備え、軽快な実行環境を提供。

- **ルーティングからDBアクセスまでを直感的でシンプルな仕組みで実現**
  フレームワーク全体を通して、一貫した操作性を維持。

## 3. 特徴（Features）

- 明確なレイヤー分離（Controller + Service + Repository + Entity）
- ルーティング層でのコンストラクタインジェクション（DI）自動解決
- `FormRequest` パターンによるリクエストの自動バリデーション（[306_request_validation.md](306_request_validation.md)）
- トランザクション管理およびCSRF保護を標準サポート
- PDOによる安全なデータベース操作
- CLI（`php ghost ...`）によるマイグレーション・シーディング・CSV入出力をサポート
- SMTP経由のメール送信（PHPMailer）

## 4. 動作要件（Requirements）

`composer.json` より、以下が必須。

- PHP `^8.4`
- Composer（依存パッケージの解決とPSR-4オートロードに必須）

### 主要な依存パッケージ

| パッケージ | 用途 |
|---|---|
| `vlucas/phpdotenv` `^5.6` | `.env` の読み込み |
| `phpmailer/phpmailer` `^7.0` | SMTP経由のメール送信（[602_mail_class.md](602_mail_class.md)） |
| `guzzlehttp/guzzle` `^7.8` | シーダー等での外部API呼び出し |
| `tecnickcom/tcpdf` `^6.6` | PDF生成 |

開発用依存（`require-dev`）:

- `phpunit/phpunit` `^10.5`
- `phpstan/phpstan` `2.2.5`

> 旧ドキュメントには「Composer不要でセットアップが容易」と記載されていたが、v4.0では
> PHPMailer / Guzzle / TCPDF / phpdotenv を利用するため **Composerが必須** である。

## 5. アーキテクチャ（Architecture）

### 4層構造 / 4-Layer Architecture

GhostPHPは以下の構造に基づいて設計されている。

- **Controller（コントローラー）**
  HTTPリクエストを受け取り、Serviceを呼び出す。ビジネスロジックは持たず、各レイヤーの橋渡しとCSRF検証のみを担当する。（v4.0で新設。[305_controller_class.md](305_controller_class.md)）

- **Service（サービス）**
  ユースケース単位のビジネスロジックを実装し、Repositoryを通じてデータを取得・保存する。

- **Model（モデル）**
  データベース処理を担当する。
  - *Entity*: テーブルを表すデータ構造クラス
  - *Repository*: CRUD操作をカプセル化

- **View（ビュー）**
  ユーザーインターフェースを担当し、`Template` クラスを通じて動的に描画を行う。

> 各レイヤーを独立して開発・テスト・保守できるよう設計することで、
> コードの可読性・再利用性・保守性を高めている。

また、RepositoryにInterfaceを設けることで（`interfaces/repositories/`）、型安全でクリーンなアーキテクチャを実現している。

## 6. ディレクトリ構成（Directory Structure）

```txt
├─aura
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
├─repositories        // Repositoryクラス（旧 models/repositories）
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
```

</nuxt-content-wrapper>
