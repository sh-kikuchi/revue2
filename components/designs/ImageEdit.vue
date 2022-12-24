<template>
  <Wrapper>
    <Grid aOrder=0 bOrder=1>
      <template v-slot:aSide>
        <div class="pa-2">
          <h2>背景画像エフェクト</h2>
          <div>画像プレビュー</div>
          <div class="ma-3">
            <v-file-input label="File input"  ref="preview" @change="uploadFile" variant="underlined"></v-file-input>
          </div>
          <div class="blend-mode-area  mx-auto mb-10" :style="backgroundBlend"  style="border:1px dotted black"></div>
        </div>
      </template>
      <template v-slot:bSide>
        <div class="pa-2">
          <section>
            <label class="mt-3">背景画像色</label>
            <div class="mt-2 mb-3">
              background-color: {{ state.imgColor }}
              <input type="color" class="design-input" v-model="state.imgColor" />
            </div>
            <label>ブレンドモード</label>
            <select v-model="state.blendMode">
              <option value="nomal">nomal</option>
              <option value="multiply">multiply</option>
              <option value="screen">screen</option>
              <option value="overlay">overlay</option>
              <option value="darken">darken</option>
              <option value="lighten">lighten</option>
              <option value="color-dodge">color-dodge</option>
              <option value="color-burn">color-burn</option>
              <option value="hard-light">hard-light</option>
              <option value="soft-light">soft-light</option>
              <option value="difference">difference</option>
              <option value="hue">hue</option>
              <option value="saturation">saturation</option>
              <option value="color">color</option>
              <option value="luminosity">luminosity</option>
            </select>
          </section>
          <section>
            <h3>filter</h3>
            <label>filter: brightness({{ state.brightness }}%);</label>
            <input type="range" class="design-input" v-model="state.brightness" min="0" max="300" step="1">

            <label>filter: saturate({{ state.saturate }}%);</label>
            <input type="range" class="design-input" v-model="state.saturate" min="0" max="300" step="1">

            <label>filter: contrast({{ state.contrast }}%);</label>
            <input type="range" class="design-input" v-model="state.contrast" min="0" max="300" step="1">

            <label>filter: hue({{ state.hue }}%);</label>
            <input type="range" class="design-input" v-model="state.hue" min="0" max="360" step="1">

            <label>filter: grayscale({{ state.grayscale }}%);</label>
            <input type="range" class="design-input" v-model="state.grayscale" min="0" max="100" step="1">

            <label>filter: sepia({{ state.sepia }}%);</label>
            <input type="range" class="design-input" v-model="state.sepia" min="0" max="100" step="1">

            <label>filter: invert({{ state.invert }}%);</label>
            <input type="range" class="design-input" v-model="state.invert" min="0" max="100" step="1">

          </section>
          <section>
            <h3>shadow</h3>
            <div>drop-shadow({{ state.shadowX }} {{ state.shadowY }} {{ state.shadowBlur }}px
              {{ state.shadowColor }});</div>

            <label>X軸方向</label>
            <input type="range" class="design-input" v-model="state.shadowX" min="0" max="50" step="1">

            <label>Y軸方向</label>
            <input type="range" class="design-input" v-model="state.shadowY" min="0" max="50" step="1">

            <v-text-field type="number" class="mt-3" v-model="state.shadowBlur" clearable label="影のぼかし半径" variant="outlined"></v-text-field>

            <label>影の色</label>
            <v-color-picker v-model="state.shadowColor" class="mx-auto" style="width:300px;"></v-color-picker>
          </section>
        </div>
      </template>
    </Grid>
  </Wrapper>
</template>
<script setup>
import { computed } from 'vue';
import Wrapper from '../commons/Wrapper.vue';
import Grid from '../commons/Grid.vue';
const preview = ref(null);
const state = reactive({
  blendMode: "normal",
  imgColor: "#ffffff",
  hue: 0,
  brightness: 100,
  saturate: 100,
  contrast: 100,
  grayscale: 0,
  sepia: 0,
  invert: 0,
  opacity: 100,
  blur: 0,
  shadowX: 0,
  shadowY: 0,
  shadowBlur: 0,
  shadowColor: "#ffffff",
  url: "",
})

//upload a image
const uploadFile = () => {
  const file = preview.value.files[0];
  state.url = URL.createObjectURL(file);
  preview.value = "";
}

const backgroundBlend = computed(() => {
  return `background-image:url(${state.url});
          background-color:${state.imgColor};
          background-blend-mode: ${state.blendMode};
         filter:brightness(${state.brightness}%) saturate(${state.saturate}%) contrast(${state.contrast}%) hue-rotate(${state.hue}deg) grayscale(${state.grayscale}%) sepia(${state.sepia}%) invert(${state.invert}%) opacity(${state.opacity}%) blur(${state.blur}px) drop-shadow(${state.shadowX}px ${state.shadowY}px ${state.shadowBlur}px ${state.shadowColor});`;
})
</script>
<style>
.blend-mode-area {
  width: 300px;
  height: 300px;
  background-repeat: no-repeat;
  background-size: contain;
}
label{
  display: block;
  margin-top: 10px;
}
.design-input{
  width:100%;
  margin-top: 5px;
}
</style>
