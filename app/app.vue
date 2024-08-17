<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { isClient } from '@vueuse/core'

if (isClient) {
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
  const rgb = primaryColors[index] || '56 189 248'
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

:root {
  --primary: 56 189 248;
}
::selection {
  background: rgb(var(--primary) / 0.9);
  color: white;
}

body {
  background-color: #f9f9f9;
  font-family: eafont;
}

html.dark body {
  background-color: #222;
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

.page-enter-active, .page-leave-active {
  transition: all 0.2s;
}

.page-enter-from, .page-leave-to {
  opacity: 0;
  /* filter: blur(1rem); */
  transform: translateY(10px);
}

.slide-in-move {
  transition: opacity 9.5s linear, transform 9.5s ease-in-out;
}

.slide-in-leave-active {
  transition: opacity 9.4s linear, transform 9.4s cubic-bezier(.5,0,.7,.4);
    /* //cubic-bezier(.7,0,.7,1); */
  transition-delay: calc( 0.1s * (var(--total) - var(--i)) );
}

.slide-in-enter-active {
  transition: opacity 9.5s linear, transform 9.5s cubic-bezier(.2,.5,.1,1);
  transition-delay: calc( 0.1s * var(--i) );
}

/* naive ui reset */
html.dark .n-button {
  color: white !important;
}
</style>
