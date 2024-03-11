<script setup>
import BasicButton from "@/components/global/buttons/BasicButton"
import FormCheckBox from "@/components/global/inputs/FormCheckBox.vue"
import FormInputNumber from "@/components/global/inputs/FormInputNumber.vue"
import TextArea from "@/components/global/textfield/TextArea.vue"

const selected         = ref([]);
const halfWidthChar    = ref('');
const fullWidthChar    = ref('');
const halfWidthNumber  = ref('');
const specialChar      = ref('');
const stringLength     = ref(0);
const randomStringArea = ref('');


const generate = () => {
  selected.value = [];
  halfWidthChar.value !== '' ? selected.value.push(halfWidthChar.value): null
  fullWidthChar.value !== '' ? selected.value.push(fullWidthChar.value): null
  halfWidthNumber.value !== '' ? selected.value.push(halfWidthNumber.value): null
  specialChar.value !== '' ? selected.value.push(specialChar.value): null

  if (selected.value.length === 0 || selected.value === undefined) {
    alert("チェックボックスは最低でも1つ選択して下さい");
    return;
  } else if (stringLength.value < 0 || stringLength.value > 1000) {
    alert("0から1000字の間の数字を入力して下さい");
    return;
  }

  let randomString = "";
  let selectedString = selected.value.join(",");
  let selectedLength = selectedString.length;

  for (let i = 0; i < stringLength.value; i++) {
    randomString += selectedString[Math.floor(Math.random() * selectedLength)];
  }

 console.log(randomString); 
  randomStringArea.value = randomString;

}
</script>
<template>
  <div class="input-area">
    <div class="checkbox">
      <FormCheckBox
        valueName = "abcdefghijklmnopqrstuvwxyz"
        label="半角英字"
        v-model:checked="halfWidthChar" 
      />
    </div>
    <div class="checkbox">
      <FormCheckBox
        class="checkbox"
        valueName = "ABCDEFGHIJKLMNOPQISTUVWXYZ"
        label="全角英字"
        v-model:checked="fullWidthChar" 
      />
    </div>
    <div class="checkbox">
      <FormCheckBox
          valueName = "1234567890"
          label="数字"
          v-model:checked="halfWidthNumber" 
        />
    </div>
    <div class="checkbox">
      <FormCheckBox
        valueName = "!#$%&*+./=@_"
        label="特殊文字(!#$%&*+./=@_)"
        v-model:checked="specialChar" 
      />
    </div>
    <div class="input-number">
      <label>文字数</label>
      <FormInputNumber 
        v-model:number="stringLength" 
      />
    </div>
    <div style="display: flex; justify-content: center;">
      <BasicButton
        type   = "button"
        effect = "btnPush"
        color  = "btnBlueGreen"
        v-on:click="generate"
      >
        Generate
      </BasicButton>
    </div>
    <div class="result-area">
      {{ randomStringArea }}
    </div>
  </div>
</template>
<style scoped>
.input-area{
  max-width: 300px;
  margin: 0 auto;
  padding: 10px;
}
.result-area{
  padding: 5px;
  max-width: 800px;
  margin: 0 auto;
  word-break: break-all;
}
.checkbox{
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
