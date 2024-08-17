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
              <NuxtPage class="admin-page selection:bg-admin-primary" />
            </AdminWrapper>
          </NuxtLayout>
        </NMessageProvider>
      </NModalProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import { NConfigProvider, NMessageProvider, NModalProvider, darkTheme, type GlobalThemeOverrides } from 'naive-ui'

const colorMode = useColorMode()
const theme = computed(() => {
  if (colorMode.value === 'dark') {
    return darkTheme
  }

  return null
})

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#8b5cf6', // dark:#a78bfa
    primaryColorHover: '#a57dff', // dark:#a78bfa
    primaryColorPressed: '#a57dff', // dark:#a78bfa
    borderRadius: '5px',
  },
  Card: {
    titleFontWeight: 'bold',
    borderRadius: '10px',
  },
  Form: {
    labelFontWeight: 'bold',
  },
  Switch: {
    railColorActive: '#8b5cf6',
    loadingColor: '#8b5cf6',
  },
  DataTable: {
    thFontWeight: 'bold',
  },
}

definePageMeta({
  middleware: ['admin-auth'],
  pageTransition: {
    name: 'page',
    mode: 'out-in',
  },
})
</script>
