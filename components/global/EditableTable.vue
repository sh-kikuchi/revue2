<script lang="ts">
// 列の定義。key は行データのキー、type で入力欄の種類を切り替える
export type Column = {
  key: string;
  label: string;
  type?: "text" | "number" | "date" | "textarea";
};
export type Row = Record<string, string | number>;
</script>

<script setup lang="ts">
const props = defineProps<{ columns: Column[] }>();
// 行のデータは親と v-model でつながる
const rows = defineModel<Row[]>({ required: true });

// 列の定義から、空の行を作る
const emptyRow = (): Row => Object.fromEntries(props.columns.map((col) => [col.key, ""]));

const addRow = () => {
  rows.value = [...rows.value, emptyRow()];
};

// 押した行の番号を受け取って、その行だけ消す
const removeRow = (index: number) => {
  rows.value = rows.value.filter((_, i) => i !== index);
};
</script>

<template>
  <div class="editable-table">
    <table>
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.key">{{ col.label }}</th>
          <th class="actions-col"><span class="visually-hidden">操作</span></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="index">
          <td v-for="col in columns" :key="col.key">
            <textarea
              v-if="col.type === 'textarea'"
              v-model="row[col.key]"
              :aria-label="col.label"
            />
            <input
              v-else
              :type="col.type ?? 'text'"
              v-model="row[col.key]"
              :aria-label="col.label"
            />
          </td>
          <td class="actions-col">
            <button type="button" :aria-label="`${index + 1}行目を削除`" @click="removeRow(index)">
              ×
            </button>
          </td>
        </tr>
        <tr v-if="rows.length === 0">
          <td :colspan="columns.length + 1" class="empty">データなし</td>
        </tr>
      </tbody>
    </table>
    <button type="button" class="add-button" @click="addRow">行を追加</button>
  </div>
</template>

<style scoped>
.editable-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 6px 8px;
  text-align: left;
  border: 1px solid #ddd;
  background-color: whitesmoke;
}

input,
textarea {
  box-sizing: border-box;
  width: 100%;
  min-width: 6em;
  padding: 4px 6px;
  font: inherit;
}

.actions-col {
  width: 48px;
  text-align: center;
}

.empty {
  color: #666;
}

.add-button {
  margin-top: 8px;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}
</style>
