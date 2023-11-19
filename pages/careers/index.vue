<template>
  <PageTitle title="Careers" />
  <Wrapper>
    <div id="career">
      <div class="text-center pt-2">
        <ul>
          <li>業務内容の記入ではカンマ入れないで下さい</li>
          <li>「CSV出力」を押下するとCSV形式でダウンロードできます</li>
          <li>「ファイル選択」でCSV形式ファイルをアップロード可</li>
        </ul>
      </div>
      <div class="button-area d-flex justify-space-between overflow-x-auto">
        <v-tooltip top class="ml-2">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ma-2"
              outlined large fab
              color="indigo"
              v-on:click="add" v-bind="attrs" v-on="on"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>
          <span>行を追加</span>
        </v-tooltip>
        <div>
          <button class="csv-download-button mb-2" @click="downloadCSV">
            <v-icon>mdi-download</v-icon>
            CSVダウンロード
          </button>
          <input type="file" class="csv-read-button" @change="fileChange" />
        </div>
      </div>
      <v-table class="ma-2 overflow-x-auto">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left date-col">開始日</th>
              <th class="text-left date-col">終了日</th>
              <th class="text-left company-col">企業名</th>
              <th class="text-left task-col">業務内容</th>
              <th class="destroy-col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in state.careers" :key="index">
              <td>
                <input type="text" v-model="item.startDate" />
              </td>
              <td>
                <input type="text" v-model="item.endDate" />
              </td>
              <td>
                <input type="text" v-model="item.company" class="input-company" />
              </td>
              <td><textarea v-model="item.task"></textarea></td>
              <td>
                <button v-on:click="destroy">
                  <v-icon>mdi-delete</v-icon>
                </button>
              </td>
            </tr>
          </tbody>
        </template>
      </v-table>
    </div>
  </Wrapper>

</template>
<script setup>
import { reactive } from 'vue';
import Wrapper   from "@/components/public/atoms/layouts/Wrapper.vue";
import PageTitle from "@/components/public/atoms/layouts/PageTitle";

const state = reactive({
  careers: [
    {
      startDate: "2022/01/01",
      endDate: "2022/03/31",
      company: "●×テクノ",
      task: "■ 案件名 ■ 人数  ■ 役割  ■ スキル/ツール  ■ 案件概要",
    },
  ],
});

//CSVアップロード
const fileChange = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  const careers = [];
  const loadFunc = () => {
    const lines = reader.result.split("\n");
    lines.shift();
    lines.forEach((element) => {
      const careerData = element.split(",");
      if (careerData.length != 4) return;
      const career = {
        company: careerData[0],
        startDate: careerData[1],
        endDate: careerData[2],
        task: careerData[3].replace(/<br>/g, "\r\n"),
      };
      careers.push(career);
    });
    state.careers = careers;
  };

  // onloadはreadAsBinaryStringでファイルを読み込んだ後に実行されます.
  reader.onload = loadFunc;
  reader.readAsText(file, "Shift_JIS");
}

const downloadCSV = () => {
  let csv_data =
    "company" + "," + "startDate" + "," + "endDate" + "," + "task" + "\f\n";
  //ダウンロードするCSVファイル名を指定する
  const filename = "download.csv";

  state.careers.forEach((el) => {
    let csv_line =
      el["company"] +
      "," +
      el["startDate"] +
      "," +
      el["endDate"] +
      "," +
      el["task"].replace(/\r?\n/g, " <br>") +
      "\f\n";
    csv_data += csv_line;
  });

  //CSVデータ
  const data = csv_data;
  //BOMを付与する（Excelでの文字化け対策）
  const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
  //Blobでデータを作成する
  const blob = new Blob([bom, data], { type: "text/csv" });

  //IE10/11用(download属性が機能しないためmsSaveBlobを使用）
  if (window.navigator.msSaveBlob) {
    window.navigator.msSaveBlob(blob, filename);
    //その他ブラウザ
  } else {
    //BlobからオブジェクトURLを作成する（createObjectURL）
    const url = (window.URL || window.webkitURL).createObjectURL(blob);
    const download = document.createElement("a");
    download.href = url;
    download.download = filename;
    download.click();
    //createObjectURLで作成したオブジェクトURLを開放する
    (window.URL || window.webkitURL).revokeObjectURL(url);
  }
}

const add = () => {
  //行追加
  state.careers.unshift({
    startDate: "",
    endDate: "",
    company: "",
    task: "■ 案件名 \f\n ■ 人数 \f\n ■ 役割 \f\n ■ スキル/ツール \f\n  ■ 案件概要",
  });
}

const destroy = (index) => {
  //行削除
  state.careers.splice(index, 1);
}

</script>
<style scoped>
li {
  list-style: none;
}

.date-col {
  width: 75px;
}

.company-col {
  width: 200px;
}

.input-company {
  display: block;
  width: 200px;
}

textarea {
  width: 100%;
}

.destroy-col {
  width: 75px;
}

.csv-upload-button,
.csv-download-button {
  display: block;
}
</style>
