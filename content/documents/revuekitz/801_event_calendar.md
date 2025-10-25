---
title: 【revuekitz】EventCalendar
category: vue
createdAt: 2025-10-23
updatedAt: 2025-10-23
sortNumber: 801
path: "/documents/revuekitz/801_event_calendar"
---

<nuxt-content-wrapper>
 
## ■ コンポーネントデモ(demo)
<revue-components component="EventCalendar"></revue-components>

## ■ 概要（Overview）
### コンポーネント名
- EventCalendar (β版)

### レベル (Atomic Design)
- 原子（Atoms）

### カテゴリー（category）
- calendars

## ■ データ（Data）

### 【props】

- `events` (Array): 表示するイベントの配列。各イベントオブジェクトには以下のプロパティがあります：
  - `name` (string): イベント名
  - `start` (string): 開始日（YYYY-MM-DD）
  - `end` (string): 終了日（YYYY-MM-DD）
  - `color` (string): 表示用の色コード
  - `row` (number, optional): 週内の行番号（重なり防止用）
  - `offset` (number, optional): 週の開始日からのオフセット（0=日曜, 6=土曜）
  - `span` (number, optional): 週内での横幅（日数）
- `modelValue` (Event | null): 選択中のイベント。v-model対応。

### 【emits】

- `update:modelValue`: イベントバーをクリックしたときに発火し、クリックしたイベントオブジェクトを渡します。

## ■ 使用例（Usage Example）

```vue
<script setup lang="ts">
import { ref } from 'vue'
import EventCalendar from 'revuekitz/components/global/calendars/EventCalendar.vue'

interface Event {
  name: string
  start: string
  end: string
  color: string
}

const events = ref<Event[]>([
  { name: 'Event A', start: '2025-10-01', end: '2025-10-03', color: '#FF5733' },
  { name: 'Event B', start: '2025-10-04', end: '2025-10-04', color: '#33C3FF' },
  { name: 'Event C', start: '2025-10-05', end: '2025-10-07', color: '#33FF99' }
])

const selectedEvent = ref<Event | null>(null)
</script>

<template>
  <EventCalendar
    :events="events"
    v-model="selectedEvent"
  />
  <div>{{ selectedEvent }}</div>
</template>
```

</nuxt-content-wrapper>