<template>
  <Wrapper>
    <Grid aOrder=0 bOrder=1>
      <template v-slot:aSide>
        <div class="pa-2">
          <h2>背景画像エフェクト</h2>
          <div>画像プレビュー</div>
          <div class="ma-3 mx-auto">
            <FormInputFile 
              @fileData = "emitFileData"  
            />

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
                <FormInputColor 
                  v-model:selected-color="state.imgColor" 
                />
            </div>
            <label>ブレンドモード</label>
            <FormSelect 
              :options="selectItems" 
              v-model:selected-item="state.blendMode" 
            />
          </section>
          <section>
            <h3>filter</h3>
            <div>
              <label>filter: brightness({{ state.brightness }}%);</label>
              <FormInputRange 
                min="0"
                max="300"
                step="1"
                width ="300"
                bgColor = "lightgrey"
                v-model:range-value="state.brightness" 
              />
            </div>
            <div>
              <label>filter: saturate({{ state.saturate }}%);</label>
              <FormInputRange 
                min="0"
                max="300"
                step="1"
                width ="300"
                bgColor = "lightgrey"
                v-model:range-value="state.saturate" 
              />
            </div>
            <div>
              <label>filter: contrast({{ state.contrast }}%);</label>
              <FormInputRange 
                min="0"
                max="300"
                step="1"
                width ="300"
                bgColor = "lightgrey"
                v-model:range-value="state.contrast" 
              />
            </div>
            <div>
              <label>filter: hue({{ state.hue }}%);</label>
              <FormInputRange 
                min="0"
                max="360"
                step="1"
                width ="300"
                bgColor = "lightgrey"
                v-model:range-value="state.hue" 
              />
            </div>
            <div>
              <label>filter: grayscale({{ state.grayscale }}%);</label>
              <FormInputRange 
                min="0"
                max="100"
                step="1"
                width ="300"
                bgColor = "lightgrey"
                v-model:range-value="state.grayscale" 
              />
            </div>
            <div>
              <label>filter: sepia({{ state.sepia }}%);</label>
              <FormInputRange 
                min="0"
                max="100"
                step="1"
                width ="300"
                bgColor = "lightgrey"
                v-model:range-value="state.sepia" 
              />
            </div>
            <div>
              <label>filter: invert({{ state.invert }}%);</label>
              <FormInputRange 
                min="0"
                max="100"
                step="1"
                width ="300"
                bgColor = "lightgrey"
                v-model:range-value="state.invert" 
              />
            </div>
          </section>
          <section>
            <h3>shadow</h3>
            <div>drop-shadow({{ state.shadowX }} {{ state.shadowY }} {{ state.shadowBlur }}px
              {{ state.shadowColor }});</div>

            <div>
              <label>X軸方向</label>
              <FormInputRange 
                  min="0"
                  max="50"
                  step="1"
                  width ="300"
                  bgColor = "lightgrey"
                  v-model:range-value="state.shadowX" 
                />
            </div>
            <div>
              <label>Y軸方向</label>
              <FormInputRange 
                min="0"
                max="50"
                step="1"
                width ="300"
                bgColor = "lightgrey"
                v-model:range-value="state.shadowY" 
              />
            </div>
            <div>
              <label>影のぼかし半径</label>
              <FormInputNumber 
                width ="300"
                v-model:number="state.shadowBlur"  
              />
            </div>


            <!-- <v-text-field type="number" class="mt-3" v-model="state.shadowBlur" clearable label="影のぼかし半径" variant="outlined"></v-text-field> -->

            <label>影の色</label>
            <FormInputColor 
                v-model:selected-color="state.shadowColor" 
              />
          </section>
        </div>
      </template>
    </Grid>
  </Wrapper>
</template>
<script setup>
import { computed } from 'vue';
import Wrapper from '~~/components/public/atoms/layouts/Wrapper.vue';
import Grid from '~~/components/public/atoms/layouts/Grid.vue';
import FormInputColor from "~~/components/public/atoms/inputs/FormInputColor.vue"
import FormInputRange from "~~/components/public/atoms/inputs/FormInputRange.vue"
import FormInputNumber from "~~/components/public/atoms/inputs/FormInputNumber.vue"
import FormSelect from "~~/components/public/atoms/inputs/FormSelect.vue"
import FormInputFile from "~~/components/public/atoms/inputs/FormInputFile.vue"
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

//upload a image
const emitFileData = (fileData) =>{
  state.url = URL.createObjectURL(fileData);

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
select{
  width: 250px;
  border: 1px solid black;
  padding: 3px;
  margin-bottom: 5px;
  border-radius: 15px;
}
</style>
