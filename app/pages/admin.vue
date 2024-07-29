<template>
  <div>
    <NMessageProvider>
      <NModalProvider>
        <NuxtPage />
      </NModalProvider>
    </NMessageProvider>
  </div>
</template>

<script setup lang="ts">
import { NMessageProvider, NModalProvider } from 'naive-ui'
</script>

  <style scoped>

  </style>
