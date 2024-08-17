<template>
  <slot />
</template>

<script setup lang="ts">
import { useMessage } from 'naive-ui'
import useAppStore from '~/store/app.store'

console.log('admin wrapper')

const appStore = useAppStore()
const message = useMessage()

watch(() => appStore.fetchError, (newValue) => {
  console.log('newValue ', newValue)

  // TODO:
  message.error(newValue?.data.message || '服务器异常')
})
</script>
