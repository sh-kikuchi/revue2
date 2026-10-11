<template>
  <section class="camelot">
    <div class="input-area">
      <input
        type="text"
        v-model="input"
        placeholder="例: Dm"
      />
      <p class="guide">
        メジャーは大文字のみ（C, F#, Bb）、マイナーは末尾に m（Am, F#m, Bbm）
      </p>
    </div>

    <div v-if="result" class="result">
      <div class="code">{{ result.code }}</div>
      <div class="key">{{ result.name }}</div>
    </div>
    <div v-else-if="input.trim()" class="error">
      該当するキーがありません。下の一覧の表記で入力してください
    </div>

    <div v-if="result" class="compatible">
      <p>相性の良いキー</p>
      <ul>
        <li v-for="c in compatible" :key="c.code" @click="input = c.name">
          <span class="c-code">{{ c.code }}</span>
          <span class="c-name">{{ c.name }}</span>
          <span class="c-label">{{ c.label }}</span>
        </li>
      </ul>
    </div>

    <div class="wheel">
      <div
        v-for="n in 12"
        :key="n"
        class="wheel-col"
      >
        <div
          v-for="m in ['B', 'A']"
          :key="m"
          :class="['cell', { active: result && result.code === `${n}${m}` }]"
          @click="input = camelot[`${n}${m}`]"
        >
          <span class="c-code">{{ n }}{{ m }}</span>
          <span class="c-name">{{ camelot[`${n}${m}`] }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, computed } from 'vue'

// Camelot コード → 表示用キー名
const camelot = {
  '1A': 'G#m',  '1B': 'B',
  '2A': 'D#m',  '2B': 'F#',
  '3A': 'Bbm',  '3B': 'Db',
  '4A': 'Fm',   '4B': 'Ab',
  '5A': 'Cm',   '5B': 'Eb',
  '6A': 'Gm',   '6B': 'Bb',
  '7A': 'Dm',   '7B': 'F',
  '8A': 'Am',   '8B': 'C',
  '9A': 'Em',   '9B': 'G',
  '10A': 'Bm',  '10B': 'D',
  '11A': 'F#m', '11B': 'A',
  '12A': 'C#m', '12B': 'E',
}

// 異名同音の別表記
const aliases = {
  'Abm': '1A', 'Ebm': '2A', 'A#m': '3A', 'Gbm': '11A', 'Dbm': '12A',
  'Cb': '1B', 'Gb': '2B', 'C#': '3B',
}

// キー名 → Camelot コード（完全一致のみ）
const keyToCode = {
  ...Object.fromEntries(Object.entries(camelot).map(([code, name]) => [name, code])),
  ...aliases,
}

const input = ref('Dm')

const result = computed(() => {
  const code = keyToCode[input.value.trim()]
  return code ? { code, name: camelot[code] } : null
})

const compatible = computed(() => {
  if (!result.value) return []
  const num = parseInt(result.value.code)
  const mode = result.value.code.slice(-1)
  const other = mode === 'A' ? 'B' : 'A'
  const wrap = (n) => ((n + 11) % 12) + 1
  return [
    { code: `${wrap(num - 1)}${mode}`, label: '-1' },
    { code: `${wrap(num + 1)}${mode}`, label: '+1' },
    { code: `${num}${other}`, label: mode === 'A' ? '平行長調' : '平行短調' },
  ].map((c) => ({ ...c, name: camelot[c.code] }))
})
</script>
<style scoped>
.camelot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 10px;
}
.input-area input {
  width: 240px;
  max-width: 100%;
  box-sizing: border-box;
  padding: 8px;
  font-size: 1.2rem;
  text-align: center;
}
.guide {
  font-size: 0.8rem;
  text-align: center;
}
.result {
  text-align: center;
}
.result .code {
  font-size: 3rem;
  font-weight: bold;
}
.result .key {
  font-size: 1.2rem;
}
.error {
  color: #e66;
}
.compatible {
  text-align: center;
}
.compatible ul {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0;
  list-style: none;
}
.compatible li,
.cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 56px;
  padding: 6px;
  border: 2px dotted white;
  cursor: pointer;
}
.compatible li:active,
.cell:active {
  background: rgba(255, 255, 255, 0.15);
}
.wheel {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 4px;
  width: 100%;
  max-width: 900px;
}
.wheel-col {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.wheel .cell {
  min-width: 0;
  padding: 6px 2px;
}
@media (max-width: 600px) {
  .wheel {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
}
.cell.active {
  background: rgba(255, 255, 255, 0.3);
  border-style: solid;
}
.c-code {
  font-weight: bold;
}
.c-name,
.c-label {
  font-size: 0.8rem;
}
</style>
