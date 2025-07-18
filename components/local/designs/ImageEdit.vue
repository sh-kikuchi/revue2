<script setup>
import { computed, ref } from 'vue';
import 'revuekitz/dist/style.css';
import { ColorField, FileField, NumberField, SelectField, RangeField } from 'revuekitz'
import { GridColumn } from 'revuekitz'
import { GridRow } from 'revuekitz'
import { LayoutWrapper } from 'revuekitz'

const selectItems = ref([
    { text: 'nomal',       value: 'nomal' },
    { text: 'multiply',    value: 'multiply' },
    { text: 'screen',      value: 'screen' },
    { text: 'overlay',     value: 'overlay' },
    { text: 'darken',      value: 'darken' },
    { text: 'lighten',     value: 'lighten' },
    { text: 'color-dodge', value: 'color-dodge' },
    { text: 'color-burn',  value: 'color-burn' },
    { text: 'hard-light',  value: 'hard-light' },
    { text: 'soft-light',  value: 'soft-light' },
    { text: 'difference',  value: 'difference' },
    { text: 'hue',         value: 'hue' },
    { text: 'saturation',  value: 'saturation' },
    { text: 'color',       value: 'color' },
    { text: 'luminosity',  value: 'luminosity' },
]);

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

const fileData = ref<File | null>(null);

//upload a image
const handleFileChange = (event) => {
  const target = event.target;
  if (target.files && target.files[0]) {
      state.url = URL.createObjectURL(target.files[0]);
  }
};

const backgroundBlend = computed(() => {
  return `background-image:url(${state.url});
          background-color:${state.imgColor};
          background-blend-mode: ${state.blendMode};
         filter:brightness(${state.brightness}%) saturate(${state.saturate}%) contrast(${state.contrast}%) hue-rotate(${state.hue}deg) grayscale(${state.grayscale}%) sepia(${state.sepia}%) invert(${state.invert}%) opacity(${state.opacity}%) blur(${state.blur}px) drop-shadow(${state.shadowX}px ${state.shadowY}px ${state.shadowBlur}px ${state.shadowColor});`;
})
</script>
<template>
  <LayoutWrapper>
    <GridRow>
      <GridColumn :lg_cols="6" :cols="6" :sm_cols="12">
        <div class="pa-2">
          <h2>背景画像エフェクト</h2>
          <div>画像プレビュー</div>
          <div class="mx-auto" style="margin-bottom: 10px;">
            <FileField v-model="fileData" @change="handleFileChange">ファイル選択</FileField>
            {{ fileData ? fileData.name : null }}
          </div>
          <div class="blend-mode-area  mx-auto" :style="backgroundBlend"></div>
        </div>
      </GridColumn>
      <GridColumn :lg_cols="6" :cols="6" :sm_cols="12">
        <div class="pa-2">
          <section>
            <label class="mt-3">背景画像色</label>
            <div class="mt-2 mb-3">
              background-color: {{ state.imgColor }}
                <ColorField 
                  v-model="state.imgColor" 
                />
            </div>
            <label>ブレンドモード</label>
            <SelectField 
              :options="selectItems" 
              v-model="state.blendMode" 
            />
          </section>
          <section>
            <h3>filter</h3>
            <div>
              <label>filter: brightness({{ state.brightness }}%);</label>
              <RangeField 
                min="0"
                max="300"
                step="1"
                width ="300"
                bgColor = "lightgrey"
                v-model="state.brightness" 
              />
            </div>
            <div>
              <label>filter: saturate({{ state.saturate }}%);</label>
              <RangeField 
                min="0"
                max="300"
                step="1"
                width ="300"
                bgColor = "lightgrey"
                v-model="state.saturate" 
              />
            </div>
            <div>
              <label>filter: contrast({{ state.contrast }}%);</label>
              <RangeField 
                min="0"
                max="300"
                step="1"
                width ="300"
                bgColor = "lightgrey"
                v-model="state.contrast" 
              />
            </div>
            <div>
              <label>filter: hue({{ state.hue }}%);</label>
              <RangeField 
                min="0"
                max="360"
                step="1"
                width ="300"
                bgColor = "lightgrey"
                v-model="state.hue" 
              />
            </div>
            <div>
              <label>filter: grayscale({{ state.grayscale }}%);</label>
              <RangeField 
                min="0"
                max="100"
                step="1"
                width ="300"
                bgColor = "lightgrey"
                v-model="state.grayscale" 
              />
            </div>
            <div>
              <label>filter: sepia({{ state.sepia }}%);</label>
              <RangeField 
                min="0"
                max="100"
                step="1"
                width ="300"
                bgColor = "lightgrey"
                v-model="state.sepia" 
              />
            </div>
            <div>
              <label>filter: invert({{ state.invert }}%);</label>
              <RangeField 
                min="0"
                max="100"
                step="1"
                width ="300"
                bgColor = "lightgrey"
                v-model="state.invert" 
              />
            </div>
          </section>
          <section>
            <h3>shadow</h3>
            <div>drop-shadow({{ state.shadowX }} {{ state.shadowY }} {{ state.shadowBlur }}px
              {{ state.shadowColor }});</div>

            <div>
              <label>X軸方向</label>
              <RangeField 
                  min="0"
                  max="50"
                  step="1"
                  width ="300"
                  bgColor = "lightgrey"
                  v-model="state.shadowX" 
                />
            </div>
            <div>
              <label>Y軸方向</label>
              <RangeField 
                min="0"
                max="50"
                step="1"
                width ="300"
                bgColor = "lightgrey"
                v-model="state.shadowY" 
              />
            </div>
            <div>
              <label>影のぼかし半径</label>
              <NumberField 
                width ="300"
                v-model="state.shadowBlur"  
              />
            </div>
            <label>影の色</label>
            <ColorField 
                v-model="state.shadowColor" 
              />
          </section>
        </div>
      </GridColumn>
    </GridRow>
  </LayoutWrapper>
</template>
<style>
.blend-mode-area {
  width: 300px;
  height: 300px;
  background-repeat: no-repeat;
  background-size: contain;
  border:1px dotted black
}
label{
  display: block;
  margin-top: 10px;
}
.design-input{
  width:100%;
  margin-top: 5px;
}
select{
  width: 250px;
  border: 1px solid black;
  padding: 3px;
  margin-bottom: 5px;
  border-radius: 15px;
}
</style>
