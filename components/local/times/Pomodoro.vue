<template>
  <Wrapper>
    <div class="text-center work-count">{{ Cycle }}ワーク目</div>
    <div id="timer">
      <Grid aOrder="first" bOrder="last">
        <template v-slot:aSide>
          <div class="text-center time my-3">
          {{ formatTime }}
          </div>
        </template>
        <template v-slot:bSide>
          <div class="text-center status my-2">
            <div v-if="shortRestFlg===true">小休憩中</div>
            <div v-else-if="longRestFlg===true">休憩中</div>
            <div v-else>作業中</div>
          </div>
        </template>
      </Grid>
    </div>
    <div class="text-center my-3">
        <v-btn variant="flat" color="secondary" v-if="!timerOn" v-on:click="start">Start</v-btn>
        <v-btn depressed color="error" v-if="timerOn" v-on:click="stop">Stop</v-btn>
    </div>
    <div>
      <v-text-field label="ワークタイム（分）" v-model="workMin"></v-text-field>
      <v-text-field label="小休憩（分）" v-model="shortRestMin"></v-text-field>
      <v-text-field label="長休憩（分）" v-model="longRestMin"></v-text-field>
      <v-text-field label="長休憩までのワーク回数" v-model="CycleSet"></v-text-field>
    </div>
  </Wrapper>
</template>
<script setup>
import Wrapper from '@/components/global/layouts/Wrapper.vue';
import Grid from "@/components/global/layouts/Grid.vue";
const min = ref(0);
const sec = ref(0);
const workMin = ref(25);
const shortRestMin = ref(5);
const longRestMin = ref(10);
const timerOn = ref(false);
const timerObj = ref(null);
const workTimeFlg = ref(true);
const shortRestFlg = ref(false);
const longRestFlg = ref(false);
const Cycle = ref(0);
const CycleSet = ref(0);

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
  if (workTimeFlg.value === true) {
    min.value = workMin.value;
  } else if (shortRestFlg.value === true) {
    min.value = shortRestMin.value;
  } else {
    min.value = longRestMin.value;
  }
  sec.value = 0;
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

  if (workTimeFlg.value === true) {
    Cycle.value++;
  }

  //休憩フラグ
  if ((Cycle.value % CycleSet.value) == 0 && workTimeFlg.value === true) {
    workTimeFlg.value = false;
    shortRestFlg.value = false;
    longRestFlg.value = true;
  } else if ((Cycle.value % CycleSet.value) != 0 && workTimeFlg.value === true) {
    workTimeFlg.value = false;
    shortRestFlg.value = true;
    longRestFlg.value = false;
  } else if (workTimeFlg.value === false){
    workTimeFlg.value = true;
    shortRestFlg.value = false;
    longRestFlg.value = false;
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
.work-count{
  padding-top: 5px;
  font-size: 25px;
}
#timer {
  display: flex;
  align-items: center;
  justify-content: center;
}

.time {
  font-size: 100px;
}
.status {
  font-size: 50px;
}
</style>
