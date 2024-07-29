<template>
  <NMessageProvider>
    <NModalProvider>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </NModalProvider>
  </NMessageProvider>
</template>

<script setup lang="ts">
import { NMessageProvider, NModalProvider } from 'naive-ui'

useSeoMeta({
  title: 'NuxtHub Starter',
  description: 'A Nuxt template to build your full-stack application on the edge.',
})
</script>

<style>
body {
  margin: 0;
  background-color: #f7fafc;
}
html.dark body {
  background-color: rgb(25, 25, 25);
}

html.dark {
  color-scheme: dark;
}

* {
  box-sizing: border-box;
}
</style>
