<template>
  <div>
    article list

    <ul>
      <li
        v-for="article in articles"
        :key="article.id"
      >
        <NuxtLink :to="`/article/${article.id}`">

          <h2>{{ article.title }}</h2>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="tsx">
const { data: articles } = await useAsyncData('/api/article', () => $fetch('/api/article'))
console.log('articles ', articles)
</script>
