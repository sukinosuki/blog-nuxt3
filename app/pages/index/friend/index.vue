<template>
  <div>
    <ListHoverEffect
      :list="friends"
      effect-class="rounded-2xl"
      class="grid grid-cols-3 max-md-grid-cols-1 max-lg-grid-cols-2"
    >
      <template #default="slotProps">
        <FriendItem
          v-motion="{
            initial: {
              opacity: 0,
              y: 20,
            },
            visibleOnce: {
              opacity: 1,
              y: 0,
              transition: {
                delay: (slotProps.index % 20) * 70,
              },
            },
          }"
          :friend="slotProps.item"
        />
      </template>
    </ListHoverEffect>

    <div
      v-if="outOfContracts"
      class="mt-10"
    >
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
import friendApi from '~/api/app-api/friendApi'
import { FriendStatus } from '~~/type/enum/FriendStatus'

const data = await useAsyncData('/api/friend', friendApi.get)

const friends = computed(() => {
  return data.data.value?.filter(friend => friend.status === FriendStatus.NORMAL) || []
})

const outOfContracts = computed(() => {
  return data.data.value?.filter(friend => friend.status !== FriendStatus.NORMAL) || []
})
</script>
