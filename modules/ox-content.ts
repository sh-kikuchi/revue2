import { readFileSync, readdirSync, statSync, watch } from "node:fs";
import { join, posix, relative, sep } from "node:path";
import { defineNuxtModule, addServerTemplate, addTypeTemplate } from "@nuxt/kit";
import { transform, highlightHtmlCodeBlocks } from "@ox-content/napi";
import GithubSlugger from "github-slugger";

// Markdown 内で Vue コンポーネントとして描画するタグ (components/global 配下)
const COMPONENT_TAGS: Record<string, string> = {
  "revue-components": "RevueComponents",
};
const WRAPPER_TAG = "nuxt-content-wrapper";

export type OxContentBlock =
  | { html: string }
  | { component: string; props: Record<string, string> };

export interface OxContentDoc {
  path: string;
  title: string;
  description: string;
  meta: Record<string, any>;
  // 先頭が <nuxt-content-wrapper> の記事は NuxtContentWrapper で包んで表示する
  wrapped: boolean;
  blocks: OxContentBlock[];
}

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

// Nuxt Content (rehype-slug) と同じ github-slugger で見出し id を振り直し、
// 記事内に手書きされた目次リンクを壊さないようにする
const reslugHeadings = (html: string) => {
  const slugger = new GithubSlugger();
  return html.replace(/<h([1-6]) id="[^"]*">([\s\S]*?)<\/h\1>/g, (_, level, inner) => {
    const text = inner
      .replace(/<[^>]+>/g, "")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, "&");
    return `<h${level} id="${slugger.slug(text)}">${inner}</h${level}>`;
  });
};

// <revue-components component="X"></revue-components> などの位置で HTML を分割する
const toBlocks = (html: string): OxContentBlock[] => {
  const tags = Object.keys(COMPONENT_TAGS).join("|");
  const pattern = new RegExp(`(?:<p>\\s*)?<(${tags})([^>]*)>\\s*</\\1>(?:\\s*</p>)?`, "g");
  const blocks: OxContentBlock[] = [];
  let last = 0;
  for (const m of html.matchAll(pattern)) {
    const [whole, tag = "", attrs = ""] = m;
    blocks.push({ html: html.slice(last, m.index) });
    const props = Object.fromEntries(
      [...attrs.matchAll(/([\w-]+)="([^"]*)"/g)].map(([, k, v]) => [k, v]),
    );
    blocks.push({ component: COMPONENT_TAGS[tag]!, props });
    last = m.index + whole.length;
  }
  blocks.push({ html: html.slice(last) });
  return blocks.filter((b) => !("html" in b) || b.html.trim());
};

// 記事内の相対リンク (href="304_router_class.md#foo") をリンク先記事の path に書き換える
// (Nuxt Content が自動でやっていた処理)
const rewriteMdLinks = (html: string, rel: string, pathByRel: Map<string, string>) =>
  html.replace(/href="([^"#:]+\.md)(#[^"]*)?"/g, (whole, href: string, hash = "") => {
    const target = posix.normalize(posix.join(posix.dirname(rel), decodeURIComponent(href)));
    const path = pathByRel.get(target);
    if (!path) {
      console.warn(`[ox-content] ${rel}: リンク先が見つからない ${href}`);
      return whole;
    }
    return `href="${path}${hash}"`;
  });

export const loadDocs = (contentDir: string): OxContentDoc[] => {
  const parsed = walk(contentDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const rel = relative(contentDir, file).split(sep).join("/");
      const result = transform(readFileSync(file, "utf8"), { gfm: true });
      if (result.errors.length) {
        console.warn(`[ox-content] ${rel}:`, result.errors);
      }
      const { title, description, path, ...meta } = JSON.parse(result.frontmatter || "{}");
      const filePath = "/" + rel.replace(/\.md$/, "").replace(/(^|\/)index$/, "");
      return { rel, result, title, description, meta, path: (path || filePath || "/") as string };
    });
  const pathByRel = new Map(parsed.map((d) => [d.rel, d.path]));

  return parsed.map(({ rel, result, title, description, meta, path }) => {
    const html = rewriteMdLinks(
      reslugHeadings(highlightHtmlCodeBlocks(result.html).html),
      rel,
      pathByRel,
    );
    // 閉じタグの欠落・重複がある記事もあるため、開始タグの有無だけで判定して全て取り除く
    const wrapped = new RegExp(`^\\s*<${WRAPPER_TAG}>`).test(html);
    return {
      path,
      title: title ?? result.toc[0]?.text ?? "",
      description: description ?? "",
      meta,
      wrapped,
      blocks: toBlocks(html.replace(new RegExp(`</?${WRAPPER_TAG}>`, "g"), "")),
    };
  });
};

export default defineNuxtModule({
  meta: { name: "ox-content" },
  setup(_options, nuxt) {
    const contentDir = join(nuxt.options.rootDir, "content");

    // ビルド時に全 Markdown を HTML 化してサーバーバンドルへ埋め込む
    // (実行時にネイティブバイナリや content/ ディレクトリを必要としない)
    addServerTemplate({
      filename: "#ox-content",
      getContents: () => `export default ${JSON.stringify(loadDocs(contentDir))}`,
    });
    // リンクを辿れないページもあるため、全ドキュメントを明示的にプリレンダする
    // (静的ホスティングには /api/content が無く、プリレンダ漏れのページは空になる)
    nuxt.hook("nitro:config", (nitroConfig) => {
      nitroConfig.prerender ||= {};
      nitroConfig.prerender.routes = [
        ...(nitroConfig.prerender.routes ?? []),
        ...loadDocs(contentDir).map((doc) => doc.path),
      ];
    });
    addTypeTemplate(
      {
        filename: "types/ox-content.d.ts",
        getContents: () => `declare module '#ox-content' {
  const docs: import('${join(nuxt.options.rootDir, "modules/ox-content").split(sep).join("/")}').OxContentDoc[]
  export default docs
}`,
      },
      { nitro: true },
    );

    // dev 中に記事を編集したらサーバーバンドルを作り直す
    if (nuxt.options.dev) {
      nuxt.hook("nitro:init", (nitro) => {
        let timer: ReturnType<typeof setTimeout> | undefined;
        const watcher = watch(contentDir, { recursive: true }, () => {
          clearTimeout(timer);
          timer = setTimeout(() => nitro.hooks.callHook("rollup:reload"), 100);
        });
        nuxt.hook("close", () => watcher.close());
      });
    }
  },
});
