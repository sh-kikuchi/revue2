---
title: 【revuekitz】GridColumn
description:
category: vue
createdAt: 2024-07-01
updatedAt: 2024-07-01
sortNumber: 601
path: "/articles/vue/601_grid_column"
---

## ■ 概要（Overview）
### コンポーネント名
- GridColumn

### レベル (Atomic Design)
- 原子（Atomic）

### カテゴリー（Category）
- layouts

## ■ データ（Data）

### 【reactive/ref】
（なし）

### 【props】
- `cols` (Number): カラム数
- `sm_cols` (Number): スモールスクリーンサイズでのカラム数

### 【emit】
（なし）

### 【computed】
- getColClass: `props.cols` と `props.sm_cols` に基づいて適切なクラスを生成する

## ■ イベント（Event）
(なし)

## ■ 依存関係（Dependency）
- GridRowと合わせて使う

## ■ 使用例（Usecase）
```vue
  <GridRow>
    <GridColumn :cols="6" :sm_cols="12">
      <div>Column 1</div>
    </GridColumn>
    <GridColumn :cols="6" :sm_cols="12">
      <div>Column 2</div>
    </GridColumn>
  </GridRow>
</template>

```