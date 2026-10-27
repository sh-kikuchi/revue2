import docs from "#ox-content";

export default defineEventHandler((event) => {
  const { path } = getQuery(event);
  const normalized = (typeof path === "string" ? path : "/").replace(/\/+$/, "") || "/";
  // 旧 queryCollection(...).first() と同じく、該当なしは null (空ページ) を返す
  return docs.find((d: { path: string }) => d.path === normalized) ?? null;
});
