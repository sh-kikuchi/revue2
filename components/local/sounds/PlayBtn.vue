<template>
  <div class="playBtn">
    <button @click="playBtn">playBtn</button>
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