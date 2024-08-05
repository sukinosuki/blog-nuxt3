<template>
  <div>
    <ul class="grid grid-cols-3 ">
      <li
        v-for="(friend) in friends"
        :key="friend.id"
        v-motion-fade
        class=" group mb-10"
      >
        <a
          target="_blank"
          :href="friend.link"
          class="flex flex-col justify-center items-center py-4"
        >
          <div class="w-20 h-20 rounded-lg overflow-hidden relative">
            <NuxtImg
              v-if="friend.avatar"
              :src="friend.avatar"
              class="w-100% h-100% object-cover opacity-100 group-hover:scale-120 duration-300"
              loading="lazy"
              placeholder="/favicon.ico"
            />
            <!-- <NuxtImg
              v-if="friend.avatar"
              :src="friend.avatar"
              class="w-100% h-100% object-cover group-hover:scale-100 delay-100 scale-120 group-hover:opacity-100 opacity-0 duration-200 absolute top-0 z-1"
              loading="lazy"
              placeholder="/favicon.ico"
            /> -->
            <span
              v-else
              class="bg-sky-1 w-100% h-100% flex justify-center items-center text-8 absolute z-1 left-0 top-0"
            > {{ friend.blog_name[0] }}</span>
          </div>

          <h4 class="text-4 font-bold mt-4">
            {{ friend.blog_name }}
          </h4>
          <p class="text-center text-3 mt-2">
            {{ friend.introduction }}
          </p>
        </a>
      </li>
    </ul>

    <div class="mt-10">
      <h5 class="font-bold">
        以下站点无法访问, 已失联
      </h5>

      <ul class="mt-4">
        <li
          v-for="(friend) in outOfContracts"
          :key="friend.id"
          class="mb-1"
        >
          <span class="text-4 font-500 underline">{{ friend.blog_name }}</span>
          <span class="ml-4 text-13px italic ">{{ friend.introduction }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import friendApi from '~/api/friendApi'
import { FriendStatus } from '~~/api/enum/FriendStatus'

const data = await useAsyncData('/api/friend', friendApi.get)

// const friends = reactive(data.data.value || [])

const friends = computed(() => {
  return data.data.value?.filter(friend => friend.status === FriendStatus.NORMAL) || []
})

const outOfContracts = computed(() => {
  return data.data.value?.filter(friend => friend.status === FriendStatus.OUT_OF_CONTACT) || []
})
</script>
