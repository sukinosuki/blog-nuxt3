<template>
  <div class="flex justify-center my-4 flex-col items-center">
    <a
      :href="repository?.html_url"
      target="_blank"
      class="shadow no-underline w-full md:w-100 flex items-center p-3 rounded-2xl md:max-w-100
       bg-gray-1 dark-bg-black backdrop-blur-xl overflow-hidden disabled"
    >
      <div class="flex flex-col flex-1 h-80px justify-between">
        <div
          class="flex justify-between items-center relative "
        >
          <h4 class="text-5 line-clamp-1 m-0 flex items-center">
            <div class="i-ri:github-fill w-1em h-1em mr-2" />
            {{ repository?.name }}
          </h4>
          <span class="flex items-center line-height-none">
            <div class="i-ri:star-line w-4 h-4 mr-1" />
            {{ repository?.watchers_count }}
          </span>
        </div>

        <div
          class="text-14px text-gray-6 dark-text-white/70 line-clamp-2 m-0 line-height-tight relative"
        >
          {{ repository?.description }}
        </div>
      </div>

      <img
        class="w-15 h-15 ml-2 bg-gray-1 rounded"
        :src="repository?.owner.avatar_url"
        alt=""
      >

      <div
        v-if="!repository"
        class="bg-slate-200 dark-bg-black rounded absolute top-0 left-0 w-full h-100% z-1 "
      />
    </a>

    <div class="mt-2 h-10 w-full flex justify-center items-center">
      <a
        :href="repository?.html_url"
        target="_blank"
        class="line-clamp-1 text-center"
      >{{ repository?.html_url || ' ' }}</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import githubApi from '~/api/app-api/githubApi'
import { sleep } from '~/utils'
import { toCatch } from '~/utils/toCatch'

const props = defineProps<{
  repos: string
}>()

const repository = ref<Github.Repos | null>(null)

const fetchData = async () => {
  if (!props.repos) return

  await sleep(7100)

  const [err, res] = await toCatch(githubApi.get(props.repos))
  if (err || !res) return

  repository.value = res
}

onMounted(() => {
  fetchData()
})
</script>
