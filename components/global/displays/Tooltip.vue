<script setup>

const props = defineProps({
  tooltipPosition: {
    type: String,
    default: 'top'
  },
  tooltipContent: {
    type: String,
    default: 'test'
  },

})
</script>

<template>
  <span class="tooltip" :class="props.tooltipPosition">
    <slot></slot>
    <span class="tooltip-content" v-if="props.tooltipContent">{{ props.tooltipContent }}</span>
  </span>
</template>

<style scoped>
  .tooltip {
    position: relative;
    display: inline-block;
  }
  .tooltip-content {
    background-color: #333;
    border-radius: 6px;
    color: #fff;
    display: none;
    padding: 10px 15px;
    position: absolute;
    text-align: center;
    z-index: 999;
  }
  .tooltip:hover .tooltip-content {
    display: block;
  }

  .tooltip.top .tooltip-content {
    top: -calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);
  }

  .tooltip.bottom .tooltip-content {
    bottom: -calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);
  }

  .tooltip.right .tooltip-content {
    top: 50%;
    left: calc(100% + 5px);
    transform: translateY(-50%);
  }

  .tooltip.left .tooltip-content {
    top: 50%;
    right: calc(100% + 5px);
    transform: translateY(-50%);
  }
</style>
