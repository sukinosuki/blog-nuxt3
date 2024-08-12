<template>
  <div class="md:px-20">
    <h2 class="text-8 font-bold">
      # Category / {{ id }}
    </h2>
    <!-- v-motion="{
          initial: {
            opacity: 0,
            y: 20,
          },
          visibleOnce: {
            opacity: 1,
            y: 0,
          },
        }" -->
    <!-- <img
      v-for="index in 5"
      :key="index"
      v-motion
      :initial="{ scale: 0, opacity: 0 }"
      :visible-once="{ scale: 1, opacity: 1 }"
      :delay="index * 200"
      src="https://vuejs.org/images/logo.png"
      class="w-10"
    > -->

    <ul
      v-motion="{
        initial: {
          y: 20,
          opacity: 0,
        },
        enter: {
          y: 0,
          opacity: 1,
        },
      }"
      class="mt-20 px-4"
      :duration="200"
    >
      <li
        v-for="(post, index) in posts"
        :key="post.id"
        class="relative before:absolute before:bg-primary before:content-[''] before:w-2px before:h-140% before:-left-14px before:top-50%
        after:absolute after:bg-primary after:content-[''] after:w-2 after:h-2 after:rounded after:-left-17px after:top-50% after:-translate-y-50%"
        :class="[index === posts!.length - 1 ? 'before:content-none' : '']"
      >
        <div class="flex justify-between mb-2">
          <NuxtLink
            :href="`/post/${post.alias || post.id}`"
            class="text-gray-7 dark:text-white text-15px after:content-[''] after:absolute after:h-2px after:bg-primary after:w-0% after:bottom-0 after:left-0 relative
            hover:after:w-100% after:duration-300 line-clamp-1"
          >
            {{ post.title }}
          </NuxtLink>

          <span class="text-gray text-14px">{{ dayjs(post.created_at).format('DD/MM/YYYY') }}</span>
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
