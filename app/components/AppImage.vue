<template>
  <div class="overflow-hidden relative bg-gray-1 dark:bg-white/10">
    <img
      :src="src"
      :alt="alt"
      class="opacity-0 w-100% h-100% duration-100"
      :class="{ 'opacity-100': isLoaded }"
      @load="handleLoad"
      @error="handleError"
    >

    <template v-if="isError">
      <slot />
    </template>
  </div>
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
