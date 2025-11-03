<template>
  <div class="wrap">
    <table id="keyboard" class="sample">
      <tbody>
        <tr>
          <td class="space" colspan="3"></td>
          <td class="sharp" colspan="2"><button @click="sound('A#0')"></button></td>
          <td class="space" colspan="3"></td>
          <td class="space" colspan="3"></td>
          <td class="sharp" colspan="2"><button @click="sound('C#1')"></button></td>
          <td class="space" colspan="2"></td>
          <td class="sharp" colspan="2"><button @click="sound('D#1')"></button></td>
          <td class="space" colspan="3"></td>
          <td class="space" colspan="3"></td>
          <td class="sharp" colspan="2"><button @click="sound('F#1')"></button></td>
          <td class="space" colspan="2"></td>
          <td class="sharp" colspan="2"><button @click="sound('G#1')"></button></td>
          <td class="space" colspan="2"></td>
          <td class="sharp" colspan="2"><button @click="sound('A#1')"></button></td>
          <td class="space" colspan="3"></td>
          <td class="space" colspan="3"></td>
          <td class="sharp" colspan="2"><button @click="sound('C#2')"></button></td>
          <td class="space" colspan="2"></td>
          <td class="sharp" colspan="2"><button @click="sound('D#2')"></button></td>
          <td class="space" colspan="3"></td>
          <td class="space" colspan="3"></td>
          <td class="sharp" colspan="2"><button @click="sound('F#2')"></button></td>
          <td class="space" colspan="2"></td>
          <td class="sharp" colspan="2"><button @click="sound('G#2')"></button></td>
          <td class="space" colspan="2"></td>
          <td class="sharp" colspan="2"><button @click="sound('A#2')"></button></td>
          <td class="space" colspan="3"></td>
          <td class="space" colspan="3"></td>
          <td class="sharp" colspan="2"><button @click="sound('C#3')"></button></td>
          <td class="space" colspan="2"></td>
          <td class="sharp" colspan="2"><button @click="sound('D#3')"></button></td>
          <td class="space" colspan="3"></td>
          <td class="space" colspan="3"></td>
          <td class="sharp" colspan="2"><button @click="sound('F#3')"></button></td>
          <td class="space" colspan="2"></td>
          <td class="sharp" colspan="2"><button @click="sound('G#3')"></button></td>
          <td class="space" colspan="2"></td>
          <td class="sharp" colspan="2"><button @click="sound('A#3')"></button></td>
          <td class="space" colspan="3"></td>
          <td class="space" colspan="3"></td>
          <td class="sharp" colspan="2"><button @click="sound('C#4')"></button></td>
          <td class="space" colspan="2"></td>
          <td class="sharp" colspan="2"><button @click="sound('D#4')"></button></td>
          <td class="space" colspan="3"></td>
          <td class="space" colspan="3"></td>
          <td class="sharp" colspan="2"><button @click="sound('F#4')"></button></td>
          <td class="space" colspan="2"></td>
          <td class="sharp" colspan="2"><button @click="sound('G#4')"></button></td>
          <td class="space" colspan="2"></td>
          <td class="sharp" colspan="2"><button @click="sound('A#4')"></button></td>
          <td class="space" colspan="3"></td>
          <td class="space" colspan="3"></td>
          <td class="sharp" colspan="2"><button @click="sound('C#5')"></button></td>
          <td class="space" colspan="2"></td>
          <td class="sharp" colspan="2"><button @click="sound('D#5')"></button></td>
          <td class="space" colspan="3"></td>
          <td class="space" colspan="3"></td>
          <td class="sharp" colspan="2"><button @click="sound('F#5')"></button></td>
          <td class="space" colspan="2"></td>
          <td class="sharp" colspan="2"><button @click="sound('G#5')"></button></td>
          <td class="space" colspan="2"></td>
          <td class="sharp" colspan="2"><button @click="sound('A#5')"></button></td>
          <td class="space" colspan="3"></td>
          <td class="space" colspan="3"></td>
          <td class="sharp" colspan="2"><button @click="sound('C#6')"></button></td>
          <td class="space" colspan="2"></td>
          <td class="sharp" colspan="2"><button @click="sound('D#6')"></button></td>
          <td class="space" colspan="3"></td>
          <td class="space" colspan="3"></td>
          <td class="sharp" colspan="2"><button @click="sound('F#6')"></button></td>
          <td class="space" colspan="2"></td>
          <td class="sharp" colspan="2"><button @click="sound('G#6')"></button></td>
          <td class="space" colspan="2"></td>
          <td class="sharp" colspan="2"><button @click="sound('A#6')"></button></td>
          <td class="space" colspan="3"></td>
          <td class="space" colspan="3"></td>
          <td class="sharp" colspan="2"><button @click="sound('C#7')"></button></td>
          <td class="space" colspan="2"></td>
          <td class="sharp" colspan="2"><button @click="sound('D#7')"></button></td>
          <td class="space" colspan="3"></td>
          <td class="space" colspan="3"></td>
          <td class="sharp" colspan="2"><button @click="sound('F#7')"></button></td>
          <td class="space" colspan="2"></td>
          <td class="sharp" colspan="2"><button @click="sound('G#7')"></button></td>
          <td class="space" colspan="2"></td>
          <td class="sharp" colspan="2"><button @click="sound('A#7')"></button></td>
          <td class="space" colspan="3"></td>
          <td class="space" colspan="3"></td>

        </tr>
        <tr>
          <td class="white"  colspan="4"> <button @click="sound('A0')">A</button></td>
          <td class="white"  colspan="4"> <button @click="sound('B0')">B</button></td>
          <td class="white"  colspan="4"> <button @click="sound('C1')">C</button></td>
          <td class="white"  colspan="4"> <button @click="sound('D1')">D</button></td>
          <td class="white"  colspan="4"> <button @click="sound('E1')">E</button></td>
          <td class="white"  colspan="4"> <button @click="sound('F1')">F</button></td>
          <td class="white"  colspan="4"> <button @click="sound('G1')">G</button></td>
          <td class="white"  colspan="4"> <button @click="sound('A1')">A</button></td>
          <td class="white"  colspan="4"> <button @click="sound('B1')">B</button></td>
          <td class="white"  colspan="4"> <button @click="sound('C2')">C</button></td>
          <td class="white"  colspan="4"> <button @click="sound('D2')">D</button></td>
          <td class="white"  colspan="4"> <button @click="sound('E2')">E</button></td>
          <td class="white"  colspan="4"> <button @click="sound('F2')">F</button></td>
          <td class="white"  colspan="4"> <button @click="sound('G2')">G</button></td>
          <td class="white"  colspan="4"> <button @click="sound('A2')">A</button></td>
          <td class="white"  colspan="4"> <button @click="sound('B2')">B</button></td>
          <td class="white"  colspan="4"> <button @click="sound('C3')">C</button></td>
          <td class="white"  colspan="4"> <button @click="sound('D3')">D</button></td>
          <td class="white"  colspan="4"> <button @click="sound('E3')">E</button></td>
          <td class="white"  colspan="4"> <button @click="sound('F3')">F</button></td>
          <td class="white"  colspan="4"> <button @click="sound('G3')">G</button></td>
          <td class="white"  colspan="4"> <button @click="sound('A3')">A</button></td>
          <td class="white"  colspan="4"> <button @click="sound('B3')">B</button></td>
          <td class="white"  colspan="4"> <button @click="sound('C4')">C</button></td>
          <td class="white"  colspan="4"> <button @click="sound('D4')">D</button></td>
          <td class="white"  colspan="4"> <button @click="sound('E4')">E</button></td>
          <td class="white"  colspan="4"> <button @click="sound('F4')">F</button></td>
          <td class="white"  colspan="4"> <button @click="sound('G4')">G</button></td>
          <td class="white"  colspan="4"> <button @click="sound('A4')">A</button></td>
          <td class="white"  colspan="4"> <button @click="sound('B4')">B</button></td>
          <td class="white"  colspan="4"> <button @click="sound('C5')">C</button></td>
          <td class="white"  colspan="4"> <button @click="sound('D5')">D</button></td>
          <td class="white"  colspan="4"> <button @click="sound('E5')">E</button></td>
          <td class="white"  colspan="4"> <button @click="sound('F5')">F</button></td>
          <td class="white"  colspan="4"> <button @click="sound('G5')">G</button></td>
          <td class="white"  colspan="4"> <button @click="sound('A5')">A</button></td>
          <td class="white"  colspan="4"> <button @click="sound('B5')">B</button></td>
          <td class="white"  colspan="4"> <button @click="sound('C6')">C</button></td>
          <td class="white"  colspan="4"> <button @click="sound('D6')">D</button></td>
          <td class="white"  colspan="4"> <button @click="sound('E6')">E</button></td>
          <td class="white"  colspan="4"> <button @click="sound('F6')">F</button></td>
          <td class="white"  colspan="4"> <button @click="sound('G6')">G</button></td>
          <td class="white"  colspan="4"> <button @click="sound('A6')">A</button></td>
          <td class="white"  colspan="4"> <button @click="sound('B6')">B</button></td>
          <td class="white"  colspan="4"> <button @click="sound('C7')">C</button></td>
          <td class="white"  colspan="4"> <button @click="sound('D7')">D</button></td>
          <td class="white"  colspan="4"> <button @click="sound('E7')">E</button></td>
          <td class="white"  colspan="4"> <button @click="sound('F7')">F</button></td>
          <td class="white"  colspan="4"> <button @click="sound('G7')">G</button></td>
          <td class="white"  colspan="4"> <button @click="sound('A7')">A</button></td>
          <td class="white"  colspan="4"> <button @click="sound('B7')">B</button></td>
          <td class="white"  colspan="4"> <button @click="sound('C8')">C</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import * as Tone from 'tone'

export default {
  components:{
  },
  data: () => {
  return {
  }
},
  methods: {
    sound(scale) {
      const synth = new Tone.Synth().toDestination();
      synth.triggerAttackRelease(scale, '8n');
    },
  }
}
</script>
<style scoped>
button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
}
.wrap{
  overflow-x: scroll;
}
table#keyboard{
 width:1000px;
 border-collapse:collapse;
}
#keyboard td{
 height:150px;
 border-color:gray;
 border-width:1px;
 border-style:solid;
 text-align:center;
}
button{
  width:100%;
  height:100%;
  background-color: whitesmoke;
}
.white{
  width:50px; 
  height:80px; 
  border-top-width:0;
}
.sharp button{
  width:10px; 
  background-color: #999;
}
.space{
  width:15px; 
  border-bottom-width:0; 
  background-color: whitesmoke;
}
.wrap{
  width: 1000px;
  margin: 50px auto;
}
@media screen and (max-width: 480px){
.wrap{
  margin: 0 auto;
  padding: 0;
  width: 90%;  /* コンテンツが見切れて見えるようにする */
  overflow-x: auto;  /* 横スクロールの指定 */
  white-space: nowrap;  /* 横スクロールの指定 */
  -webkit-overflow-scrolling: touch;  /* スクロールを滑らかにする */
}
}


</style>