# server/ 配下を自分で書くための学習メモ

[ox-content-migration.md](ox-content-migration.md) で作った `server/api/content/*.get.ts` を、自分一人で書けるようになるためのメモ。
「何をソースに書けばよかったか」を、基本と応用に分けて整理している。

対象のコード:

```ts
// server/api/content/page.get.ts
import docs from "#ox-content";

export default defineEventHandler((event) => {
  const { path } = getQuery(event);
  const normalized = String(path ?? "/").replace(/\/+$/, "") || "/";
  return docs.find((d) => d.path === normalized) ?? null;
});
```

---

## ① API 本体 — Nuxt の基本機能 (公式ドキュメントにそのまま載っている)

```ts
export default defineEventHandler((event) => {
  const { path } = getQuery(event)
  return ...
})
```

| 書いたもの                                                                       | ソース                                                                                              |
| -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `server/api/xxx.get.ts` というファイル名で API になる (`.get` は GET 専用の意味) | Nuxt 公式「Directory Structure → server」<br>https://nuxt.com/docs/guide/directory-structure/server |
| `defineEventHandler` / `getQuery`                                                | 同上。詳しくは Nuxt のサーバーの土台である **h3** のドキュメント<br>https://h3.dev                  |
| ページから `useFetch('/api/...')` で呼ぶ                                         | Nuxt 公式「Data Fetching」<br>https://nuxt.com/docs/getting-started/data-fetching                   |

server ディレクトリのページの例をほぼ写して、`return` の中身を自分のデータに変えるだけ。まずはここを押さえれば十分。

---

## ② `import docs from '#ox-content'` — 応用 (モジュール作者向けの知識)

難しいのはこちら。「データをどこから持ってくるか」の部分。

| 書いたもの                                                      | ソース                                                                                |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `addServerTemplate` (サーバー用の仮想モジュールを作る)          | Nuxt 公式「Kit → Templates」<br>https://nuxt.com/docs/api/kit/templates               |
| `addTypeTemplate({ nitro: true })` (その型をサーバー側に入れる) | 同上                                                                                  |
| `defineNuxtModule`、`modules/` 直下の自動登録                   | Nuxt 公式「Module Author Guide」<br>https://nuxt.com/docs/guide/going-further/modules |
| `nitro:init` フック、`rollup:reload` (dev 中の再ビルド)         | Nitro の内部の話でドキュメントはほぼない (後述)                                       |

`#` から始まる名前については [ox-content-migration.md の 5-2](ox-content-migration.md#5-2-ビルド時にサーバーへ埋め込む) と「補足: `#` の意味」を参照。

---

## 実際にはどう調べたか

ドキュメントよりも、**インストール済みパッケージの型定義 (`.d.ts`) を直接読む**のが一番効いた。

- **Ox Content** は使い方の README がほとんどない。`node_modules/@ox-content/napi/index.d.ts` を grep して、`transform` / `highlightHtmlCodeBlocks` の存在と戻り値の型 (`html` / `frontmatter` / `toc` / `errors`) を知った

  ```bash
  grep -E "export (declare )?function" node_modules/@ox-content/napi/index.d.ts
  grep -nE "interface TransformResult" -A15 node_modules/@ox-content/napi/index.d.ts
  ```

- **Nuxt Kit** も `node_modules/@nuxt/kit/dist/index.d.ts` に関数がコメント付きで全部並んでいる
- **`rollup:reload`** のような内部フックは、Nitro のソースを読んだことがあるかどうかの世界。知らなくて当然なので、「分からなければ dev サーバーを再起動すればいい」と割り切ってもよかった部分

---

## もっと簡単な書き方もあった

② を使わず、① だけで済ませる方法もある。API の中で直接ファイルを読む。

```ts
// server/api/content/page.get.ts (簡易版)
import { readFile } from "node:fs/promises";
import { transform } from "@ox-content/napi";

export default defineEventHandler(async (event) => {
  const { path } = getQuery(event);
  const md = await readFile(`content${path}.md`, "utf8");
  return transform(md, { gfm: true });
});
```

`nuxt generate` (静的書き出し) ならビルド中にローカルで実行されるだけなので、これでも動く。

|                                   | 簡易版 (①だけ)                                                     | 今回の方式 (①+②)              |
| --------------------------------- | ------------------------------------------------------------------ | ----------------------------- |
| 書きやすさ                        | Nuxt の基本だけで書ける                                            | Nuxt Kit / Nitro の知識が必要 |
| 変換のタイミング                  | リクエストのたび                                                   | ビルド時に 1 回               |
| SSR で Netlify にデプロイしたとき | 関数の中でネイティブバイナリと `content/` が必要になり、壊れやすい | 実行時の依存なし              |
| dev 中の記事編集の反映            | 何もしなくても毎回最新                                             | 監視の仕組みが必要            |

今回 ② にしたのは、将来 SSR にしても壊れないようにするため。
**最初の一歩としては簡易版から始めて、必要になったら ② にする**のが自然な順番だった。

---

## 学ぶ順番のおすすめ

1. Nuxt 公式の server ディレクトリのページを読む → ① が書けるようになる
2. 上の簡易版を自分で書いて動かしてみる
3. 余裕があれば Module Author Guide と Kit → Templates を読む → ② が理解できる
4. 困ったら `node_modules/パッケージ名/` の `.d.ts` を開く癖をつける
