<template>
  <div class="p-3 rounded-md">
    <p>
      {{ say.text }}
    </p>

    <div class="mt-2 flex justify-between flex-wrap text-gray-7 ">
      <div class="text-14px">
        <span>发布于:</span>
        <span class="ml-1">{{ dayjs(say.created_at).format('YYYY-MM-DD') }}</span>
      </div>

      <div class="text-14px opacity-70 flex justify-end ml-auto">
        <span v-if="say.source">【{{ say.source }}】</span>
        <span
          v-if="say.author"
          class="ml-2"
        >- {{ say.author }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

defineProps<{ say: API_Says.Model, color?: string }>()
</script>
