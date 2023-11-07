<template>
  <div class="mx-auto mt-4 text-center">
    <v-container fluid>
      <p>{{ state.selected }}</p>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-checkbox
          v-model="state.selected"
          label="半角英字"
          value="abcdefghijklmnopqrstuvwxyz"
          :rules="selectedRules"
        ></v-checkbox>
        <v-checkbox
          v-model="state.selected"
          label="全角英字"
          value="ABCDEFGHIJKLMNOPQISTUVWXYZ"
          :rules="state.selectedRules"
        ></v-checkbox>
        <v-checkbox
          v-model="state.selected"
          label="数字"
          value="1234567890"
          :rules="state.selectedRules"
        ></v-checkbox>
        <v-checkbox
          v-model="state.selected"
          label="特殊文字(!#$%&*+./=@_)"
          value="!#$%&*+./=@_"
          :rules="state.selectedRules"
        ></v-checkbox>
        <v-text-field
          v-model.number="state.stringLength"
          label="文字数"
          hint="0~1000以内"
          required
          :rules="state.stringLengthRules"
        ></v-text-field>
        <v-btn block v-on:click="generate" class="mt-3"> Generate </v-btn>
      </v-form>
      <v-textarea
        outlined
        name="input-7-4"
        label="ここに生成されるよ"
        v-model="state.randomStringArea"
        counter="1000"
        class="mt-3"
      ></v-textarea>
    </v-container>
  </div>
</template>
<script setup>

const state = reactive({
  selected: [],
  stringLength: 0,
  randomStringArea: "",
  valid: true,
  stringLengthRules: [(v) => !!v || "必須入力"],
});

const generate = () => {
  if (state.selected.length === 0 || state.selected === undefined) {
    alert("チェックボックスは最低でも1つ選択して下さい");
    return;
  } else if (state.stringLength < 0 || state.stringLength > 1000) {
    alert("0から1000字の間の数字を入力して下さい");
    return;
  }

  let randomString = "";
  let selectedString = state.selected.join(",");
  let selectedLength = selectedString.length;

  for (let i = 0; i < state.stringLength; i++) {
    randomString +=
      selectedString[Math.floor(Math.random() * selectedLength)];
  }
  state.randomStringArea = randomString;
}
</script>
<style scoped>
</style>
