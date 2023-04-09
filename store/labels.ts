import { defineStore } from 'pinia'

/** labelsストア */
export const useLabelsStore = defineStore('labels', {
  state: () => ({
    categories: [
      {
        name: "test",
        items: [
          { text: "まずはお読み下さい" },
          { text: "カテゴリー/アイテムはEnterで追加" },
          { text: "カテゴリーの移動可" },
          { text: "カテゴリー間のアイテム移動可" },
          { text: "ご自身ブラウザにのみ保存されます。" },
          { text: "LocalStorage(F12キー)を確認！" },
          { text: "個人情報は記載しないこと！" },
        ]
      },
    ],
  }),
  persist: {
    storage: persistedState.localStorage,
  },
  actions: {
    addCategory(categoryName: string) {
      this.categories.push({
        name: categoryName,
        items: []
      })
    },
    deleteCategory(categoryIndex: number) {
      this.categories.splice(categoryIndex, 1);
    },
    addItem(itemName: string, categoryIndex: number) {
      this.categories[categoryIndex].items.push({
        text: itemName
      });
    },
    deleteItem(categoryIndex: number, itemIndex: number) {
      this.categories[categoryIndex].items.splice(itemIndex, 1);
    },

  },
})
