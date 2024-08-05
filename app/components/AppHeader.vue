<template>
  <nav
    ref="headerRef"
    class="bg-sky flex rounded-full shadow sticky"
    :style="styles"
  >
    <NuxtLink
      v-for="nav in navs"
      :key="nav.name"
      class="flex h-10 items-center px-2 mx-2"
    >
      {{ nav.name }}
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
import { useFixedHeader } from 'vue-use-fixed-header'

const headerRef = ref(null)
const { styles } = useFixedHeader(headerRef)

type Nav = {
  name: string
  href: string
}

const navs = ref<Nav[]>([
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Friend',
    href: '/',
  },
  {
    name: 'Article',
    href: '/',
  },
  {
    name: '关于',
    href: '/about',
  },
])
</script>
