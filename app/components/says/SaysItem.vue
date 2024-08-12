<template>
  <div class="p-3 rounded-md">
    <p class="text-14px text-black/90 dark-text-white ">
      {{ say.text }}
    </p>

    <div class="mt-2 flex justify-between flex-wrap text-black/70 dark-text-white/70">
      <div class="text-12px">
        <span>发布于:</span>
        <span class="ml-1">{{ dayjs(say.created_at).format('YYYY-MM-DD') }}</span>
      </div>

      <div class="text-12px flex justify-end ml-auto max-md-flex-col max-md-items-end">
        <span v-if="say.source">【{{ say.source }}】</span>
        <span
          v-if="say.author"
          class="ml-1"
        >- {{ say.author }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

defineProps<{ say: API_Says.Model, color?: string }>()
</script>
