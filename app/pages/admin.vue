<template>
  <NConfigProvider
    :theme="theme"
    :theme-overrides="themeOverrides"
  >
    <NMessageProvider>
      <NModalProvider>
        <NMessageProvider>
          <NuxtLayout name="admin-layout">
            <AdminWrapper>
              <NuxtPage />
            </AdminWrapper>
          </NuxtLayout>
        </NMessageProvider>
      </NModalProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import { NConfigProvider, NMessageProvider, NModalProvider, darkTheme, useMessage, type GlobalThemeOverrides } from 'naive-ui'
import useAppStore from '~/store/app.store'

const colorMode = useColorMode()
const appStore = useAppStore()

// const message = useMessage()
// watch(appStore.fetchError, (newValue) => {
//   console.log('newValue ', newValue)

//   message.error(newValue)
// })

const theme = computed(() => {
  if (colorMode.value === 'dark') {
    return darkTheme
  }

  return null
})
const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#8b5cf6', // dark:#a78bfa
    primaryColorHover: '#8b5cf6', // dark:#a78bfa
    primaryColorPressed: '#8b5cf6', // dark:#a78bfa
  },
  // Switch: {
  //   railColorActive: '#8b5cf6',
  // },
}

definePageMeta({
  middleware: ['admin-auth'],
  pageTransition: {
    name: 'page',
    mode: 'out-in',
  },
})
</script>
