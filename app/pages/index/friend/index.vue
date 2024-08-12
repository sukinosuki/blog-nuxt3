<template>
  <div>
    <ul
      :style="{ '--total': friends.length }"
      class="grid grid-cols-3 max-md-grid-cols-1 max-lg-grid-cols-2"
    >
      <li
        v-for="(friend, index) in friends"
        :key="friend.id"
        v-motion="{
          initial: {
            opacity: 0,
            y: 20,
          },
          visibleOnce: {
            opacity: 1,
            y: 0,
          },
        }"
        :delay="(index % 20) * 70 "
        :style="{ '--i': index }"
      >
        <FriendItem :friend="friend" />
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
import friendApi from '~/api/app-api/friendApi'
import { FriendStatus } from '~~/type/enum/FriendStatus'

const data = await useAsyncData('/api/friend', friendApi.get)

const friends = computed(() => {
  return data.data.value?.filter(friend => friend.status === FriendStatus.NORMAL) || []
})

const outOfContracts = computed(() => {
  return data.data.value?.filter(friend => friend.status === FriendStatus.OUT_OF_CONTACT) || []
})
</script>

<style>
/* .list-enter-active,
.list-leave-active {
  transition: all 5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.slide-in-move {
  transition: opacity 9.5s linear, transform 9.5s ease-in-out;
}

.slide-in-leave-active {
  transition: opacity 9.4s linear, transform 9.4s cubic-bezier(.5,0,.7,.4);
  transition-delay: calc( 0.1s * (var(--total) - var(--i)) );
}

.slide-in-enter-active {
  transition: opacity 9.5s linear, transform 9.5s cubic-bezier(.2,.5,.1,1);
  transition-delay: calc( 0.1s * var(--i) );
}

.slide-in-enter,
.slide-in-leave-to {
  opacity: 0;
}

.slide-in-enter { transform: translateX(-1em); }
.slide-in-leave-to { transform: translateX(1em); } */
</style>
