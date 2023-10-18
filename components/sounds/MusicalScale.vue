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
</template>
<script>
import * as Tone from 'tone'
export default {
  data: () => {
    return {
      note: '1n',
    };
  },
  methods: {
    sound(scale) {
      const synth = new Tone.Synth().toDestination();
      synth.triggerAttackRelease(scale, this.note);
    }
  }
};
</script>
<style scoped>
input[type="button"]{
  width: 50px;
  height: 50px;
}
</style>