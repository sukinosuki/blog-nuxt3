<template>
  <div
    :style="{
      opacity: opacity,
      duration: 200,
    }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  y?: number
  delay?: number
}>()

const opacity = ref(0)
const y = ref(props.y || 0)
onMounted(() => {
  setTimeout(() => {
    opacity.value = 1
    // y.value = 0
  }, props.delay || 0)
})
</script>
