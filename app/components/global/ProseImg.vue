<template>
  <div class="my-2">
    <div
      class="rounded-md overflow-hidden bg-gray-1/50 dark-bg-[#1e293b99] min-h-50 md-min-h-80 relative"
    >
      <NuxtImg
        ref="imgRef"
        class="w-full"
        :class="{ invisible: isLoadError }"
        :src="src"
        :alt="alt"
        loading="lazy"
        zoomable
        @load="handleImgLoad"
        @error="handleError"
      />

      <div
        v-if="isLoadError"
        class="absolute w-full h-100% absolute top-0 flex justify-center items-center flex-col"
      >
        <span>图片加载失败</span>

        <a
          :href="src"
          class="mt-2"
          target="_blank"
        >查看原图</a>
      </div>
    </div>

    <div class="flex justify-center mt-4">
      <Popover>
        <a
          :href="src"
          target="_blank"
          class="text-13px"
        >{{ alt }}</a>

        <template #popover>
          <div
            class="p-2 shadow-xl rounded-xl bg-white/80 dark-bg-black backdrop-blur-xl"
          >
            <a
              :href="src"
              target="_blank"
              class="text-primary"
            >查看原图</a>
          </div>
        </template>
      </Popover>
    </div>
  </div>
</template>

<script setup lang="ts">
const imgRef = ref(null)
const isLoadSuccess = ref(false)
const isLoadError = ref(false)

defineProps<{
  src: string
  alt: string
}>()

const handleError = () => {
  isLoadError.value = true
}

const handleImgLoad = async () => {
  isLoadSuccess.value = true
}
</script>
