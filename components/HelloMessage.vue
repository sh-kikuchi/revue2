<script lang="ts" setup>
defineProps<{
  name: string;
}>();
</script>

<template>
  <div>Hello, {{ name }}!</div>
</template>