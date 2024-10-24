<template>
  <slot />
</template>

<script setup lang="ts">
import { useMessage } from 'naive-ui'
import useAppStore from '~/store/app.store'

const appStore = useAppStore()
const message = useMessage()

watch(() => appStore.fetchError, (newValue) => {
  // TODO:
  message.error(newValue?.data?.message || newValue?.message || '发生异常')
})
</script>
