<template>
  <div
    class="relative flex justify-between mb-2 before:absolute before:bg-primary before:content-[''] before:w-2px before:h-140% before:-left-14px before:top-50%
      after:absolute after:bg-primary after:content-[''] after:w-2 after:h-2 after:rounded after:-left-17px after:top-50% after:-translate-y-50%"
    :class="[index === total - 1 ? 'before:content-none' : '']"
  >
    <NuxtLink
      :href="`/post/${post.alias || post.id}`"
      class="text-black/90 dark:text-white text-15px after:content-[''] after:absolute after:h-2px after:bg-primary after:w-0% after:bottom-0 after:left-0 relative
            hover:after:w-full after:duration-300 line-clamp-1"
    >
      {{ post.title }}
    </NuxtLink>

    <span class="text-black/70 dark-text-white text-14px">{{ publishDate }}</span>
  </div>
</template>

<script setup lang="ts">
import { dateUtil } from '#imports'

const props = defineProps<{
  post: API_Post.Model
  index: number
  total: number
}>()

const publishDate = computed(() => {
  return dateUtil.format(props.post.created_at, 'DD/MM/YYYY')
})
</script>
