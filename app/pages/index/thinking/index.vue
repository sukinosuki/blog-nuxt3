<template>
  <div class="bg-sky">
    thinking page

    <p>loggedIn: {{ loggedIn }}</p>
    <p>user: {{ user }}</p>
    <p>session: {{ session }}</p>

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

const { loggedIn, user, session, fetch, clear } = useUserSession()

const handleSignOut = () => {
  clear().then(() => {
    navigateTo('/')
  })
}
// ssr获取数据
// const headers = useRequestHeaders(['cookies'])
// const { data } = await useFetch('/api-admin/post', {
//   headers,
// })
</script>
