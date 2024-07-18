<script setup>
import Wrapper       from "@/components/global/layouts/Wrapper.vue";
import PageTitle     from "@/components/global/displays/PageTitle";
import BasicButton   from "@/components/global/buttons/BasicButton";
import Tooltip       from "@/components/global/displays/Tooltip"
import TextArea      from "@/components/global/fields/TextArea";
import FileField from "@/components/global/fields/FileField";
import TextField     from "@/components/global/fields/TextField";

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
<template>
  <PageTitle title="Careers" />
  <Wrapper>
    <div id="career">
      <div class="button-area flex justify-space-between overflow-x-auto">
          <div>
            <Tooltip tooltipPosition="top" tooltipContent="列追加">            
              <BasicButton
                type   = "button"
                effect = "btnPush"
                color  = "btnBlueGreen"
                v-on:click="add"
              >
                Add
              </BasicButton>
            </Tooltip>
            <Tooltip tooltipPosition="top" tooltipContent="CSV">  
              <BasicButton
                type   = "button"
                effect = "btnPush"
                color  = "btnPurple"
                v-on:click="downloadCSV"
              >
              Download
              </BasicButton>   
            </Tooltip>
          </div>
          <div>
            <Tooltip tooltipPosition="top" tooltipContent="CSV形式ファイルをアップロード出来ます">
              <FileField 
                @fileData = "fileChange"  
              />
            </Tooltip>
          </div>
      </div>
      <table class="ma-2 table-scroll">
          <thead>
            <tr>
              <th class="text-left date-col">開始日</th>
              <th class="text-left date-col">終了日</th>
              <th class="text-left company-col">企業名</th>
              <th class="text-left text-nowrap">
                業務内容
                <small>※カンマ入れないで下さい</small>
              </th>
              <th class="destroy-col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in state.careers" :key="index">
              <td>
                <TextField v-model:binding-value="item.startDate" />
              </td>
              <td>
                <TextField
                  :value ="item.endDate"
                  v-model:alue-binding-value="item.endDate"
                />
              </td>
              <td>
                <TextField
                  :value ="item.company"
                  v-model:binding-value="item.company"
                />
              </td>
              <td>
                <TextArea
                  v-model:binding-value="item.task"
                ></TextArea>                 
              </td>
              <td class="text-center">
                <span v-on:click="destroy">&times;</span>
              </td>
            </tr>
          </tbody>
      </table>
    </div>
  </Wrapper>
</template>
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
table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }

    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
      background-color: whitesmoke;
    }

    th {
      background-color: whitesmoke;
    }

    tr:hover {
      background-color: lightcyan;
    }
</style>
