<template>
  <div>
    <h2 class="text-10 font-bold">
      # Says
    </h2>

    <div
      class="py-20 flex"
    >
      <ul class="w-50% mr-2">
        <SaysItem
          v-for="(say, index) in says1"
          :key="say.id"
          v-motion="{
            initial: {
              y: 20,
              opacity: 0,
            },
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 200,
                delay: index * 70,
                type: 'spring',
                stiffness: 250,
                damping: 15,
              },
            },
          }"
          :say="say"
          class="mb-4 shadow"
          :class="[colors[say.text.length % colors.length]]"
        />
      </ul>
      <ul class="w-50% ml-2">
        <SaysItem
          v-for="(say, index) in says2"
          :key="say.id"
          v-motion="{
            initial: {
              y: 20,
              opacity: 0,
            },
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 200,
                delay: index * 70 + 40,
                type: 'spring',
                stiffness: 250,
                damping: 15,
              },
            },
          }"
          class="mb-4 shadow"
          :say="say"
          :class="[colors[say.text.length % colors.length]]"
        />
      </ul>
    </div>

    <div
      v-if="pageData.hasMore"
      ref="loadMoreLoadingRef"
      class="flex justify-center py-10"
    >
      <i class="i-ri:loader-2-line w-5 h-5 animate-spin animate-duration-2000" />
    </div>
  </div>
</template>

<script setup lang="ts">
import saysApi from '~/api/app-api/saysApi'
import { PageStatus } from '~~/type/enum/pageStatus'

const loadMoreLoadingRef = ref(null)
const isLoadMoreLoadingVisible = useElementVisibility(loadMoreLoadingRef)

type PageData = {
  page: number
  size: number
  hasMore: boolean
  pageStatus: PageStatus
  loadMoreStatus: PageStatus
}
const pageData = ref<PageData>({
  page: 1,
  size: 20,
  hasMore: true,
  pageStatus: PageStatus.LOADING,
  loadMoreStatus: PageStatus.SUCCESS,
})

const colors = [
  'bg-sky-1/40',
  'bg-pink-1/40',
  'bg-orange-1/40',
  'bg-amber-1/40',
  'bg-purple-1/40',
  'bg-cyan-1/40',
  'bg-green-1/40',
  'bg-red-1/40',
]

definePageMeta({
  keepalive: true,
})
const { data, error } = await useAsyncData('/api/says', () => saysApi.get({ page: 1, size: pageData.value.size }), {
  getCachedData: (key) => {
    return useNuxtApp().payload.data[key]
  },
})

if (error.value) {
  showError(error.value)
}

useHead({
  title: 'Says',
})

pageData.value.hasMore = data.value?.length === pageData.value.size
const half = Math.ceil(data.value!.length / 2)
const says1 = ref<API_Says.Model[]>(data.value?.slice(0, half) || [])
const says2 = ref<API_Says.Model[]>(data.value?.slice(half) || [])

const fetchData = async () => {
  const params: Api_Query = {
    page: pageData.value.page + 1,
    size: pageData.value.size,
  }
  const [err, res] = await toCatch(saysApi.get(params))
  if (err || !res) {
    pageData.value.loadMoreStatus = PageStatus.FAILED
    return
  }

  const _half = Math.ceil(res.length / 2)
  says1.value = says1.value.concat(res.slice(0, _half))
  says2.value = says2.value.concat(res.slice(_half))

  pageData.value.hasMore = res?.length === pageData.value.size
  pageData.value.loadMoreStatus = PageStatus.SUCCESS
  pageData.value.page += 1
}

watch(isLoadMoreLoadingVisible, (newValue) => {
  if (!newValue) return

  if (!pageData.value.hasMore || pageData.value.loadMoreStatus === PageStatus.LOADING) return

  pageData.value.loadMoreStatus = PageStatus.LOADING
})

watch(() => pageData.value.loadMoreStatus, () => {
  if (pageData.value.loadMoreStatus === PageStatus.LOADING) {
    console.log('加载更多')

    fetchData()
  }
})
</script>
