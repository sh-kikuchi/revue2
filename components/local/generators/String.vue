<script setup>
import 'revuekitz/dist/style.css'
import { CheckBoxField, NumberField } from 'revuekitz'
import 'revuekitz/dist/style.css'
import { BasicButton } from 'revuekitz'

const selected         = ref([]);
const halfWidthChar    = ref(false);
const fullWidthChar    = ref(false);
const halfWidthNumber  = ref(false);
const specialChar      = ref(false);
const stringLength     = ref(0);
const randomStringArea = ref('');


const generate = () => {
  selected.value = [];

  // チェックされている項目だけ配列に追加
  if (halfWidthChar.value)    selected.value.push("abcdefghijklmnopqrstuvwxyz");
  if (fullWidthChar.value)    selected.value.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  if (halfWidthNumber.value)  selected.value.push("0123456789");
  if (specialChar.value)      selected.value.push("!#$%&*+./=@_");

  // エラーチェック
  if (selected.value.length === 0) {
    alert("チェックボックスは最低でも1つ選択して下さい");
    return;
  }
  if (stringLength.value <= 0 || stringLength.value > 1000) {
    alert("0から1000字の間の数字を入力して下さい");
    return;
  }

  // 文字列生成
  const allChars = selected.value.join(""); // すべての選択文字列を結合
  let randomString = "";

  for (let i = 0; i < stringLength.value; i++) {
    const randIndex = Math.floor(Math.random() * allChars.length);
    randomString += allChars[randIndex];
  }

  randomStringArea.value = randomString;
}
</script>
<template>
  <div class="input-area">
    <div class="checkbox">
      <CheckBoxField
        item = "abcdefghijklmnopqrstuvwxyz"
        label="半角英字"
        v-model:checked="halfWidthChar" 
      />
    </div>
    <div class="checkbox">
      <CheckBoxField
        class="checkbox"
        item = "ABCDEFGHIJKLMNOPQISTUVWXYZ"
        label="全角英字"
        v-model:checked="fullWidthChar" 
      />
    </div>
    <div class="checkbox">
      <CheckBoxField
          item = "1234567890"
          label="数字"
          v-model:checked="halfWidthNumber" 
        />
    </div>
    <div class="checkbox">
      <CheckBoxField
        item = "!#$%&*+./=@_"
        label="特殊文字(!#$%&*+./=@_)"
        v-model:checked="specialChar" 
      />
    </div>
    <div class="input-number">
      <label>文字数</label>
      <NumberField 
        v-model="stringLength" 
      />
    </div>
    <div style="display: flex; justify-content: center;">
      <BasicButton
        type   = "button"
        :style="{ marginTop: '15px', color: 'white', backgroundColor: 'blue' }"
       @click="generate"
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
