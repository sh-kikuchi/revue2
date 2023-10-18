<template>
  <div class="sequence">
    <button @click="sequence">Sequence</button>
  </div>
</template>
<script>
import * as Tone from 'tone'
export default {
  data: () => {
  return {
  };
},
  methods: {
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
  }
}
</script>
<style>
input[type="button"]{
  width: 50px;
  height: 50px;
}
</style>