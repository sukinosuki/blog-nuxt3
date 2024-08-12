<template>
  <div>
    profile: {{ data }}
  </div>
</template>

<script setup lang="ts">
// ssr不生效
// const { data } = await useAsyncData('/api/auth/profile', () => $fetch('/api/auth/profile'))
// ssr生效
const { data } = await useFetch('/api/auth/profile')

console.log('data ', data)
</script>

<style scoped>

</style>
