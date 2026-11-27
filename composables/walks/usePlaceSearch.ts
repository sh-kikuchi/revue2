import { ref } from "vue";
import type { LatLngTuple } from "leaflet";

// Nominatim の利用規約: 1秒1回まで。同じ検索を繰り返さず、結果は手元に残す
let lastRequestAt = 0;
const cache = new Map<string, LatLngTuple | null>();

// 前回の通信から1秒空くまで待つ
const waitTurn = () =>
  new Promise<void>((resolve) =>
    setTimeout(resolve, Math.max(0, lastRequestAt + 1000 - Date.now())),
  );

/** 地名を渡すと、座標を返す（見つからなければ null） */
export function usePlaceSearch() {
  // 検索中かどうか（ボタンを押せなくするのに使える）
  const searching = ref(false);

  const search = async (query: string): Promise<LatLngTuple | null> => {
    const q = query.trim();
    // 一度調べた地名は、通信せずに手元の結果を返す
    if (cache.has(q)) return cache.get(q)!;

    searching.value = true;
    try {
      await waitTurn();
      lastRequestAt = Date.now();
      const params = new URLSearchParams({
        format: "jsonv2",
        q,
        countrycodes: "jp",
        "accept-language": "ja",
        limit: "1",
      });
      //住所⇄緯度経度の変換を行うオープンソースの検索エンジン
      const res = await fetch(`https://nominatim.openstreetmap.org/search?${params}`);
      const [place] = await res.json();
      // Nominatim の緯度・経度は文字列で返ってくるので数値にする
      const latlng: LatLngTuple | null = place ? [Number(place.lat), Number(place.lon)] : null;
      cache.set(q, latlng);
      return latlng;
    } finally {
      searching.value = false;
    }
  };

  return { search, searching };
}
