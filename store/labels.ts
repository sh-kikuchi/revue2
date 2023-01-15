import { defineStore } from 'pinia'



/** labelsストア */
export const useLabelsStore = defineStore('labels', {
  state: () => ({
    open: ["test"],
    categories: [
      {
        name: "test",
        children: [
          {
            title: "items",
            date: "2022/06/10",
            memo: "記入例",
            labels: [
              { text: "まずはお読み下さい" },
              { text: "カテゴリー/アイテムはEnterで追加" },
              { text: "カテゴリーの移動可" },
              { text: "カテゴリー間のアイテム移動可" },
              { text: "ご自身ブラウザにのみ保存されます。" },
              { text: "LocalStorage(F12キー)を確認！" },
              { text: "個人情報は記載しないこと！" },
            ],
          },
        ]
      },
    ],
  }),
  actions: {
    addCategory(categoryName: string) {
      this.open.push(categoryName);
      this.categories.push({
        name: categoryName,
        children: [
          // {
          //   title: "No Title",
          //   date: "",
          //   memo: "",
          //   labels: [
          //     { text: "" },
          //   ],
          // },
        ]
      })
    },
    deleteCategory(categoryIndex: number) {
      this.open.splice(categoryIndex, 1);
      this.categories.splice(categoryIndex, 1);
    },
    addItem(itemName: string, categoryIndex: number) {
      this.categories[categoryIndex].children.push({
        title: itemName,
        date: "",
        memo: "",
        labels: [
          { text: "" },
        ],
      },);
    },
    deleteItem(categoryIndex: number, itemIndex: number) {
      this.categories[categoryIndex].children.splice(itemIndex, 1);
    },
    saveItem(saveData: any) {
      this.categories[saveData.categoryIndex].children[saveData.itemIndex] = {
        title: saveData.title,
        date: saveData.date,
        memo: saveData.memo,
        labels: saveData.labels
      };
      // this.open[saveData.categoryIndex] = saveData.title;
    },
  },
  persist: true,
})
