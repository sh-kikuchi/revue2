<script setup>
import 'revuekitz/dist/style.css'
import { BasicButton,ToolTip,PageTitle,TextField, MultiLineField,FileField } from 'revuekitz'
import { LayoutWrapper } from 'revuekitz'
// import FileField from "@/components/global/fields/FileField";

const careers = ref([
  {
    startDate: "2022/01/01",
    endDate: "2022/03/31",
    company: "●×テクノ",
    task: "■ 案件名 ■ 人数  ■ 役割  ■ スキル/ツール  ■ 案件概要",
  },
]);

//CSVアップロード
const fileChange = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  careers.value = [];
  const tmpCareers = [];
  reader.onload = () => {
    const lines = reader.result.split("\n");
    lines.shift();
    lines.forEach((element) => {
      const careerData = element.split(",");
      if (careerData.length != 4) return;
      tmpCareers.push({
        company: careerData[0],
        startDate: careerData[1],
        endDate: careerData[2],
        task: careerData[3].replace(/<br>/g, "\r\n"),
      });
    });
    careers.value = tmpCareers;
  };
  reader.readAsText(file, "Shift_JIS");

  // onloadはreadAsBinaryStringでファイルを読み込んだ後に実行されます.
  reader.onload = loadFunc;
  reader.readAsText(file, "Shift_JIS");
}

const downloadCSV = () => {
  let csv_data =
    "company,startDate,endDate,task\f\n";
  const filename = "download.csv";

  careers.value.forEach((el) => {
    const csv_line =
      el.company +
      "," +
      el.startDate +
      "," +
      el.endDate +
      "," +
      el.task.replace(/\r?\n/g, "<br>") +
      "\f\n";
    csv_data += csv_line;
  });

  const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
  const blob = new Blob([bom, csv_data], { type: "text/csv" });

  const url = (window.URL || window.webkitURL).createObjectURL(blob);
  const download = document.createElement("a");
  download.href = url;
  download.download = filename;
  download.click();
  (window.URL || window.webkitURL).revokeObjectURL(url);
};

const add = () => {
  careers.value.unshift({
    startDate: "",
    endDate: "",
    company: "",
    task: "■ 案件名 \f\n ■ 人数 \f\n ■ 役割 \f\n ■ スキル/ツール \f\n  ■ 案件概要",
  });
};

const destroy = (index) => {
  careers.value.splice(index, 1);
};

</script>
<template>
  <PageTitle>Careers</PageTitle>
  <LayoutWrapper>
    <div id="career">
      <div class="button-area flex justify-space-between overflow-x-auto">
          <div>
            <ToolTip tooltipPosition="top">
              <template v-slot:toolTipBtn>
                <BasicButton
                  type="button"
                  :style="{ margin: '10px' }"
                  @click="add"
                >
                  Add
                </BasicButton>
              </template>
              <template v-slot:toolTipContent>
                列追加
              </template>
            </ToolTip>
            <ToolTip tooltipPosition="top">
              <template v-slot:toolTipBtn>
                <BasicButton
                  type="button"
                  :style="{ margin: '10px' }"
                  @click="downloadCSV"
                >
                  Download
                </BasicButton>
              </template>
              <template v-slot:toolTipContent>
                CSV
              </template>
            </ToolTip>
          </div>
          <div>
            <Tooltip tooltipPosition="top" tooltipContent="CSV形式ファイルをアップロード出来ます">
              <FileField 
                @change = "fileChange"  
              >ファイル選択</FileField>
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
            <tr v-for="(item, index) in careers" :key="index">
              <td>
                <TextField v-model="item.startDate" />
              </td>
              <td>
                <TextField v-model="item.endDate"/>
              </td>
              <td>
                <TextField v-model="item.company"/>
              </td>
              <td>
                <MultiLineField v-model="item.task"></MultiLineField>                 
              </td>
              <td class="text-center">
                <span v-on:click="destroy">&times;</span>
              </td>
            </tr>
          </tbody>
      </table>
    </div>
  </LayoutWrapper>
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
