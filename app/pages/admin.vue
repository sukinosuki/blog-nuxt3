<template>
  <div class="mt-20">
    <NConfigProvider preflight-style-disabled>
      <NMessageProvider>
        <NModalProvider>
          <NuxtPage />
        </NModalProvider>
      </NMessageProvider>
    </NConfigProvider>
  </div>
</template>

<script setup lang="ts">
import { NConfigProvider, NMessageProvider, NModalProvider } from 'naive-ui'
</script>

<style scoped>

</style>
