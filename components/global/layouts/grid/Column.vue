<template>
  <div :class="getColClass">
    <slot></slot>
  </div>
</template>
<script setup>
  const props = defineProps({
    cols: {
      type: Number,
    },
    sm_cols: {
      type: Number,
    },
  })
  const getColClass = computed(() => {
    return `col-${props.cols} col-sm-${props.sm_cols}`;
  });
</script>
<style scoped>

/* sm */
@media screen and (max-width: 767px) {
  /* 480~767pxが適用範囲 */
  .col-sm-2{
    grid-column: 2 span;
  }
  .col-sm-3{
    grid-column: 3 span;
  }
  .col-sm-4{
    grid-column: 4 span;
  }
  .col-sm-5{
    grid-column: 5 span;
  }
  .col-sm-6{
    grid-column: 6 span;
  }
  .col-sm-7{
    grid-column: 7 span;
  }
  .col-sm-8{
    grid-column: 8 span;
  }
  .col-sm-9{
    grid-column: 9 span;
  }
  .col-sm-10{
    grid-column: 10 span;
  }
  .col-sm-11{
    grid-column: 11 span;
  }
  .col-sm-12{
    grid-column: 12 span;
  }
}

/* md */
@media screen and (min-width: 768px) {
  /* 768~1024? */
  .col-2{
    grid-column: 2 span;
  }
  .col-3{
    grid-column: 3 span;
  }
  .col-4{
    grid-column: 4 span;
  }
  .col-5{
    grid-column: 5 span;
  }
  .col-6{
    grid-column: 6 span;
  }
  .col-7{
    grid-column: 7 span;
  }
  .col-8{
    grid-column: 8 span;
  }
  .col-9{
    grid-column: 9 span;
  }
  .col-10{
    grid-column: 10 span;
  }
  .col-11{
    grid-column: 11 span;
  }
  .col-12{
    grid-column: 12 span;
  }
}

</style>
