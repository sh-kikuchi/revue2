import { defineStore } from 'pinia'

/** labelsストア */
export const useLabelsStore = defineStore('labels', {
  state: () => ({
    categories: [
      {
        name: "About",
        items: [
          { text: "このカードは初期表示用です" },
          { text: "カテゴリーごとにリストを作ることができる機能。" },
          { text: "カテゴリー追加でカードを増やすことができます" },
          { text: "カード内でリストを作ることができます" },
          { text: "LocalStorageを使用しております"},
          { text: "「データ全消去」でLocalStorageのデータを消すことが可能" },
          { text: "CSV出力することもできます" },
          { text: "個人情報の記載は自己責任でお願いします。" },
        ],
        toggle: true
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
        items: [],
        toggle: true
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
    getCsv(){
      let csv_data = "category_name" + "," + "item"  + "\f\n";
      //ダウンロードするCSVファイル名を指定する
      const filename = "labels.csv";
      this.categories.forEach((category) => {
        if(category["items"].length === 0){
          let csv_line = category["name"] + "," + '' +"\f\n";
          csv_data += csv_line;
        }else{
          category["items"].forEach((item)=>{
            let csv_line = category["name"] + "," + item["text"] +"\f\n";
            csv_data += csv_line;
          })
        }
      });
      //CSVデータ
      const data = csv_data;
      //BOMを付与する（Excelでの文字化け対策）
      const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
      //Blobでデータを作成する
      const blob = new Blob([bom, data], { type: "text/csv" });
      //BlobからオブジェクトURLを作成する（createObjectURL）
      const url = (window.URL || window.webkitURL).createObjectURL(blob);
      const download = document.createElement("a");
      download.href = url;
      download.download = filename;
      download.click();
      //createObjectURLで作成したオブジェクトURLを開放する
      (window.URL || window.webkitURL).revokeObjectURL(url);
    },
    toggleDisplay (categoryIndex: number) {
      this.categories[categoryIndex].toggle === true ? this.categories[categoryIndex].toggle = false : this.categories[categoryIndex].toggle = true;
    }
  },
})
