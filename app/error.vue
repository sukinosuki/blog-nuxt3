<template>
  <NuxtLayout>
    <div class="h-100vh flex items-center justify-center flex-col">
      <p>data message: {{ data?.message }}</p>
      <p>error message: {{ error?.message }}</p>
      <p>status code: {{ error?.statusCode }}</p>
      <p>status message: {{ error?.statusMessage }}</p>
      <p>url: {{ data?.url }}</p>

      <button
        class="text-primary px-4 py-2 shadow rounded-full bg-white dark-bg-black mt-10 hover:-translate-y-1 duration-200"
        @click="handleError"
      >
        Return home
      </button>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { isClient } from '@vueuse/core'
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError<ServerErrorRes | string>,
})

const handleError = () => {
  clearError({
    redirect: '/',
  })
}
const { $sentry } = useNuxtApp()

//
const data = computed<ServerErrorRes | null>(() => {
  if (!props.error?.data) return null

  if (typeof (props.error!.data) === 'object') {
    return props.error?.data as ServerErrorRes
  }

  let _data: ServerErrorRes | null = null
  try {
    _data = JSON.parse(props.error.data as string)
  }
  catch (e) {
    // console.log('e ', e)
  }

  return _data
})

if (isClient) {
  const { statusCode, statusMessage } = props.error || {}
  // Sentry.withScope((scope) => {
  //   scope.setExtra('data', props.error)

  // })
  $sentry?.captureException(new Error(`Server Error, message: ${data.value?.message}, statusCode: ${statusCode}, statusMessage: ${statusMessage}`))
}
</script>
