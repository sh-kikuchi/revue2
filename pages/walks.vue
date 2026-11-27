<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import "revuekitz/dist/style.css";
import { BasicButton, NumberField, PageTitle, RadioField, TextField } from "revuekitz";
import { computed, onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from "vue";
import type { LatLngTuple, Map, Marker, Polyline } from "leaflet";
import { useWalkRoute, type TravelMode } from "@/composables/walks/useWalkRoute";
import { usePlaceSearch } from "@/composables/walks/usePlaceSearch";

// テンプレートの ref="mapEl" の div（地図を入れる場所）
const mapEl = useTemplateRef<HTMLDivElement>("mapEl");

// 地図と Leaflet 本体（検索やタップの処理でも使うので、onMounted の外に置く）
let map: Map | undefined;
let L: typeof import("leaflet") | undefined;

// #region ===== 出発地と目的地を選ぶ =====
// 出発地と目的地の座標（まだ決まっていなければ null）
const start = ref<LatLngTuple | null>(null);
const goal = ref<LatLngTuple | null>(null);

// 入力欄に表示する名前
const startName = ref("");
const goalName = ref("");
const TAPPED = "地図で選んだ地点";

// ルート検索に渡す地点。決まっている分だけを [出発地, 目的地] の順に並べる
const points = computed(() =>
  [start.value, goal.value].filter((p): p is LatLngTuple => p !== null),
);

// 地図のタップは、空いている欄（出発地 → 目的地）に入れる。両方決まっていたら出発地から選び直す
const selectByTap = (point: LatLngTuple) => {
  if (!start.value) {
    start.value = point;
    startName.value = TAPPED;
  } else if (!goal.value) {
    goal.value = point;
    goalName.value = TAPPED;
  } else {
    start.value = point;
    startName.value = TAPPED;
    goal.value = null;
    goalName.value = "";
  }
};

// 出発地と目的地を入れ替える
const swapPoints = () => {
  [start.value, goal.value] = [goal.value, start.value];
  [startName.value, goalName.value] = [goalName.value, startName.value];
};

// 地図に立てたピン。出発地・目的地に合わせて立て直す
let pins: Marker[] = [];

const drawPins = () => {
  if (!map || !L) return;
  pins.forEach((pin) => pin.remove());
  pins = [];
  if (start.value)
    pins.push(
      L.marker(start.value).bindTooltip("出発", { permanent: true, direction: "top" }).addTo(map),
    );
  if (goal.value)
    pins.push(
      L.marker(goal.value).bindTooltip("目的", { permanent: true, direction: "top" }).addTo(map),
    );
};
watch([start, goal], drawPins);
// #endregion ===== 出発地と目的地を選ぶ =====

// #region ===== ルートを検索して線を引く =====
// 移動手段（徒歩・自転車）
const mode = ref<TravelMode>("foot");
const modeItems = [
  { text: "徒歩", value: "foot" },
  { text: "自転車", value: "bike" },
];

// 地点と移動手段を渡すと、ルートが返ってくる
const { line, distance, duration, loading } = useWalkRoute(points, mode);
let routeLine: Polyline | undefined;

// line が変わったら、線を引き直して全体が見えるようにする
const drawLine = () => {
  if (!map || !L) return;
  routeLine?.remove();
  routeLine = undefined;
  if (line.value.length === 0) return;
  routeLine = L.polyline(line.value, { color: "#1565c0", weight: 5 }).addTo(map);
  map.fitBounds(routeLine.getBounds(), { padding: [32, 32] });
};
watch(line, drawLine);
// #endregion ===== ルートを検索して線を引く =====

// #region ===== 距離・時間・歩数を表示する =====
// 【歩幅】cm（目安: 身長 × 0.45）
const strideCm = ref(70);

// 【距離】km = m ÷ 1000  例）2019.3 m → 2.02 km
const distanceText = computed(() => {
  const km = distance.value / 1000;
  return `${km.toFixed(2)} km`;
});

// 期間テキスト
const durationText = computed(() => {
  // 秒 → 分（四捨五入）例）5400 秒 → 90分
  const totalMinutes = Math.round(duration.value / 60);

  // 分 → 時間（切り捨て）例）90 ÷ 60 → 1時間
  const hours = Math.floor(totalMinutes / 60);

  // 残りの分（割った余り）例）90 ÷ 60 の余り → 30分
  const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes}分`;
  return `${hours}時間${minutes}分`;
});

// 歩数テキスト
const steps = computed(() => {
  // 歩幅が空欄、または 40〜100 cm の範囲外なら計算しない（画面では「—」）
  if (!strideCm.value || strideCm.value < 40 || strideCm.value > 100) return null;

  // 歩幅を cm → m に直す  例）70 cm ÷ 100 → 0.7 m
  const strideM = strideCm.value / 100;

  // 距離 ÷ 歩幅（四捨五入）  例）2019.3 m ÷ 0.7 m → 2885歩
  return Math.round(distance.value / strideM);
});
// #endregion ===== 距離・時間・歩数を表示する =====

// #region ===== 地名で検索する =====
// 地名を渡すと座標が返ってくる
const { search, searching } = usePlaceSearch();

// 出発地か目的地の欄に入れた地名を座標に変換し、その欄の地点にする
const searchPlace = async (target: "start" | "goal") => {
  const name = target === "start" ? startName.value : goalName.value;
  if (!map || !name.trim() || name === TAPPED) return;
  const latlng = await search(name);
  if (!latlng) {
    alert("見つかりませんでした");
    return;
  }
  if (target === "start") start.value = latlng;
  else goal.value = latlng;
  map.setView(latlng, 16);
};
// #endregion ===== 地名で検索する =====

onMounted(async () => {
  // leafletはブラウザ専用なので、画面が表示されてから読み込む
  // ※Node.js にはブラウザの window や document がない。
  // SSGでは、ビルドするときに Node.js がページの Vue コードを実行して HTML を作る。
  // ※onMounted はブラウザで画面が表示された後にしか呼ばれない。
  L = await import("leaflet");

  // 地図を作り、中心（東京駅）とズームレベルを決める
  //Vue が用意した空の div を、Leaflet が丸ごと地図に作り変えている
  map = L.map(mapEl.value!).setView([35.681, 139.767], 15);

  // 地図の画像（タイル）を国土地理院から読み込む
  L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png", {
    attribution:
      '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank">地理院タイル</a>',
    maxZoom: 18,
  }).addTo(map);

  // ルート検索と地名検索の出典（それぞれの利用規約で表示が求められている）
  map.attributionControl.addAttribution(
    'ルート: <a href="https://routing.openstreetmap.de/about.html" target="_blank">FOSSGIS</a>' +
      " / 地名検索: Nominatim" +
      ' / © <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap contributors</a>' +
      ' (<a href="https://www.openstreetmap.org/fixthemap" target="_blank">fix the map</a>)',
  );

  // 地図をタップしたら、空いている欄の地点にする
  map.on("click", (e) => selectByTap([e.latlng.lat, e.latlng.lng]));
});

// ページを離れるときに地図を片付ける
onBeforeUnmount(() => map?.remove());
</script>

<template>
  <PageTitle>Walks</PageTitle>
  <div class="walks">
    <!-- 左: 操作パネル -->
    <div class="side">
      <section class="panel">
        <!-- 移動手段 -->
        <RadioField
          class="segmented"
          name="mode"
          role="radiogroup"
          aria-label="移動手段"
          :items="modeItems"
          v-model="mode"
        />

        <!-- 出発地・目的地 -->
        <div class="places">
          <div class="field">
            <label for="start-input" class="field-label">
              <span class="badge badge--start">出発</span>出発地
            </label>
            <div class="field-row">
              <TextField
                id="start-input"
                class="place-input"
                v-model="startName"
                placeholder="地名で探す"
                @keydown.enter="!$event.isComposing && searchPlace('start')"
              />
              <BasicButton
                type="button"
                class="search-button"
                :isDisabled="searching"
                @click="searchPlace('start')"
              >
                検索
              </BasicButton>
            </div>
          </div>

          <BasicButton
            type="button"
            class="swap-button"
            :isDisabled="!start && !goal"
            aria-label="出発地と目的地を入れ替える"
            @click="swapPoints"
          >
            ⇅
          </BasicButton>

          <div class="field">
            <label for="goal-input" class="field-label">
              <span class="badge badge--goal">目的</span>目的地
            </label>
            <div class="field-row">
              <TextField
                id="goal-input"
                class="place-input"
                v-model="goalName"
                placeholder="地名で探す"
                @keydown.enter="!$event.isComposing && searchPlace('goal')"
              />
              <BasicButton
                type="button"
                class="search-button"
                :isDisabled="searching"
                @click="searchPlace('goal')"
              >
                検索
              </BasicButton>
            </div>
          </div>
        </div>
        <p class="hint">地図をタップしても、出発地・目的地を選べます。</p>

        <!-- 歩幅（徒歩のときだけ） -->
        <div v-if="mode === 'foot'" class="stride">
          <label for="stride-input">歩幅</label>
          <NumberField
            id="stride-input"
            class="stride-input"
            min="40"
            max="100"
            v-model.number="strideCm"
          />
          <span>cm</span>
          <span class="stride-note">目安: 身長 × 0.45</span>
        </div>
      </section>

      <!-- 結果 -->
      <section class="panel result" aria-live="polite">
        <p v-if="loading" class="result-message">ルートを検索中…</p>
        <dl v-else-if="line.length > 0" class="stats">
          <div class="stat">
            <dt>距離</dt>
            <dd>{{ distanceText }}</dd>
          </div>
          <div class="stat">
            <dt>時間</dt>
            <dd>約{{ durationText }}</dd>
          </div>
          <div v-if="mode === 'foot'" class="stat">
            <dt>歩数</dt>
            <dd>{{ steps === null ? "—" : `約${steps.toLocaleString()}歩` }}</dd>
          </div>
        </dl>
        <p v-else class="result-message">出発地と目的地を選ぶと、距離と時間がわかります。</p>
      </section>
    </div>

    <!-- 右: 地図 -->
    <div class="map-column">
      <div ref="mapEl" class="map"></div>
      <p class="privacy-note">
        ルート検索の経路は、検索サービス（FOSSGIS）のサーバーに記録されます。自宅などの場所を選ぶときはご注意ください。
      </p>
    </div>
  </div>
</template>
<style scoped>
/* 全体: PC は左にパネル、右に地図。スマホは縦に並べる */
.walks {
  display: grid;
  grid-template-columns: 340px minmax(0, 1fr);
  gap: 16px;
  max-width: 1100px;
  margin: 0 auto;
  padding: 8px 16px 32px;
}

.side {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.panel {
  margin: 0;
  padding: 16px;
  background-color: whitesmoke;
  border-radius: 8px;
}

/* 移動手段: RadioField を、2つのボタンが並んだ切り替えの見た目にする */
/* RadioField の中の要素は部品側で作られるので :deep で届かせる */
.segmented {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 4px;
  background-color: #e2e2e2;
  border-radius: 8px;
}

.segmented :deep(> div) {
  position: relative;
  width: auto;
  padding: 0;
}

/* ラジオボタン本体は見えなくするが、キーボードでは操作できるよう残す */
.segmented :deep(input) {
  position: absolute;
  opacity: 0;
  inset: 0;
  margin: 0;
  cursor: pointer;
}

.segmented :deep(label) {
  display: block;
  width: 100%;
  margin: 0;
  padding: 8px 0;
  text-align: center;
  font-weight: 700;
  line-height: 1.5;
  color: #555;
  border-radius: 6px;
  cursor: pointer;
}

.segmented :deep(input:checked + label) {
  color: #1565c0;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
}

.segmented :deep(input:focus-visible + label) {
  outline: 2px solid #1565c0;
  outline-offset: 2px;
}

/* 出発地・目的地 */
.places {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 16px;
}

.field-label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  font-weight: 700;
}

.badge {
  padding: 2px 8px;
  font-size: 12px;
  color: white;
  border-radius: 999px;
}

.badge--start {
  background-color: #2e7d32;
}

.badge--goal {
  background-color: #b71c1c;
}

.field-row {
  display: flex;
  gap: 8px;
}

/* TextField の見た目を上書き（input.place-input で RevueKitz の既定より優先させる） */
input.place-input {
  flex: 1;
  min-width: 0;
  padding: 8px 10px;
  font-size: 16px;
  background-color: white;
  border: 1px solid #b0b0b0;
  border-radius: 6px;
}

.search-button {
  flex-shrink: 0;
  padding: 8px 14px;
  font-weight: 700;
  color: white;
  background-color: #1565c0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.swap-button {
  align-self: flex-end;
  width: 36px;
  height: 36px;
  padding: 0;
  font-size: 18px;
  line-height: 1;
  color: #1565c0;
  background-color: white;
  border: 1px solid #b0b0b0;
  border-radius: 50%;
  cursor: pointer;
}

.search-button:disabled,
.swap-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.hint {
  margin: 8px 0 0;
  font-size: 13px;
  color: #666;
}

/* 歩幅 */
.stride {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #ddd;
}

.stride label {
  font-weight: 700;
}

input.stride-input {
  width: 72px;
  padding: 6px 8px;
  font-size: 16px;
  background-color: white;
  border: 1px solid #b0b0b0;
  border-radius: 6px;
}

.stride-note {
  font-size: 13px;
  color: #666;
}

/* 結果 */
.result-message {
  margin: 0;
  color: #555;
}

.stats {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
  margin: 0;
}

.stat dt {
  font-size: 13px;
  color: #666;
}

.stat dd {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
}

/* 地図 */
.map-column {
  min-width: 0;
}

.privacy-note {
  margin: 8px 0 0;
  font-size: 12px;
  color: #555;
}

.map {
  height: min(75vh, 620px);
  border-radius: 8px;
  overflow: hidden;
}

@media (max-width: 768px) {
  .walks {
    grid-template-columns: minmax(0, 1fr);
    padding: 8px 12px 24px;
  }

  .map {
    height: 60vh;
  }
}
</style>
