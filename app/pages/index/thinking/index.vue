<template>
  <div class="bg-sky">
    thinking page

    <p>status: {{ status }}</p>
    <p>data: {{ data }}</p>

    <button @click="handleSignOut">
      sign out
    </button>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  // auth: true,
  middleware: 'dashboard-auth',
})
const { status, data, signOut } = useAuth()

const handleSignOut = () => {
  signOut({
    callbackUrl: '/',
  })
}
// ssr获取数据
// const headers = useRequestHeaders(['cookies'])
// const { data } = await useFetch('/api-admin/post', {
//   headers,
// })
</script>
