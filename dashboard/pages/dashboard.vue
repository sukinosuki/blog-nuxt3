<template>
  <div>
    <DashboardIndexView>
      <NuxtPage />
    </DashboardIndexView>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  // middleware: ['dashboard-auth'],
  pageTransition: {
    name: 'page',
    mode: 'out-in',
  },
})
</script>
