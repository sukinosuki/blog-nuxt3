<template>
  <div>
    <header class="py-2 px-2  bg-opacity-50 backdrop-blur-xl fixed w-full top-0 shadow flex justify-around items-center z-999">
      <div class="h-50px w-50px border-rounded bg-amber" />

      <div class="md:w-80%">
        <div>
          <h1 class="font-500 line-height-none text-8 m-0">
            Miiro Blog {{ appStore.count }}
          </h1>
          <span class="mt-2 line-height-none block text-4 ">article/hanami233</span>
        </div>
      </div>

      <div
        class="w-40px h-40px flex items-center justify-center border-rounded-md cursor-pointer border-1 border-gray border-solid "
        @click="toggleColorMode"
      >
        <div
          :class="themeIconClass"
        />
      </div>
    </header>

    <main class="py-30 md:w-80% mx-auto ">
      <slot />
    </main>
  </div>
</template>

<script setup>
// import { useMessage } from 'naive-ui'
import useAppStore from '~/store/app.store'

const colorMode = useColorMode()
const themeIconClass = ref('i-ri:sun-foggy-fill')

const appStore = useAppStore()
// const message = useMessage()
watch(() => appStore.fetchError.value, () => {
  console.log('fetch error ', appStore.fetchError.value.message)
  // message.error(appStore.fetchError.value.data.message)
})
// watch(() => appStore.count.value, () => {
//   // console.log('fetch error ', appStore.fetchError.value)
//   message.error(appStore.count)
// })
watch(colorMode, () => {
  console.log('colorMode 变化 ', colorMode.value)
  console.log('colorMode preference 变化 ', colorMode.preference)
  if (colorMode.preference === 'dark') {
    themeIconClass.value = 'i-ri:sun-foggy-fill'
  }
  if (colorMode.preference === 'light') {
    themeIconClass.value = 'i-ri:moon-foggy-fill'
  }
  if (colorMode.preference === 'system') {
    themeIconClass.value = 'i-ri:contrast-line'
  }
}, {
  immediate: true,
})

const toggleColorMode = () => {
  console.log('toggleColorMode preference ', colorMode.preference)
  console.log('toggleColorMode value ', colorMode.value)
  if (colorMode.preference === 'dark') {
    colorMode.preference = 'light'
    return
  }
  if (colorMode.preference === 'light') {
    colorMode.preference = 'system'
    return
  }

  colorMode.preference = 'dark'
}
</script>

<style lang="scss" scoped>

</style>
