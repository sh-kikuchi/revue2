# Nuxt Content → Ox Content 移行ガイド

自分で一から Nuxt Content を Ox Content に置き換えるときの手順書。
このリポジトリで実際に移行したときの判断と、ハマった点をそのまま残している。

- 対象: Nuxt 4 / Vite 7 / Nuxt Content v3 / Netlify (yarn, `nuxt generate`)
- Ox Content: `@ox-content/napi` 3.4.0 (Rust 製の Markdown パーサーの Node バインディング)
- 所要時間の目安: **半日 (3〜4 時間)**。記事内に Vue コンポーネントが多いほど増える

> **移行後の変更 (2026-10-24)**: 移行のあと、ブログ記事 (`content/articles/`)・下書き (`content/manuscripts/`)・Techs ページ (`pages/techs/`)・一覧 API (`server/api/content/list.get.ts`) を削除し、`content/` は `documents/` だけになった。
> 以下の手順や件数 (226 ファイル、目次リンク 633 件など) は削除前の状態で書いている。消したファイルは git 履歴から復元できる。

---

## 0. 全体像

Ox Content には Nuxt Content のような「入れれば動く Nuxt モジュール」がない。
なので **Markdown → HTML 変換だけを Ox Content に任せ、それ以外 (データの持ち方・API・描画) は自分で書く**。

```
content/**/*.md
   │  ビルド時 (modules/ox-content.ts)
   │    @ox-content/napi で HTML 化 → 見出し id 振り直し → コンポーネント位置で分割
   ▼
#ox-content (Nitro の仮想モジュール。全記事の配列)
   │
   ├─ server/api/content/page.get.ts   … path で 1 件
   └─ server/api/content/list.get.ts   … prefix 配下の一覧 (本文なし)
   ▼
pages/[...slug].vue, pages/techs/[...lang].vue (useFetch で取得して描画)
```

| 作るもの                            | 役割                               | Nuxt Content でいうと   |
| ----------------------------------- | ---------------------------------- | ----------------------- |
| `modules/ox-content.ts`             | 変換・埋め込み・dev 時の再読み込み | モジュール本体 + SQLite |
| `server/api/content/*.get.ts`       | 記事の取得 API                     | `queryCollection()`     |
| ページ側の描画                      | `v-html` + 動的コンポーネント      | `<ContentRenderer>`     |
| `assets/css/ox-content-dracula.css` | コードの配色                       | `highlight.theme`       |
| `server/tsconfig.json`              | `#ox-content` の型解決             | (不要だった)            |

---

## 1. 棚卸し (30 分) — ここで工数がほぼ決まる

移行前に「Nuxt Content の何に依存しているか」を洗い出す。

### 1-1. コード側の利用箇所

```bash
grep -rnE "queryCollection|queryContent|ContentRenderer|ContentDoc|ContentList|ContentNavigation|searchContent" \
  --include=*.vue --include=*.ts . --exclude-dir=node_modules --exclude-dir=.nuxt
```

このリポジトリでは `pages/[...slug].vue` と `pages/techs/[...lang].vue` の 2 か所だけだった。
ナビゲーション生成・全文検索・`where` の複雑な条件などを使っていると、その分を自作する必要がある。

### 1-2. Markdown の中身

**一番の落とし穴。** Nuxt Content は Markdown 中の Vue コンポーネント (MDC 記法や `<my-component>` タグ) を描画してくれるが、Ox Content の出力はただの HTML なので **`v-html` すると動かない**。

```bash
# MDC のブロックコンポーネント (::foo)
grep -rhoE '^::[a-zA-Z-]+' content | sort | uniq -c
# ケバブケースのカスタムタグ (<foo-bar>)
grep -rhoE '<[a-z]+-[a-z-]+' content | sort | uniq -c
```

このリポジトリの結果:

```
    214 <nuxt-content-wrapper      ← 戻るボタン + 背景 + コード用 CSS を持つラッパー (170 記事)
     41 <revue-components          ← revuekitz のデモ表示
```

`components/global/` に同名の Vue コンポーネントがあるかも確認する。最初はこれを見落としていて、表示が崩れる寸前だった。

### 1-3. frontmatter と URL

- frontmatter の `path` と実ファイル名がずれていないか (重複していると片方に到達できない)
- 独自フィールド (`createdAt` / `updatedAt` / `sortNumber` など) をどこで使っているか

```bash
grep -rh "^path:" content --include=*.md | sort | uniq -d
```

---

## 2. スパイク (15 分) — 本当に変換できるか先に試す

プロジェクトを汚さないよう、別ディレクトリで全記事を変換してみる。

```bash
mkdir ~/ox-spike && cd ~/ox-spike && npm init -y && npm i @ox-content/napi
```

```js
// spike.mjs
import { transform, highlightHtmlCodeBlocks } from "@ox-content/napi";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const walk = (d) =>
  readdirSync(d).flatMap((f) => {
    const p = join(d, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
const files = walk(process.argv[2]).filter((f) => f.endsWith(".md"));
let errors = 0;
const t = performance.now();
for (const f of files) {
  const r = transform(readFileSync(f, "utf8"), { gfm: true });
  if (r.errors.length) {
    errors++;
    console.log(f, r.errors);
  }
}
console.log({ files: files.length, errors, ms: Math.round(performance.now() - t) });
```

```bash
node spike.mjs /path/to/revue2/content
# → { files: 226, errors: 0, ms: 206 }
```

`transform()` の戻り値で使うのは `html` / `frontmatter` (JSON 文字列) / `toc` / `errors`。

---

## 3. 方式を決める

| 方式                                                                      | 判断                                                                                                |
| ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `@ox-content/vite-plugin` (`.md` を import する公式プラグイン)            | peerDependencies が **Vite 8**。Nuxt 4.2 は Vite 7 なので不可。Nuxt を 4.6 以上に上げれば候補になる |
| `@ox-content/napi` を**実行時**に呼ぶ (API の中で変換)                    | Netlify の関数でネイティブバイナリと `content/` が必要になり、デプロイが壊れやすい                  |
| `@ox-content/napi` を**ビルド時**に呼び、結果をサーバーバンドルに埋め込む | **採用。** 実行時の依存がなく、`nuxt generate` でも SSR でも同じように動く                          |

---

## 4. 依存関係を入れ替える (10 分)

Netlify は `yarn.lock` を見るので yarn で更新する。

```bash
yarn remove @nuxt/content better-sqlite3
yarn add @ox-content/napi github-slugger
```

- `better-sqlite3` は Nuxt Content v3 のためだけに入っていたもの
- `package.json` の `resolutions` (`nuxt-component-meta` の回避策) も Nuxt Content 用なので消す
- `yarn.lock` から約 1,850 行が消える
- `@ox-content/napi` は OS ごとのバイナリを optionalDependencies で持つ。`yarn.lock` に `binding-linux-x64-gnu` が入っていれば Netlify (Linux) でも動く

`nuxt.config.ts` からは `'@nuxt/content'` と `content: { ... }` を丸ごと削除し、`content.config.ts` も消す。

---

## 5. ローカル Nuxt モジュールを書く (60 分)

`modules/` 直下のファイルは Nuxt が自動で登録するので、`nuxt.config.ts` に書かなくてよい。
完成形は [modules/ox-content.ts](../modules/ox-content.ts)。要点だけ書く。

### 5-1. 記事を読み込んで変換する

```ts
const result = transform(readFileSync(file, "utf8"), { gfm: true });
const { title, description, path, ...meta } = JSON.parse(result.frontmatter || "{}");
const html = highlightHtmlCodeBlocks(result.html).html; // コードハイライト
```

- `gfm: true` を付けないと表・取り消し線・タスクリストが効かない
- 除外したいフォルダ (下書きなど) はここで弾く
- URL は frontmatter の `path` を優先し、なければファイルパスから作る

### 5-2. ビルド時にサーバーへ埋め込む

```ts
addServerTemplate({
  filename: "#ox-content",
  getContents: () => `export default ${JSON.stringify(loadDocs(contentDir))}`,
});
```

これでサーバー側のコードから `import docs from '#ox-content'` と書ける。実体のファイルはなく、ビルドのたびに生成される仮想モジュール。

#### 補足: `#` の意味

`#` は「実ファイルではなく、ビルドツールが作る特別なモジュール」という目印。

- npm のパッケージ名は `#` で始められないので、`node_modules` のパッケージと取り違えられない
- 由来は Node.js 標準の package.json の `"imports"`。プロジェクト内だけで使える別名 (`"#utils/*": "./src/utils/*"` → `import x from '#utils/date.js'`) は `#` 始まりが必須と決まっている。`#` が無いと、自分で付けた別名と npm パッケージの区別がつかないため
- Nuxt / Nitro もこの慣習を借りている (`#imports` / `#app` / `#components` / `#build` も同じ)。`#ox-content` は Node.js の機能そのものではなく、Nuxt 流の名前付け
- Vite 界隈では `virtual:xxx` という書き方もある。どちらも慣習で、`#` でないと動かないわけではない

### 5-3. 型を付ける

```ts
addTypeTemplate(
  {
    filename: "types/ox-content.d.ts",
    getContents: () => `declare module '#ox-content' { ... }`,
  },
  { nitro: true },
); // ← nitro: true でサーバー側の型に入る
```

さらに **`server/tsconfig.json` を置かないと VS Code では解決されない** (ルートの tsconfig はアプリ側の設定なので)。

```json
{ "extends": "../.nuxt/tsconfig.server.json" }
```

置いたあとは VS Code の「Developer: Reload Window」で再読み込みする。

### 5-4. 全記事をプリレンダ対象にする

Nuxt Content v3 は静的書き出しでも記事データをブラウザ側 (WASM 版 SQLite) に持っていたので、プリレンダされていないページでも表示できた。
自作 API は静的ホスティングには存在しないため、**リンクから辿れずプリレンダ漏れしたページは空白になる。**
クローラーに頼らず、全記事の path を明示的に渡す。

```ts
nuxt.hook("nitro:config", (nitroConfig) => {
  nitroConfig.prerender ||= {};
  nitroConfig.prerender.routes = [
    ...(nitroConfig.prerender.routes ?? []),
    ...loadDocs(contentDir).map((doc) => doc.path),
  ];
});
```

このリポジトリでは ghostphp のドキュメント 24 ページがこれに該当した (プロジェクトページがタブ切り替えで、クローラーが辿れない)。

### 5-5. dev 中の記事編集を反映する

`builder:watch` フックは `content/` の変更を拾わなかった。`fs.watch` で自前監視し、Nitro だけを再ビルドする (Nuxt 全体の再起動より速い。3〜4 秒で反映)。

```ts
if (nuxt.options.dev) {
  nuxt.hook("nitro:init", (nitro) => {
    const watcher = watch(contentDir, { recursive: true }, () => {
      nitro.hooks.callHook("rollup:reload"); // 実際は 100ms デバウンスしている
    });
    nuxt.hook("close", () => watcher.close());
  });
}
```

---

## 6. 互換性の穴を埋める (60 分)

### 6-1. 見出し id を Nuxt Content と揃える

Ox Content と Nuxt Content では見出しの id の付け方が違う。

```
見出し: ■ expressのインストール(ジェネレータ使用)
Nuxt Content (github-slugger) : -expressのインストールジェネレータ使用
Ox Content                    : expressのインストール-ジェネレータ使用
```

記事内に手書きの目次 (`[...](#-expressの...)`) があると全部リンク切れになる。
`github-slugger` で id を振り直して合わせる (`reslugHeadings`)。

確認方法: 全記事で `href="#..."` の行き先 id が存在するか数える。
このリポジトリでは 633 件中 612 件が一致した。残り 21 件は、記事の目次と見出しの文言が食い違っているもので、以前からリンク切れだった。

### 6-2. Markdown 内の Vue コンポーネント

`v-html` では Vue コンポーネントは動かないので、**HTML をタグの位置で分割**して配列にする。

```ts
// 例: [{ html: '<h2>…</h2>' }, { component: 'RevueComponents', props: { component: 'BasicButton' } }, { html: '…' }]
blocks: OxContentBlock[]
```

ページ側で、HTML の部分は `v-html`、コンポーネントの部分は `<component :is>` で描画する。

```vue
<component :is="page.wrapped ? NuxtContentWrapper : 'div'" v-if="page">
  <template v-for="(block, i) in page.blocks" :key="i">
    <component :is="block.component" v-if="'component' in block" v-bind="block.props" />
    <div v-else v-html="block.html" />
  </template>
</component>
```

- Ox Content は単独行のカスタムタグを `<p>` で包むので、分割時に `<p>` ごと取り除く
- 記事全体を包むラッパー (`<nuxt-content-wrapper>`) は分割せず、`wrapped: true` フラグにして外側で包む
- **閉じタグ欠落・重複している記事が 3 件あった。** Nuxt Content は黙って補完していたので、開始タグがあるかどうかだけで判定し、タグは全部消す

### 6-3. コードの配色

Ox Content のハイライトは `var(--octc-syntax-token-keyword, #ff7b72)` のような CSS 変数で色が付く (既定は GitHub Dark 風)。
変数を上書きすれば旧設定の `theme: 'dracula'` を再現できる → [assets/css/ox-content-dracula.css](../assets/css/ox-content-dracula.css)

使われている変数は 10 個 (`background` / `foreground` / `keyword` / `function` / `punctuation` / `constant` / `string` / `comment` / `parameter` / `link`)。

### 6-4. frontmatter の型

Nuxt Content は `sortNumber: 001` を数値 1 にしていたが、Ox Content では文字列 `'001'` が返る。並べ替えでは `Number()` してから比べる。

---

## 7. API とページを差し替える (20 分)

```ts
// server/api/content/page.get.ts
import docs from "#ox-content";
export default defineEventHandler((event) => {
  const { path } = getQuery(event);
  const normalized = String(path ?? "/").replace(/\/+$/, "") || "/";
  return docs.find((d) => d.path === normalized) ?? null; // 旧 .first() と同じく該当なしは null
});
```

```ts
// ページ側: queryCollection('content').path(route.path).first() の置き換え
const { data: page } = await useFetch("/api/content/page", {
  key: route.path,
  query: { path: route.path },
});
```

一覧 API は本文 (`blocks`) を除いて返す。payload が軽くなる。

server/ 配下を書くための前提知識・参考ソース・もっと簡単な書き方は [server-api-learning.md](server-api-learning.md) にまとめた。

---

## 8. 確認チェックリスト (30 分)

- [ ] `npx nuxt generate` が通る (ルート数が移行前と同じか)
- [ ] `content/` の全ファイル分のページが `.output/public` に書き出されている (リンクから辿れないページも含む)
- [ ] 記事ページ: 本文・コードの色・戻るボタン・revuekitz のデモが出る
- [ ] 記事一覧 (`/techs/express` など): 件数・並び順・更新日
- [ ] 目次リンクで見出しへ飛べる
- [ ] `npm run dev` 中に記事を編集すると数秒で反映される
- [ ] 存在しない path で画面が落ちない
- [ ] VS Code で `#ox-content` に型エラーが出ない
- [ ] 生成された HTML に `<nuxt-content-wrapper>` / `<revue-components>` が生のタグのまま残っていない

```bash
grep -rlE "<(nuxt-content-wrapper|revue-components)" .output/public | head   # 何も出なければ OK
```

---

## 9. ハマりどころまとめ

| 症状                                                 | 原因                                                                                                                                                          | 対処                                                                   |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `@ox-content/vite-plugin` が入らない・動かない       | Vite 8 必須                                                                                                                                                   | napi を直接使う                                                        |
| 目次リンクが飛ばない                                 | 見出し id の生成規則が違う                                                                                                                                    | github-slugger で振り直す                                              |
| 戻るボタンや背景が消えた                             | 記事内の Vue コンポーネントが `v-html` で動かない                                                                                                             | ブロック分割 + `<component :is>`                                       |
| 一部の記事だけレイアウトが崩れる                     | ラッパーの閉じタグ欠落 (Nuxt Content は補完していた)                                                                                                          | 開始タグだけで判定                                                     |
| 特定の記事が開けない                                 | frontmatter の `path` がコピペで重複                                                                                                                          | ファイル名に合わせて修正                                               |
| 記事内リンク `[...](304_router_class.md)` で飛べない | Nuxt Content は `.md` への相対リンクをページの URL に自動で書き換えていた                                                                                     | ファイル → path の対応表を作り、`href` を書き換える (`rewriteMdLinks`) |
| 並び順がおかしい                                     | `sortNumber` が文字列で返る                                                                                                                                   | `Number()` で比較                                                      |
| dev で記事を直しても反映されない                     | `builder:watch` が `content/` を拾わない                                                                                                                      | `fs.watch` + `rollup:reload`                                           |
| 静的ホスティングで一部のドキュメントが空白           | Nuxt Content はブラウザ側にデータを持っていたが、自作 API は静的書き出しに存在しない。クローラーが辿れないページはプリレンダされず API を呼びに行って失敗する | モジュールで全ドキュメントの path を `nitro.prerender.routes` に追加   |
| VS Code で `Cannot find module '#ox-content'`        | `server/` がアプリ側の tsconfig で見られている                                                                                                                | `server/tsconfig.json` を追加してウィンドウを再読み込み                |

---

## 10. 今後やるなら

- **Nuxt を 4.6 以上に上げたら** `@ox-content/vite-plugin` / `@ox-content/vite-plugin-vue` を再検討する。Markdown 内の Vue コンポーネントを公式の仕組みで扱える可能性があり、6-2 の自作部分を消せるかもしれない
- 記事内のカスタムタグが増えたら、`modules/ox-content.ts` の `COMPONENT_TAGS` に 1 行足すだけで対応できる
- Ox Content には全文検索インデックス (`buildSearchIndex`)、サイトマップ (`generateSiteMapBodies`)、OG 画像 (`generateOgImageSvg`) の生成もあるので、ブログ機能を足すときの候補になる
