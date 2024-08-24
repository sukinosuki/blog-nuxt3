<template>
  <NuxtImg
    :src="src"
    :alt="alt"
    class="opacity-0 duration-100"
    :class="{ 'opacity-100': isLoaded }"
    @load="handleLoad"
    @error="handleError"
  />
</template>

<script setup lang="ts">
defineProps<{
  src: string
  alt?: string
}>()

const isError = ref(false)
const isLoaded = ref(false)

const handleError = () => {
  isError.value = true
}
const handleLoad = () => {
  isLoaded.value = true
}
</script>
