<template>
  <div>
    <h1> Authentication error {{ errorCode }}. Please try again! </h1>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  },
})

const route = useRoute()
const erorCode = computed(() => route.params.error)
</script>
