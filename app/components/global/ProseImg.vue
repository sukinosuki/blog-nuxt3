<template>
  <div class="rounded-md my-2 overflow-hidden bg-sky-1/30 min-h-50">
    <NuxtImg
      ref="imgRef"
      class="w-100% "
      :src="src"
      :alt="alt"
      loading="lazy"
      zoomable
      @load="handleImgLoad"
      @click="handleClickImage"
    />
  </div>
</template>

<script setup lang="ts">
import mediumZoom from 'medium-zoom'

const imgRef = ref(null)
defineProps<{
  src: string
  alt: string
}>()

const handleClickImage = () => {
  console.log('click ', imgRef.value)
}

const handleImgLoad = (e) => {
  console.log('[handleImgLoad] ', e)
}

onMounted(() => {
  mediumZoom('[zoomable]', {
  })
})
</script>
