import { onWatcherCleanup, ref, shallowRef, watch, type Ref } from "vue";
import type { LatLngTuple } from "leaflet";

// 移動手段と、FOSSGIS のルート検索で使う名前
export type TravelMode = "foot" | "bike";
const PROFILE: Record<TravelMode, string> = {
  foot: "routed-foot",
  bike: "routed-bike",
};

// 前回の通信から1秒空ける（FOSSGIS の利用規約）。中断されたら待つのをやめる
let lastRequestAt = 0;
const waitTurn = (signal: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const timer = setTimeout(resolve, Math.max(0, lastRequestAt + 1000 - Date.now()));
    signal.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        reject(signal.reason);
      },
      { once: true },
    );
  });

/** 地点と移動手段を渡すと、ルート（線・距離・時間）を取ってくる */
export function useWalkRoute(points: Ref<LatLngTuple[]>, mode: Ref<TravelMode>) {
  // ルートの線の座標と、距離（m）・時間（秒）
  const line = shallowRef<LatLngTuple[]>([]);
  const distance = ref(0);
  const duration = ref(0);
  const loading = ref(false);

  const fetchRoute = async () => {
    if (points.value.length < 2) {
      line.value = [];
      loading.value = false;
      return;
    }
    // 非同期操作をキャンセルするためのJavaScriptの組み込みAPI
    const controller = new AbortController();
    onWatcherCleanup(() => controller.abort());
    loading.value = true;

    try {
      await waitTurn(controller.signal);
      lastRequestAt = Date.now();
      // OSRM は「経度,緯度」の順で、地点を ; でつなぐ（ex."139.7671,35.6812;139.7528,35.6852")
      const path = points.value.map(([lat, lng]) => `${lng},${lat}`).join(";");
      const res = await fetch(
        `https://routing.openstreetmap.de/${PROFILE[mode.value]}/route/v1/driving/${path}?overview=full&geometries=geojson`,
        { signal: controller.signal },
      );
      const route = (await res.json()).routes?.[0];
      if (!route) {
        alert("ルートが見つかりませんでした");
        return;
      }
      // 返ってくる座標は [経度, 緯度] なので、Leaflet 用に入れ替える
      line.value = route.geometry.coordinates.map(([lng, lat]: [number, number]) => [lat, lng]);
      distance.value = route.distance;
      duration.value = route.duration;
    } catch {
      // 中断したリクエストは何もしない
      if (controller.signal.aborted) return;
      alert("ルート検索に失敗しました");
    } finally {
      if (!controller.signal.aborted) loading.value = false;
    }
  };

  // 地点か移動手段が変わったら取り直す
  watch([points, mode], fetchRoute);

  return { line, distance, duration, loading };
}
