---
title: GhostPHP フレームワークの要件
category: php
createdAt: 2025-10-12
updatedAt: 2025-10-12
path: "/documents/ghostphp/101_framework_requirements"
---

<nuxt-content-wrapper>

## 1. 概要（Overview）

**GhostPHP** は、PHPで構築された軽量なMVCフレームワークである。  
ルーティング、コントローラー、サービス、リポジトリといったレイヤーを明確に分離し、  
**関心の分離（Separation of Concerns）** と **保守性の向上** を目的として設計されている。



## 2. 目的（Purpose）

- **シンプルで理解しやすい構造**  
  複雑な設定を排除し、直感的に扱える構成を採用。

- **小規模〜中規模のWebアプリケーション開発に最適化**  
  必要十分な機能のみを備え、軽快な実行環境を提供。

- **ルーティングからDBアクセスまでを直感的でシンプルな仕組みで実現**  
  フレームワーク全体を通して、一貫した操作性を維持。



## 3. 特徴（Features）

- 明確なレイヤー分離（View + Service + Repository）  
- トランザクション管理およびCSRF保護を標準サポート  
- Composer不要でセットアップが容易  
- PDOによる安全なデータベース操作  
- CLIコマンドによるマイグレーション・シーディングをサポート  



## 4. アーキテクチャ（Architecture）

### 三層構造 / 3-Tier Architecture

GhostPHPは以下の3層構造に基づいて設計されている。

- **Model（モデル）**  
  データベース処理およびビジネスロジックを担当する。  
  - *Entity*: テーブルを表すクラス  
  - *Repository*: CRUD操作をカプセル化  

- **Service（サービス）**  
  ModelとViewの橋渡しを行うビジネスロジック層。

- **View（ビュー）**  
  ユーザーインターフェースを担当し、テンプレートを通じて動的に描画を行う。

> 各レイヤーを独立して開発・テスト・保守できるよう設計することで、  
> コードの可読性・再利用性・保守性を高めている。

また、ModelやServiceにインターフェースを設けることで、  
型安全でクリーンなアーキテクチャを実現している。



## 5. ディレクトリ構成（Directory Structure）

```html
├─aura
│  ├─database       // DB接続関連
│  ├─https          // リクエスト・レスポンス管理
│  ├─routes         // ルーティング定義
│  └─utils
│      ├─commands    // CLIコマンド処理
│      └─functions   // View補助関数
├─config             // 設定ファイル
├─form_classes       // フォームデータ管理クラス
├─interfaces         // 各種インターフェース
│  ├─form_classes
│  ├─models
│  └─services
├─logs               // ログ出力
├─migrations         // マイグレーション関連
│  ├─csv
│  ├─migrate
│  └─seed
├─models             // モデル層
│  ├─entities
│  └─repositories
├─public             // 公開アセット
│  └─assets
│      ├─css
│      ├─img
│      └─js
├─services           // サービス層
├─storage            // 一時ファイルなど
│  ├─csv
│  └─doc
└─templates          // テンプレート
    ├─errors         // エラーページ
    └─layouts        // レイアウト（ヘッダー・フッター）
