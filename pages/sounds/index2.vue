<script setup>
import { ref } from 'vue';
import TextField from "@/components/global/fields/TextField.vue";
import NumberField from "@/components/global/fields/NumberField.vue";
import MoneyField from "@/components/global/fields/MoneyField.vue";
import RadioField from "@/components/global/fields/RadioField.vue";
import CheckBoxField from "@/components/global/fields/CheckBoxField.vue";
import SelectField from "@/components/global/fields/SelectField.vue";
import RangeField from "@/components/global/fields/RangeField.vue";
import FileField from "@/components/global/fields/FileField.vue";
import ColorField from "@/components/global/fields/ColorField.vue";
import DataTable from '@/components/global/tables/DataTable.vue';
import ReleaseNote from '@/assets/json/relese_note.json';

const text = ref('text');
const number = ref(100);
const money = ref('djxfhdks');
const checkedItem = ref('');
const selectedItem = ref('A');
const array = ref(["A", "B", "C"]);
const rangeValue = ref('');
const fileData = ref(null);
const selectedColor = ref('');

const getFileData = (targetFile) => {
  console.log(targetFile);
  fileData.value = targetFile.name;
};


</script>
<template>
  <section>
    <label>TextField</label>
    <div>
      <TextField 
        v-model:binding-value="text" 
      />
    </div>
    <div>{{ text }}</div>
  </section>
  <section>
    <label>NumberField</label>
    <div>
      <NumberField
        v-model:number ="number" 
      />
    </div>
    <div>{{ number }}</div>
  </section>
  <section>
    <label>MoneyField</label>
    <div>
      <MoneyField
        v-model:money ="money" 
      />
    </div>
    <div>{{ money }}</div>
  </section>
  <section>
    <label>RadioField</label>
    <div>
      <RadioField 
        :items = array
        accentColor= "red"
        v-model:radio="selectedItem" 
      />  
    </div>
    <div>{{ selectedItem }}</div>
  </section>
  <section>
    <label>CheckBoxField</label>
    <div>
      <CheckBoxField 
        item = "ねこ"
        label = "dog"
        accentColor= "red"
        isChecked = true
        v-model:checked="checkedItem" 
      />  
    </div>
    <div>{{ checkedItem }}</div>
  </section>
  <section>
    <label>SelectField</label>
    <div>
      <SelectField 
        v-model:selected-item="selectedItem" 
      />  
    </div>
    <div>{{ selectedItem }} </div>
  </section>
  <section>
    <label>RadioField</label>
    <div>
      <RangeField
        v-model:range-value="rangeValue" 
      />  
    </div>
    <div> {{ rangeValue }} </div>
  </section>
  <section>
    <label>FileField</label>
    <div style="margin-top: 15px; margin-bottom: 15px;">
      <FileField
        @fileData ="getFileData" 
      />
    </div>
    <div> {{ fileData }} </div>
  </section>
  <section>
    <label>ColorField</label>
    <div style="margin-top: 15px; margin-bottom: 15px;">
      <ColorField
        v-model:selected-color="selectedColor" 
      />
    </div>
    <div> {{ selectedColor }} </div>
  </section>
  <section>
    <label>DataTable</label>
    <div style="margin-top: 15px; margin-bottom: 15px;">
      <DataTable
        :items= "ReleaseNote"
        :seach_mode=true
      />
    </div>
  </section>

  


  </template>
  <style>
  section{
    margin: 20px;
  }
  input[type="button"]{
    width: 50px;
    height: 50px;
  }
  </style>