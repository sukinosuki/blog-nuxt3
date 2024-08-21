<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// modules配置了@nuxtjs/seo不能使用 useSeoMeta设置title?
// useSeoMeta({
// useHead({
//   titleTemplate(title) {
//     return title ? `${title} | Miiro` : 'Miiro'
//   },
// })

// useServerSeoMeta({
//   // robots: 'index, follow',
//   // ogTitle: 'Miiro works\' Site',
//   // ogDescription: 'ogDescription',
//   // ogImage: 'ogImage',
//   // description: '能为改变自己而努力, 我觉得是件厉害的事',
//   // twitterCard: 'summary_large_image22',
// })

const route = useRoute()

if (import.meta.client) {
  console.log('runtime config ', useRuntimeConfig())

  const isDashboardPage = route.path.startsWith('/dashboard')

  const r = document.querySelector<HTMLElement>(':root')!

  const primaryColors = [
    '56 189 248',
    '56 142 60',
    '165 160 81',
    '123 162 63',
    '88 178 220',
    '244 167 185',
  ]

  const index = Math.floor(Math.random() * primaryColors.length)
  let rgb = primaryColors[index] || '56 189 248'
  if (isDashboardPage) {
    rgb = '139 92 246'
  }

  r.style.setProperty('--primary', rgb)
}
</script>

<style>
/* view transition reset */
::view-transition-old(root), ::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root) {
  z-index: 999;
}

::view-transition-new(root) {
  z-index: 1;
}
.light::view-transition-old(root){
  z-index: 1;
}
.light::view-transition-new(root){
  z-index: 999;
}

@font-face {
  font-family: eafont;
  src: url('/static/font/eafont.ttf');
}

:root {
  --primary: 56 189 248;
}
::selection {
  background: rgb(var(--primary) / 0.9);
  color: white;
}

body {
  background-color: white;
  font-family: eafont;
}

html.dark body {
  background-color: #111;
}

html.dark {
  color-scheme: dark;
}

/* medium zoom reset */
.medium-zoom-overlay {
  z-index: 999;
}
.medium-zoom-image {
  z-index: 1000;
}

/* transition */
.page-enter-active, .page-leave-active {
  transition: all 0.2s;
}

.page-enter-from, .page-leave-to {
  opacity: 0;
  filter: blur(1rem);
  transform: translateY(10px);
}

/* naive ui reset */
html.dark .n-button {
  color: white !important;
}

/* toc reset */
.toc-list {
  padding-left: 20px;
}
.toc-list-item {
  font-size: 16px;
}
.toc-list-item .toc-link {
  transition: .2s;
}
.toc-list-item .toc-link::before{
  display: none;
}
.toc-list-item .toc-link.is-active-link {
  margin-left: -10px;
  color: rgb(var(--primary));
  font-weight: normal
}
</style>
