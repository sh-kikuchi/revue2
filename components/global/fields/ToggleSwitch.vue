<script setup lang="ts">
    import { ref } from 'vue';
    const toggle = ref<Boolean>(false);
</script>
<template>
  <label class="custom-switch" for="toggle-switch">
    <input type="checkbox" id="toggle-switch" v-model="toggle">
    <span class="slider round"></span>
  </label>
  <p>スイッチは {{ toggle ? 'ON' : 'OFF' }} です。</p>
</template>
<style scoped>
/* トグルスイッチのスタイル */
.custom-switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 25px;
}

/* チェックボックスを非表示に */
.custom-switch input {
    display: none;
}

/* トグルスイッチの背景 */
.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    border-radius: 35px;
    transition: .4s;
}

/* トグルがONのときのスタイル */
.slider.round {
    background-color: #2196F3;
}

/* トグルがONのときのスライダーの位置 */
.slider.round:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    border-radius: 50%;
    transition: .4s;
}

/* チェックボックスがチェックされたときのスタイル */
.custom-switch input:checked + .slider {
    background-color: #2196F3;
}

/* チェックボックスがチェックされたときのスライダーの位置 */
.custom-switch input:checked + .slider:before {
    transform: translateX(16px);
}

</style>