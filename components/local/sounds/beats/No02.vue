<script setup>
import * as Tone from 'tone'

const timedisp = ref(0);
const btnValue = ref('▶');
const optsMembrane = ref({
  pitchDecay: 0.011,
  envelope: {
    attack: 0.001 ,
    decay: 0.90 ,
    sustain: 0.01 ,
    release: 0.05 
  },
  volume: 25
})
const optsNoiseSnare = ref({
  envelope: {
    attack: 0.001 ,
    decay: 0.5 ,
    sustain: 0
  }
})
const optsNoiseHihat = ref({
  type: "brown",
  envelope: {
    attack: 0.001 ,
    decay: 0.05 ,
    sustain: 0
  }
})


const beat = () =>{
  btnValue.value = '■';
  // Create Synth
  const membrane = new Tone.MembraneSynth(optsMembrane).toDestination();
  const noise1   = new Tone.NoiseSynth(optsNoiseSnare).toDestination();
  const noise2   = new Tone.NoiseSynth(optsNoiseHihat).toDestination();

  // Play Synth
  const kick = () => {
    membrane.triggerAttackRelease('C0','2n'); 
  };

  const snare = () => {
    noise1.triggerAttackRelease('8n');
  };

  const hihat = () => {
    noise2.triggerAttackRelease('32n');
  };

// 8BEAT
let count = 1;
new Tone.Loop((time) => {
  timedisp.value = time;
  switch (count) {
    case 1:
    kick();
      break;
    case 2:
      snare();
      break;
    case 3:
      snare();
      break;
    case 4:
      kick();
      break;
    case 5:
      kick();
      break;
    case 6:
      snare();
      break;
    case 7:
      kick();
      break;
    case 8:
      hihat();
      break;
  }

  if (count === 8) {
    count = 1;
  } else {
    count++;
  }
}, '8n').start(0);
  Tone.Transport.bpm.value = 108;
  Tone.Transport.toggle();
  if(Tone.Transport.state==="stopped"){
    Tone.Transport.cancel();
    btnValue.value = '▶';

  }
}
</script>

<template>
<div class="beat">
  <button class="marble" @click="beat">{{btnValue}}</button>{{ timedisp }}
</div>
</template>

<style>
.marble{
  border-color: transparent;
  margin: 5px;
  font-size: 25px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>