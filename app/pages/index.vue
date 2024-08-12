<template>
  <!-- <NuxtLayout> -->
  <div class="mx-auto px-3 py-30 min-h-100vh lg:w-960px">
    <NuxtPage />
  </div>
  <!-- </NuxtLayout> -->
</template>

<script setup lang="ts">
import { isClient } from '@vueuse/core'

useSeoMeta({
  title: 'NuxtHub Starter',
  description: 'A Nuxt template to build your full-stack application on the edge.',
})

// if (isClient) {
//   const r = document.querySelector<HTMLElement>(':root')!

//   const primaryColors = [
//     '56 189 248',
//     '56 142 60',
//     '165 160 81',
//     '123 162 63',
//     '88 178 220',
//     '244 167 185',
//   ]

//   const index = Math.floor(Math.random() * primaryColors.length)
//   const rgb = primaryColors[index]!
//   r.style.setProperty('--primary', rgb)
// }
</script>

<style>
/* ::selection {
  background: rgb(var(--primary) / 0.3);
}

body {
  background-color: #f9f9f9;
  font-family: eafont;
}

html.dark body {
  background-color: #111;
}

html.dark {
  color-scheme: dark;
}

.page-enter-active, .page-leave-active {
  transition: all 0.4s;
}

.page-enter-from, .page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
} */
</style>
