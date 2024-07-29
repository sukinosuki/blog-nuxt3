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

.page-enter-active, .page-leave-active {
  transition: all 0.4s;
}

.page-enter-from, .page-enter-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
