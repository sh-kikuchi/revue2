<template>
  <div class="modal" id="list-modal" v-show="props.isVisible" @click="close"></div>
  <div class="modal-content" v-show="props.isVisible">
    <div>
      <h3 class="modal-title">{{ props.modalItem.title }}</h3>
      <div class="modal-prefecture">{{ props.modalItem.prefecture }} / {{ props.modalItem.date }}</div>
      <img :src="props.modalItem.filename" alt="img" />
      <div class="modal-comment">{{ props.modalItem.comment }}</div>
      <p class="modal-close-btn" @click="close">閉じる</p>
    </div>
  </div>
</template>
<script setup>
import { reactive } from "vue";

const state = reactive({
  message: "TEST",
});

const props = defineProps({
  isVisible: {
    required: true,
    type: Boolean,
    default: false,
  },
  modalItem: {
    required: true,
    type: Object,
    default: false,

  }
});

const emits = defineEmits(['close']);
const close = () => {
  emits('close');
}

</script>
<style scoped>
/*モーダルのタイトル*/
.modal-title,
.modal-prefecture,
.modal-date {
  text-align: center;
}

.modal-comment {
  width: 250px;
  margin-bottom: 10px;
}

img {
  display: block;
  width: 150px;
  margin: 10px auto;
}

/*モーダルのエラーメッセージ（バリデーション）*/
.error-message {
  color: red;
  text-align: center;
}

.error-result {
  color: black;
  text-align: center;
}

/*モーダル共通 */
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 0;
}

.modal-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /*▼ モーダルのデザイン */
  background-color: white;
  width: 600px;
  height: auto;
  border-radius: 20px;
  padding: 20px;
  z-index: 99;
}
</style>
