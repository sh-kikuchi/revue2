<script setup>
import { marked } from "marked";
import 'revuekitz/dist/style.css'
import { BasicButton } from 'revuekitz'
import Tab from '@/components/global/navigations/Tab';
import TextArea from "@/components/global/fields/TextArea";
import Wrapper from "@/components/global/layouts/Wrapper"
import PageTitle from "@/components/global/displays/PageTitle"
import FileField from "@/components/global/fields/FileField";
import _ from 'lodash';
const debounce = _.debounce;

const textarea = ref("## text");
// convert to HTML
const compiledMarkdown = computed(() => marked(textarea.value));
// update state
const stateUpdate = debounce((e) => {
  textarea.value = e.target.value;
}, 1000);
//download
const downloadMarkdown = () =>{
  const editArea = document.getElementById('editArea').value;
  let  blob = new Blob([editArea], { type: 'text/markdown' });
  let link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = 'output.md';
  link.click();
}
//upload
const uploadMarkdown = (e) =>{
  const mdInput = document.getElementById('mdInput');
  const file = mdInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      textarea.value = e.target.result;
    };
    reader.readAsText(file);
  } 
}
</script>
<template>
  <Wrapper>
    <div class="page-title"><PageTitle title="Markdown to HTML" /></div>
    <!-- <div class=" text-center">PCでご利用頂けます。</div> -->
    <div class="">
      <Tab
        :tabs = "['EDIT','PREVIEW']"
        :width = 300
        class="tab"
      >
        <template v-slot:content0>
          <div class="action-link pc">

            <BasicButton
                type   = "button"
                :style="{ margin: '10px', color: 'white', backgroundColor: 'blue' }"
                v-on:click="downloadMarkdown"
            >ダウンロード</BasicButton>
          </div>
          <div>
              <TextArea
                v-model:value-txt="textarea"
                id = "editArea"
                class="edit-area"
                :rows="50"
                :cols="100" 
                @input="stateUpdate(textarea)"
            ></TextArea>
          </div>
        </template>
        <template v-slot:content1>
          <div class="action-link">
            <div  class="pc">
              <FileField
                id="mdInput"
                @fileData = "uploadMarkdown"  
              />

            </div>
            <BasicButton
                type   = "button"
                :style="{ margin: '10px', color: 'white', backgroundColor: 'blue' }"
                onclick = "window.print()"
            >印刷/PDF</BasicButton>
          </div>
            <div class="markdown-area" v-html="compiledMarkdown"></div>
        </template>
      </Tab>
    </div>
  </Wrapper>
</template>
<style>
.tab{
  max-width: 850px;
  margin: 0 auto;
}
.action-link{
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  text-align: right;
  padding-bottom: 15px;
}
code {
  color: #f66;
}
/* for PC */
@media (min-width: 769px) {
  .edit-area,
  .markdown-area {
    display: block;
    width: 210mm; /* A4横幅 */
    height: 297mm; /* A4縦幅 */
    margin: 0 auto;
    resize: vertical;
    border: transparent;
    border-radius: 15px;
    padding: 30px !important;
    background-color: whitesmoke;
  }
  .sp {
    display: none;
  }
}
/* for smartphone */
@media (max-width: 768px) {
  .edit-area,
  .markdown-area {
    display: block;
    width: 100%; /* A4横幅 */
   
    margin: 0 auto;
    resize: vertical;
    border: transparent;
    border-radius: 15px;
    padding: 30px !important;
    background-color: whitesmoke;
  }
  .pc {
    height: 100cm;
    display: none;
  }
}

/* hide in print */
@media print {
  header,
  footer,
  nav,
  a,
  .page-title,
  .action-link,
  .tabnav {
    display: none !important;
    padding: 0;
  }
  .markdown-area {
    size: A4 portrait;
    margin: 0mm;

    margin: 0; /* マージンをなくす */
  }

}
</style>