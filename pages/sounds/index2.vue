<template>
    <section class="note">
      <input type="radio" value="1n"  v-model="note" /><label for="1n">全音符</label>
      <input type="radio" value="2n"  v-model="note" /><label for="2n">2分音符</label>
      <input type="radio" value="4n"  v-model="note" /><label for="4n">4分音符</label>
      <input type="radio" value="8n"  v-model="note" /><label for="8n">8分音符</label>
      <input type="radio" value="16n" v-model="note" /><label for="16n">16分音符</label>
    </section>
    <div class="scale">
      <input type="button" value="ド"   @click="sound('C4')">
      <input type="button" value="レ"   @click="sound('D4')">
      <input type="button" value="ミ"   @click="sound('E4')">
      <input type="button" value="ファ" @click="sound('F4')">
      <input type="button" value="ソ"   @click="sound('G4')">
      <input type="button" value="ラ"   @click="sound('A4')">
      <input type="button" value="シ"   @click="sound('B4')">
      <input type="button" value="ド"   @click="sound('C5')">
    </div>
    <main>
  <div class="beat">
    <button @click="beat">Beat</button>
  </div>
  <div class="sequence">
    <button @click="sequence">Sequence</button>
  </div>
  <div class="chord">
    <button @click="chord">Chord</button>
  </div>
  <div class="playBtn">
    <button @click="playBtn">playBtn</button>
  </div>

  {{ text }}
    <FormInput v-model:value-name="text" />
    <FormRadio 
      :items = array
      v-model:selected-input="selectedItem" 
    />  
     <div> selectedItem: {{ selectedItem }} </div>
    <FormCheckBox 
      :valueName = "ねこ"
      v-model:checked="checkedItem" 
    />
    <div> checkedItem :{{ checkedItem }} </div>
    <FormSelect 
      v-model:selected-item="selectedItem2" 
    />
    <div> selectedItem2 :{{ selectedItem2 }} </div>
    <FormInput
      v-model:value-name="test" 
      type="range"
    />

</main>
  </template>
  
  <script>
  import * as Tone from 'tone'
  import FormInput from "@/components/global/inputs/FormInput.vue"
  import FormInputNumber from "@/components/global/inputs/FormInputNumber.vue"
  import FormRadio from "@/components/global/inputs/FormRadio.vue"
  import FormCheckBox from "@/components/global/inputs/FormCheckBox.vue"
  import FormSelect from "@/components/global/inputs/FormSelect.vue"

  
  export default {
    components:{
      FormInput,
      FormRadio,
      FormSelect,
      FormCheckBox
    },
    data: () => {
    return {
      text: 'text23',
      selectedItem: '',
      checkedItem: '',
      selectedItem2: 'test',
      array: ["A", "B", "C"],
      note: '1n',
      //エンベロープ（キック）
      optsMembrane : {
        pitchDecay: 0.011,
        envelope: {
          attack: 0.001 ,
          decay: 0.90 ,
          sustain: 0.01 ,
          release: 0.05 
        },
        volume: 25
      },
      // エンベロープ（スネア）
      optsNoiseSnare : {
        envelope: {
          attack: 0.001 ,
          decay: 0.5 ,
          sustain: 0
        }
      },
      // エンベロープ（ハイハット）
      optsNoiseHihat : {
        type: "brown",
        envelope: {
          attack: 0.001 ,
          decay: 0.05 ,
          sustain: 0
        }
      }
    };
  },
    methods: {
      sound(scale) {
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease(scale, this.note);
      },
      beat(){
        //シンセ生成
        const membrane = new Tone.MembraneSynth(this.optsMembrane).toDestination();
        const noise1   = new Tone.NoiseSynth(this.optsNoiseSnare).toDestination();
        const noise2   = new Tone.NoiseSynth(this.optsNoiseHihat).toDestination();

        // シンセ実行
        const kick = () => {
          membrane.triggerAttackRelease('C0','2n'); 
        };

        const snare = () => {
          noise1.triggerAttackRelease('8n');
        };

        const hihat = () => {
          noise2.triggerAttackRelease('32n');
        };

        // ループ設定
        let count = 1;
        var loop = new Tone.Loop((time) => {
          if(count === 1 || count === 5){
            kick();
          
          } else if(count === 3 || count === 7){
            // snare();
            snare();
            hihat();
          } else {
            kick();
            hihat();
          
          }
          if(count === 8){
            count = 1;
          } else {
            count++;
          }
        }, '8n').start(0);
        Tone.Transport.bpm.value = 128;
        Tone.Transport.toggle();
      }, 
      sequence(){
        //ドミレファラソドシ　数字はオクターブ
        const melodyList = ['C3', 'E3', 'D3', 'F3', 'A3' ,'G3', 'C4' ,'B3']; 
        const synth = new Tone.DuoSynth().toDestination();
        //リバーブエフェクト
        const reverb = new Tone.Freeverb().toDestination(); 
        synth.connect(reverb); 
        //演奏
        const setPlay = (time, note) =>{
          synth.triggerAttackRelease(note, '16n', time); 
        };
        let melody = new Tone.Sequence(setPlay, melodyList).start(); 
        melody.loop =5;
        Tone.Transport.bpm.value = 120;
        Tone.Transport.start();
      },
      chord(){
        var C_chord = ['C4', 'E4', 'G4', 'B4']; 
        var D_chord = ['D4', 'F4', 'A4', 'C5']; 
        var G_chord = ['B3', 'D4', 'E4', 'A4']; 
        var chordMelody = [ 
        ['0:0:2', C_chord], 
        ['0:1:0', C_chord], 
        ['0:1:2', D_chord], 
        ['0:2:2', C_chord], 
        ['0:3:0', C_chord], 
        ['0:3:2', G_chord] 
        ]; 
        var synth = new Tone.PolySynth().toMaster(); 
        function setPlay(time, note) { 
        synth.triggerAttackRelease(note, '32n', time); 
        } 
        var melody = new Tone.Part(setPlay, chordMelody); 
        melody.start(); 
        melody.loop = 2; 
        Tone.Transport.start();
      },
      playBtn(){
        const synth = new Tone.Synth().toDestination();
        //const feedbackDelay = new Tone.FeedbackDelay("8n", 0.7);
        const feedbackDelay = new Tone.FeedbackDelay({
          delayTime: 0.7,
          feedback: 0.6,
          //maxDelay: 2,
          wet: 0.9
        });

        synth.connect(feedbackDelay);
        feedbackDelay.toDestination();

        if(Tone.context.state !== "running"){
          Tone.start();
        }
        synth.triggerAttackRelease("C4", "8n")
      }
    }
   
  }
  </script>
  <style>
  input[type="button"]{
    width: 50px;
    height: 50px;
  }
  </style>