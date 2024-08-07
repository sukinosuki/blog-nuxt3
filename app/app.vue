<template>
  <NuxtPage />
</template>

<script setup lang="ts">
// import '@unocss/reset/tailwind.css'
// import '@unocss/reset/tailwind-compat.css'
</script>

<style>
body {
  margin: 0;
  background-color: #f7fafc;
}
html.dark body {
  background-color: rgb(31, 31, 31);
}

html.dark {
  color-scheme: dark;
}

.page-enter-active, .page-leave-active {
  transition: all 0.4s;
}

.page-enter-from, .page-enter-to {
  opacity: 0;
  filter: blur(1rem);
}

body {
  /* font-family: 'Inter', sans-serif; */
  /* font-family: 'open-sans', Roboto, sans-serif; */
  font-family: eafont, Roboto;
  @apply scrollbar scrollbar-rounded
}
</style>
