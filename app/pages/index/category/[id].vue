<template>
  <div class="md:px-20">
    <h2 class="text-8 font-bold">
      # Category / {{ id }}
    </h2>

    <ul class="mt-20">
      <li
        v-for="(post, index) in posts"
        :key="post.id"
        v-motion="{
          initial: {
            opacity: 0,
            y: 20,
            x: 1,
          },
          visibleOnce: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
              duration: 200,
              delay: index * 30,
              type: 'spring',
              stiffness: 250,
              damping: 20,
            },
          },
        }"
        class="relative before:absolute before:bg-primary before:content-[''] before:w-2px before:h-140% before:-left-14px before:top-50%
        after:absolute after:bg-primary after:content-[''] after:w-2 after:h-2 after:rounded after:-left-17px after:top-50% after:-translate-y-50%"
        :class="[index === posts!.length - 1 ? 'before:content-none' : '']"
      >
        <div class="flex justify-between mb-2">
          <NuxtLink
            :href="`/post/${post.alias || post.id}`"
            class="text-black/90 dark:text-white text-15px after:content-[''] after:absolute after:h-2px after:bg-primary after:w-0% after:bottom-0 after:left-0 relative
            hover:after:w-100% after:duration-300 line-clamp-1"
          >
            {{ post.title }}
          </NuxtLink>

          <span class="text-black/70 dark-text-white text-14px">{{ dayjs(post.created_at).format('DD/MM/YYYY') }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<!-- https://stackblitz.com/edit/vitejs-vite-wx9cft?file=src%2FApp.vue,src%2Fmain.js -->
<script setup lang="ts">
import dayjs from 'dayjs'
import categoryApi from '~/api/app-api/categoryApi'

const route = useRoute()

const { id } = route.params

const data = await useAsyncData(`/api/category/${id}`, () => categoryApi.getPostById(id as string))

const posts = data.data
</script>
