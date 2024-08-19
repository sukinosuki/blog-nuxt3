<template>
  <div>
    <div class="mx-auto px-3 py-30 min-h-100vh lg:w-960px">
      <NuxtPage />
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  pageTransition: {
    name: 'page',
    mode: 'out-in',
  },
})
</script>
