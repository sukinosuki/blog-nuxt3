<template>
  <div>
    <NuxtLink
      :to="`/post/${post.id}`"
      class="px-4 py-4 hover:scale-99 block duration-200 group"
    >
      <h2 class="text-5 font-bold text-black/70 dark:text-white">
        {{ post.title }}
      </h2>
      <p class="text-gray mt-2">
        {{ post.description }}
      </p>

      <div class="flex items-center justify-between mt-2 text-black/70 dark:text-white line-height-1">
        <div class="text-13px">

          <div class="flex items-center space-x-1">
            <div class="space-x-1 flex items-center">
              <i class="i-ri:time-line w-4 h-4" />
              <span>
                {{ dayjs(post.created_at).format('YYYY-MM-DD') }}
              </span>
            </div>

            <span>
              # {{ post.category?.name }}
            </span>
          </div>

        </div>

        <div class="flex items-center text-primary space-x-1">
          <span>Read all</span>
          <div class="i-ri:arrow-right-line w-0 h-5 group-hover:w-5 duration-200" />
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

defineProps<{ post: API_Post.Model }>()
</script>
