# Vite+ 移行手順

Nuxt 4 + yarn + Netlify のこのリポジトリに [Vite+](https://viteplus.dev/guide) (`vite-plus@1.4.0`) を入れた手順。

- `nuxt dev` / `nuxt generate` はそのまま。Nuxt の中の Vite が Vite+ 版に差し替わり、format / lint / 型チェックが `vp check` にまとまる
- テストは無し (移行前に削除済み)

---

## 1. 前提をそろえる

Vite+ 1.4 は Vite 8。Nuxt 4.6 以上と Node 22.22.3+ / 24.15+ が必要。

```bash
yarn add nuxt@^4.6.2
npx nuxi upgrade --force
```

**`vp migrate` の前に yarn のバージョンを固定する。** 固定しないと Vite+ が勝手に Yarn 4 を使い、yarn.lock が Yarn 4 形式になる。

```bash
git rm package-lock.json                   # ロックファイルは yarn.lock だけにする
npm pkg set packageManager=yarn@4.18.1
```

`yarn` コマンド (PC に入っている 1.3.2) は `packageManager` を見ないので、**`corepack yarn` で呼ぶ**。

```bash
corepack yarn install
```

---

## 2. `vp migrate`

dev サーバーは止めておく。

```bash
npx --package=vite-plus@1.4.0 vp migrate --no-agent --no-editor --no-hooks
corepack yarn install
```

- `package.json` に `vite-plus` と、`vite` を Vite+ 版に差し替える `resolutions` が入る
- `vite.config.ts` ができる (`vp` の lint / fmt 設定用。Nuxt は読まない)

Yarn 4 は peer dependency に厳密なので、Nuxt が使う `rolldown` を入れる。

```bash
corepack yarn add -D rolldown@1.2.15
```

---

## 3. format / lint / 型チェック

`content/` はフォーマット対象から外す (コードブロック内のサンプルコードまで書き換わるため)。

```ts
// vite.config.ts
fmt: {
  ignorePatterns: ["content/**"],
},
```

```bash
./node_modules/.bin/vp check --fix     # format と自動修正
./node_modules/.bin/vp check           # 残りの指摘を確認して手で直す
```

`vp` は `npx vp` では呼べない。`./node_modules/.bin/vp` で呼ぶ。

---

## 4. 動作確認

```bash
node -p "require('./node_modules/vite/package.json').name"   # @voidzero-dev/vite-plus-core
npx nuxt generate                                            # 166 ルート
npm run dev                                                  # 表示・記事編集の反映
```

---

## 5. Netlify

- `.node-version` (中身 `24`) をリポジトリに置いた
- ビルドコマンドは `nuxt generate` のまま
- デプロイプレビューで、ビルドログに yarn `4.18.1` が使われているか確認する

---

## 日常のコマンド

| やること                  | コマンド                                            |
| ------------------------- | --------------------------------------------------- |
| 開発サーバー              | `npm run dev`                                       |
| ビルド                    | `npm run generate`                                  |
| コミット前チェック        | `./node_modules/.bin/vp check --fix`                |
| 依存の追加 / インストール | `corepack yarn add <pkg>` / `corepack yarn install` |

---

## ハマったところ

| 症状                                                 | 対処                                                     |
| ---------------------------------------------------- | -------------------------------------------------------- |
| `yarn install` が `Unknown token ... in yarn.lock`   | yarn.lock が Yarn 4 形式。`corepack yarn install` を使う |
| `npx vp is not the correct way to use the Vite+ CLI` | `./node_modules/.bin/vp` で呼ぶ                          |
| インストール時に `EPERM ... esbuild.exe`             | dev サーバーを止めてから実行                             |
| `Cannot find package 'rolldown'`                     | `corepack yarn add -D rolldown@1.2.15`                   |
| フォーマットでドキュメントのサンプルコードが変わる   | `fmt.ignorePatterns` に `content/**`                     |

---

## 備考
- 毎回 `corepack yarn` と打ちたくない場合: 古い Yarn (1.3.2) をアンインストールして、管理者権限で `corepack enable`

---

## 付録: pinia の更新

`@pinia-plugin-persistedstate/nuxt` は廃止され、`pinia-plugin-persistedstate` 本体に Nuxt モジュールが入った。

```bash
corepack yarn remove @pinia-plugin-persistedstate/nuxt
corepack yarn add @pinia/nuxt@^1.0.3 pinia@^4.1.0 pinia-plugin-persistedstate@^4.7.1 @vue/devtools-api@^8.2.1
```

```ts
// nuxt.config.ts
modules: ["@pinia/nuxt", "pinia-plugin-persistedstate/nuxt"],

// store/labels.ts
persist: {
  storage: piniaPluginPersistedstate.localStorage(),   // 旧: persistedState.localStorage
},
```

- `@vue/devtools-api` は pinia 4 の必須 peer dependency
- 保存キーは v3 と同じストア ID (`labels`) なので、ブラウザに保存済みのデータはそのまま使える
- Nuxt 版の既定の保存先は cookie なので、`localStorage()` の指定は必須
