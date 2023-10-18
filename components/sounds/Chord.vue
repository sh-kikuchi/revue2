<template>
<div class="chord">
  <button @click="chord">Chord</button>
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

  }
}
</script>
<style>
input[type="button"]{
  width: 50px;
  height: 50px;
}
</style>