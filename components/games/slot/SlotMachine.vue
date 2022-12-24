<template>
  <div>
    <div @click="spin()" :class="{ inactive: isRunning }" class="start-button">
      START
    </div>
    <div class="slot-frame">
      <SlotComponent ref="component1"></SlotComponent>
      <SlotComponent ref="component2"></SlotComponent>
      <SlotComponent ref="component3"></SlotComponent>
    </div>
    <div @click="reset()" :class="{ inactive: isSelected }" class="reset-button">
      RESET
    </div>
  </div>
</template>
<script>
import SlotComponent from "~~/components/games/slot/SlotComponent";
export default {
  data() {
    return {
      isRunning: false,
    };
  },
  components: {
    SlotComponent,
  },
  methods: {
    spin() {
      if (this.isRunning) {
        return;
      }
      this.isRunning = true;

      this.$refs.component1.activate();
      this.$refs.component2.activate();
      this.$refs.component3.activate();

      this.$refs.component1.spin();
      this.$refs.component2.spin();
      this.$refs.component3.spin();

      this.isSelected = false;
    },
    reset() {
      this.isSelected = true;
      this.isRunning = false;
    },
  },
};
</script>
<style>
.slot-frame {
  width: 300px;
  border: 4px solid #fff;
  border-radius: 12px;
  margin: 16px auto;
  display: flex;
  justify-content: space-between;
}

.panel img {
  width: 90px;
  height: 90px;
  margin-bottom: 4px;
}

.stop {
  cursor: pointer;
  display: block;
  width: 30px;
  height: 30px;
  margin: 0 auto;
  background: #ef454a;
  box-shadow: 0 4px 0 #d1483e;
  border-radius: 50%;
  color: #fff;
  user-select: none;
}

.start-button,
.reset-button {
  cursor: pointer;
  width: 280px;
  height: 36px;
  background: #3498db;
  box-shadow: 0 4px 0 #2880b9;
  border-radius: 18px;
  line-height: 36px;
  text-align: center;
  color: #fff;
  user-select: none;
  margin: 0 auto;
}

.unmatched {
  opacity: 0.5;
}

.inactive {
  opacity: 0.5;
}
</style>
