<script setup>
const props =  defineProps({
  id: {
    type: String,
    default: ''
  },
  class: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: ''
  },
  effect: {
    type: String,
    default: '' /* btnFloat or btnBorder or btnPush */
  },
  color: {
    type: String,
    default: '' /* btnBlueGreen btnLightBlue btnOrange btnPurple */
  }
})

const btnClass = computed(() => {
  return `${props.class} button ${props.effect} ${props.color}`;
});

</script>
<template>
  <button 
    :id    = "props.id"
    :class = "btnClass"
    :name  = "props.name"
    :type  = "props.type"
  >
    <slot></slot>
  </button>
</template>
<style scoped>
button,
button:visited {
  text-decoration: none;
  color: #00AE68;
}

button.button {
  display: block;
  position: relative;
  /* float: left; */
  width: 100px;
  padding: 0;
  margin: 10px 20px 10px 0;
  font-weight: 600;
  text-align: center;
  line-height: 25px;
  color: #FFF;
  border-radius: 5px;
  transition: all 0.2s ;
}

.btnBlueGreen {
  background: #00AE68;
}

.btnLightBlue {
  background: #5DC8CD;
}

.btnOrange {
  background: #FFAA40;
}

.btnPurple {
  background: #A74982;
}

/* FADE */
.btnFade.btnBlueGreen:hover {
  background: #21825B;
}

.btnFade.btnLightBlue:hover {
  background: #01939A;
}

.btnFade.btnOrange:hover {
  background: #FF8E00;
}

.btnFade.btnPurple:hover {
  background: #6D184B;
}

/* 3D */
.btnBlueGreen.btnPush {
  box-shadow: 0px 5px 0px 0px #007144;
}

.btnLightBlue.btnPush {
  box-shadow: 0px 5px 0px 0px #1E8185;
}

.btnOrange.btnPush {
  box-shadow: 0px 5px 0px 0px #A66615;
}

.btnPurple.btnPush {
  box-shadow: 0px 5px 0px 0px #6D184B;
}

.btnPush:hover {
  margin-top: 15px;
  margin-bottom: 5px;
}

.btnBlueGreen.btnPush:hover {
  box-shadow: 0px 0px 0px 0px #007144;
}

.btnLightBlue.btnPush:hover {
  box-shadow: 0px 0px 0px 0px #1E8185;
}

.btnOrange.btnPush:hover {
  box-shadow: 0px 0px 0px 0px #A66615;
}

.btnPurple.btnPush:hover {
  box-shadow: 0px 0px 0px 0px #6D184B;
}

/* BORDER */
.btnBlueGreen.btnBorder {
  box-shadow: 0px 0px 0px 0px #21825B;
}

.btnBlueGreen.btnBorder:hover {
  box-shadow: 0px 0px 0px 5px #21825B;
}

.btnLightBlue.btnBorder {
  box-shadow: 0px 0px 0px 0px #01939A;
}

.btnLightBlue.btnBorder:hover {
  box-shadow: 0px 0px 0px 5px #01939A;
}

.btnOrange.btnBorder {
  box-shadow: 0px 0px 0px 0px #A66615;
}

.btnOrange.btnBorder:hover {
  box-shadow: 0px 0px 0px 5px #A66615;
}

.btnPurple.btnBorder {
  box-shadow: 0px 0px 0px 0px #6D184B;
}

.btnPurple.btnBorder:hover {
  box-shadow: 0px 0px 0px 5px #6D184B;
}

/* FLOAT */
.btnFloat {
  background: none;
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);
}

.btnFloat:before {
  content: 'Float';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 120px;
  height: 50px;
  border-radius: 5px;
  transition: all 0.2s ;
}

.btnBlueGreen.btnFloat:before {
  background: #00AE68;
}

.btnLightBlue.btnFloat:before {
  background: #5DC8CD;
}

.btnOrange.btnFloat:before {
  background: #FFAA40;
}

.btnPurple.btnFloat:before {
  background: #8D336A;
}

.btnFloat:before {
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.4);
}

.btnFloat:hover:before {
  margin-top: -2px;
  margin-left: 0px;
  transform: scale(1.1,1.1);
  -ms-transform: scale(1.1,1.1);
  -webkit-transform: scale(1.1,1.1);
  box-shadow: 0px 5px 5px -2px rgba(0, 0, 0, 0.25);
}
</style>
