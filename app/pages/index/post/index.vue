<template>
  <div class="md:px-20">
    <h2 class="text-10 font-bold">
      # Post
    </h2>

    <ul class="mt-20 relative">
      <PostItem
        v-for="(post, index) in posts"
        :key="post.id"
        v-motion="{
          initial: {
            opacity: 0,
            y: 20,
          },
          visibleOnce: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 200,
              delay: (index % LIMIT) * 70,
              type: 'spring',
              stiffness: 250,
              damping: 15,
            },
          },
        }"
        :post="post"
        @mouseoverleave="handlePostItemMouseoverleave"
      />

      <div
        class="absolute bg-primary opacity-20 rounded-2xl duration-200 pointer-events-none transform-origin-b"
        :style="{
          left: left+'px',
          top: top +'px',
          width: width + 'px',
          height: height +'px',
          opacity: hovered ? 0.1 : 0,
          transform: hovered ? 'scale(1)' : 'scale(1.2)',
        }"
      />
    </ul>

    <div class="py-10 flex justify-center items-center">
      <button
        v-if="hasMore"
        :href="`/post?page=${page+1}`"
        class="flex group items-center rounded-full hover:shadow-2xl duration-200 px-4 py-2 animate-bounce bg-white dark-bg-black"
        @click="loadMore"
      >
        <i
          v-if="loadMoreLoading"
          class="i-ri:loader-2-line w-5 h-5 animate-spin animate-duration-2000"
        />

        <span class="block mx-3">
          Next
        </span>

        <i
          class="i-ri:arrow-right-line w-0 h-6 opacity-0 group-hover:w-6 group-hover:opacity-100 duration-200"
          :class="[loadMoreLoading ? '!w-0 !opacity-0' : '']"
        />
      </button>

      <NuxtLink
        v-if="hasMore"
        :href="`/post?page=${page+1}`"
        class="hidden"
      >
        <i class="i-ri:loader-2-line w-5 h-5 animate-spin animate-duration-2000" />

        <span class="block mx-3">
          Next
        </span>

        <i class="i-ri:arrow-right-line w-6 h-6" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="tsx">
import postApi from '~/api/app-api/postApi'
import { toCatch } from '~/util/toCatch'

const LIMIT = 10
const route = useRoute()
const hovered = ref(false)
const left = ref(0)
const top = ref(0)
const width = ref(0)
const height = ref(0)
const handlePostItemMouseoverleave = (data) => {
  left.value = data.left
  top.value = data.top
  width.value = data.width
  height.value = data.height
  hovered.value = data.hovered
}

const page = ref(Number(route.query.page || 1))

const loadMoreLoading = ref(false)
const hasMore = ref(false)
const { data, error } = await useAsyncData('/api/post', () => postApi.get({
  page: page.value,
  size: LIMIT }),
)

if (error.value) {
  error.value.fatal = true
  throw error.value
}

const posts = data || []

if (posts.value?.length === LIMIT) {
  hasMore.value = true
}

//
const loadMore = async () => {
  if (loadMoreLoading.value) return
  loadMoreLoading.value = true

  const params: API_Post.Get = {
    page: page.value + 1,
    size: LIMIT,
  }
  const [err, res] = await toCatch(postApi.get(params))
  loadMoreLoading.value = false
  if (err) return

  posts.value?.push(...res!)
  hasMore.value = res!.length === LIMIT
  page.value++
}
</script>
