<template>
  <Wrapper>
    <div id="timer">
      <div class="time">
        {{ formatTime }}
      </div>
    </div>
    <div>
      <button v-on:click="start" v-if="!timerOn">Start</button>
      <button v-on:click="stop" v-if="timerOn">Stop</button>
    </div>
  </Wrapper>
</template>
<script setup>
import Wrapper from '../commons/Wrapper.vue';

const min = ref(25);
const sec = ref(0);
const timerOn = ref(false);
const timerObj = ref(null);
const workTimeFlg = ref(true);
const shortRestFlg = ref(false);

const count = () => {
  if (sec.value <= 0 && min.value >= 1) {
    min.value--;
    sec.value = 59;
  } else if (sec.value <= 0 && min.value <= 0) {
   //complete();
    change();
  } else {
   sec.value--;
  }
}

const start = () => {
  timerObj.value = setInterval(function () { count() }, 1000)
  timerOn.value = true; //timerがONであることを状態として保持
}

const stop = () => {
  clearInterval(timerObj.value);
  timerOn.value = false; //timerがOFFであることを状態として保持
}

const complete = () => {
  clearInterval(timerObj.value)
}

const change = () => {
  clearInterval(timerObj.value)
  if (workTimeFlg.value === true && shortRestFlg.value === false) {
    min.value = 5;
    sec.value = 0;
    workTimeFlg.value = false;
    shortRestFlg.value = true;
  } else if (workTimeFlg.value === false && shortRestFlg.value === true) {
    min.value = 25;
    sec.value = 0;
    workTimeFlg.value = true;
    shortRestFlg.value = false;
  }

  start();
}

const formatTime = computed(() =>{
  let timeStrings = [
    min.value.toString(),
    sec.value.toString()
  ].map(function (str) {
    if (str.length < 2) {
      return "0" + str
    } else {
      return str
    }
  })
      return timeStrings[0] + ":" + timeStrings[1]
}
)

</script>
<style scoped>
#timer {
  display: flex;
  align-items: center;
  justify-content: center;
}

.time {
  height: 250px;
  font-size: 100px;
  display: flex;
    align-items: center;
    justify-content: center;
}
</style>
