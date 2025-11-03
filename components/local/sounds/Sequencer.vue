<script setup>
import * as Tone from 'tone'
import { ref, reactive, computed } from 'vue'
import { RadioField, PushButton, RangeField, GridRow, GridColumn } from 'revuekitz'
import 'revuekitz/dist/style.css'

// 時間表示用
const timedisp = ref(0)
const btnValue = ref('▶')
const bpm = ref(115)
const currentCount = ref(0);

// 再生状態フラグ
const isPlaying = ref(false);

// シンセオプション
const optsMembrane = { pitchDecay: 0.011, envelope: { attack: 0.001, decay: 0.9, sustain: 0.01, release: 0.05 }, volume: 25 }
const optsNoiseSnare = { envelope: { attack: 0.001, decay: 0.5, sustain: 0 } }
const optsNoiseHihat = { type: 'brown', envelope: { attack: 0.001, decay: 0.05, sustain: 0 } }

// リズム
const rhythmOptions = ['4','8']
const selectedRhythm = ref(4)
const selectedLabel = computed(() => selectedRhythm.value)

// チェックボックスの状態管理
const checkedItems = reactive({
  kick: Array(selectedRhythm.value).fill(false),
  snare: Array(selectedRhythm.value).fill(false),
  hihat: Array(selectedRhythm.value).fill(false),
})

// 配列長が変わったらリセット
watch(selectedRhythm, (newVal) => {
  checkedItems.kick = Array(Number(newVal)).fill(false)
  checkedItems.snare = Array(Number(newVal)).fill(false)
  checkedItems.hihat = Array(Number(newVal)).fill(false)
})

// クリックでトグル
const toggleBeat = (type, index) => {
  checkedItems[type][index] = !checkedItems[type][index]
}

// 再生関数
const beat = async () => {
  btnValue.value = '■'
  await Tone.start()

  const membrane = new Tone.MembraneSynth(optsMembrane).toDestination()
  const noise1 = new Tone.NoiseSynth(optsNoiseSnare).toDestination()
  const noise2 = new Tone.NoiseSynth(optsNoiseHihat).toDestination()

  const kickSound = () => membrane.triggerAttackRelease('C0','2n')
  const snareSound = () => noise1.triggerAttackRelease('8n')
  const hihatSound = () => noise2.triggerAttackRelease('32n')

  let count = 0
  const loop = new Tone.Loop((time) => {
    timedisp.value = time

    currentCount.value = count;

    if(checkedItems.kick[count]) kickSound()
    if(checkedItems.snare[count]) snareSound()
    if(checkedItems.hihat[count]) hihatSound()

    count = (count + 1) % Number(selectedRhythm.value);


  },`${Number(selectedRhythm.value)}n`)

  loop.start(0)
  const transport = Tone.getTransport()
  transport.bpm.value = bpm.value

  if(transport.state === 'started'){
    transport.stop()
    transport.cancel()
    btnValue.value = '▶'
    isPlaying.value = false 
  } else {
    transport.start()
     isPlaying.value = true;
  }
}
</script>
<template>
  <div class="sequencer">
    <GridRow>
      <GridColumn :cols="12" :sm_cols="12" :lg_cols="12">
        <!-- 再生ボタン -->
        <section class="sequencer-play-button-area">
          <div>
            <!-- <label class="sequencer-play-button-explain">再生</label> -->
            <PushButton
              class="sequencer-play-buttonn"
              :style="{ width: '50px', color: 'white', backgroundColor: 'rgb(62, 60, 65)' }"
              @click="beat"
            >
              {{ btnValue }}
            </PushButton>
          </div>
        </section>
         <section class="sequencer-rhythm-area">
          <div>
            <label class="sequencer-rhythm-explain">ステップ長:{{ selectedLabel }}拍子</label>
            <RadioField
               :style="{ display: 'flex' , width: '100px' }"
               :items="rhythmOptions"
               v-model="selectedRhythm"
               :is-disabled="isPlaying"
            />        
          </div>
        </section>
        <section class="sequencer-bpm-area">
          <div>
            <label class="sequencer-bpm-explain">BPM:1分間あたりの拍数: {{ bpm }} BPM</label>
            <RangeField
              :style="{ width: '200px' }"
              :min="30"
              :max="240"
              :step="1"
              v-model="bpm"
              :is-disabled="isPlaying"
            />
          </div>
        </section>
        <!-- ビートグリッド -->
        <section 
          class="sequencer-beat-grid-area"
          :class="{ disabled: isPlaying }"
        >
          <div>          
            <label class="sequencer-beat-grid-explain">シンセ設定</label>
            <div class="sequencer-beat-grid-content">
            
              <!-- ヘッダー行 -->
              <GridRow>
                <!-- 左端ラベル空白 -->
                <GridColumn class="sequencer-beat-grid-row-name"><div></div></GridColumn>
                <!-- 連番 -->
                <GridColumn
                  v-for="(n, index) in Number(selectedRhythm)"
                  :key="'header' + n"
                  class="sequencer-beat-grid-header"
                  :class="{ active: currentCount+1 === n }"
                > <div class="text-center">{{ n }}</div>
                </GridColumn>
              </GridRow>

              <!-- KICK行 -->
              <GridRow>
                <GridColumn class="sequencer-beat-grid-row-name"><div>kick</div></GridColumn>
                <GridColumn
                  v-for="(active, i) in checkedItems.kick"
                  :key="'kick' + i"
                  class="sequencer-beat-grid-beat-box"
                  :class="{ active, disabled: isPlaying }"
                  @click="toggleBeat('kick', i)"
                />
              </GridRow>

              <!-- SNARE行 -->
              <GridRow>
                <GridColumn class="sequencer-beat-grid-row-name"><div>snare</div></GridColumn>
                <GridColumn
                  v-for="(active, i) in checkedItems.snare"
                  :key="'snare' + i"
                  class="sequencer-beat-grid-beat-box"
                  :class="{ active, disabled: isPlaying }"
                  @click="toggleBeat('snare', i)"
                />
              </GridRow>

              <!-- HIHAT行 -->
              <GridRow>
                <GridColumn class="sequencer-beat-grid-row-name"><div>hihat</div></GridColumn>
                <GridColumn
                  v-for="(active, i) in checkedItems.hihat"
                  :key="'hihat' + i"
                  class="sequencer-beat-grid-beat-box"
                  :class="{ active, disabled: isPlaying }"
                  @click="toggleBeat('hihat', i)"
                />
              </GridRow>
            </div>
          </div>
        </section>
      </GridColumn>
    </GridRow> 
  </div>
</template>

<style scoped>
/* 本コンポーネント共通設定 */
.sequencer-play-button-area, 
.sequencer-rhythm-area,
.sequencer-bpm-area,
.sequencer-beat-grid-area {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.sequencer-play-button-explain,
.sequencer-rhythm-explain,
.sequencer-bpm-explain,
.sequencer-beat-grid-explain {
  width: 300px;
  display: block;
  background-color: rgb(62, 60, 65);
  margin-bottom: 5px;
  padding: 5px;
  color: whitesmoke;
}

/* ビートグリッド：全体 */
.sequencer-beat-grid-content {
   width: 300px;
  margin: 0 auto;
  overflow-x: auto;
}

/* ビートグリッド：ヘッダー */
.sequencer-beat-grid-header{
  width: 60px;
  margin: 5px;
  margin: 0 auto;
  color: whitesmoke;
}

.sequencer-beat-grid-header.active { 
  background-color: rgb(62, 60, 65); 
}

.sequencer-beat-grid-row-name {
  width: 50px;
}

/* ビートグリッド：シンセ部 */
.sequencer-beat-grid-beat-box {
  width: 50px;
  height: 50px;
  border-radius: 4px;
  background-color: whitesmoke;
  margin: 5px;
  cursor: pointer;
}

.sequencer-beat-grid-beat-box.active { 
  background-color: rgb(62, 60, 65); 
}

/* ← クリックを無効化 */
.sequencer-beat-grid-beat-box.disabled {
  opacity: 0.5;
  pointer-events: none; 
}

</style>
