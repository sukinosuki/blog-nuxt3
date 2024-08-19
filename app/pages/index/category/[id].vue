<template>
  <div class="md:px-20">
    <h2 class="text-8 font-bold">
      # Category / {{ id }}
    </h2>

    <ul class="mt-20">
      <CategoryPostItem
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
        :post="post"
        :total="posts?.length || 0"
        :index="index"
      />
    </ul>
  </div>
</template>

<!-- https://stackblitz.com/edit/vitejs-vite-wx9cft?file=src%2FApp.vue,src%2Fmain.js -->
<script setup lang="ts">
import categoryApi from '~/api/app-api/categoryApi'

const route = useRoute()

const id = route.params.id as string

const { data: posts, error } = await useAsyncData(`/api/category/${id}`, () => categoryApi.getPostById(id), {
  getCachedData: (key) => {
    return useNuxtApp().payload.data[key]
  },
})

if (error.value) {
  showError(error.value)
}

useHead({
  title: id,
})
</script>
