import { defineConfig } from "vite-plus";

export default defineConfig({
  fmt: {
    // content/ の Markdown はコードブロック内のサンプルコードまで書き換わってしまうため対象外にする
    ignorePatterns: ["content/**"],
  },
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
});
