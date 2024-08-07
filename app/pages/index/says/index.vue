<template>
  <div>
    <h2 class="text-10 font-bold">
      # Says
    </h2>

    <div
      class="py-20 flex"
    >
      <ul class="w-50% px-2">
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
            },
          }"
          :delay="index * 30"
          :duration="200"
          class="mb-4"
          :say="say"
          :class="[colors[say.text.length % colors.length]]"
        />
      </ul>
      <ul class="w-50% px-2">
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
            },
          }"
          :delay="index * 30 + 20"
          :duration="200"
          class="mb-4"
          :say="say"
          :class="[colors[say.text.length % colors.length]]"
        />
      </ul>
    </div>

    <div
      v-if="pageData.hasMore"
      ref="loadMoreLoadingRef"
      class="flex justify-center py-20"
    >
      <i
        class="i-ri:loader-2-line w-5 h-5 animate-spin animate-duration-2000"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import saysApi from '~/api/saysApi'
import { PageStatus } from '~/type/enum/pageStatus'
import { toCatch } from '~/util/toCatch'

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

const data = await useAsyncData('/api/says', () => saysApi.get({ page: 1, size: 20 }))

// pageData.value.hasMore = data.data.value?.length === pageData.value.size

const says1 = ref<API_Says.Model[]>(data.data.value!.slice(0, data.data.value!.length / 2))

const says2 = ref<API_Says.Model[]>(data.data.value!.slice(data.data.value!.length / 2))

const fetchData = async () => {
  const params: Api_Query = {
    page: pageData.value.page + 1,
    size: pageData.value.size,
  }
  const [err, res] = await toCatch(saysApi.get(params))
  if (err || !res) return

  says1.value = says1.value.concat(res.slice(0, res.length / 2))
  says2.value = says2.value.concat(res.slice(res.length / 2))

  pageData.value.hasMore = res?.length === pageData.value.size
  pageData.value.loadMoreStatus = PageStatus.SUCCESS
  pageData.value.page += 1
}

watch(isLoadMoreLoadingVisible, (newValue) => {
  console.log('newValue ', newValue)
  if (!pageData.value.hasMore || pageData.value.loadMoreStatus === PageStatus.LOADING) return

  pageData.value.loadMoreStatus = PageStatus.LOADING
})

watch(() => pageData.value.loadMoreStatus, () => {
  if (pageData.value.loadMoreStatus === PageStatus.LOADING) {
    fetchData()
  }
})
</script>
