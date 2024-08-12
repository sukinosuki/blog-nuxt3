<template>
  <a
    target="_blank"
    :href="friend.link"
    class="flex flex-col justify-center items-center py-4 group"
  >
    <div
      class="w-20 h-20 rounded-lg overflow-hidden relative bg-sky-1/40"
    >
      <!-- v-motion="{
          initial: {
            opacity: 0,
          },
          enter: {
            opacity: 1,
          },
        }" -->
      <NuxtImg
        :src="friend.avatar"
        class="w-100% h-100% object-cover duration-200 !group-hover:scale-120 relative z-2"
        loading="lazy"
        :class="[isLoadedError ? 'invisible' : '']"
        @error="handleImgError"
      />

      <span
        v-if="isLoadedError"
        v-motion="{
          initial: {
            opacity: 0,
          },
          enter: {
            opacity: 1,
          },
        }"
        class="bg-primary/30 w-100% h-100% flex justify-center items-center text-black/60 dark-text-white text-8 absolute z-1 left-0 top-0"
      > {{ friend.blog_name[0] }}</span>
    </div>

    <h4 class="text-4 font-bold mt-4 text-black/90 dark-text-white ">
      {{ friend.blog_name }}
    </h4>
    <p class="text-center text-13px mt-2 text-black/70 dark-text-white">
      {{ friend.introduction }}
    </p>
  </a>
</template>

<script setup lang="ts">
defineProps<{ friend: API_Friend.Model }>()

const isLoadedError = ref(false)

const handleImgError = () => {
  isLoadedError.value = true
}
</script>
