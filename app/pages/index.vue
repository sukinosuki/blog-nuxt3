<script setup lang="ts">
// const article2 = import('')
import article2 from '../post/article1.json'

const colorMode = useColorMode()

const { data: ast } = await useAsyncData('markdown', () => parseMarkdown('::alert\nMissing markdown input\n::'))

const article = await useAsyncData('article', () => import('../post/article1.json'))

async function getColorMode() {
  console.log('getColorMode ', colorMode.value)
}

function logMarkdownAst() {
  console.log('ast ', ast)
  console.log('article ', article.data.value)
  console.log('article2 ', article2)
}
const md = `
::alert
Hello MDC
::
`

const loadMessages = async () => {
  const res = await useFetch('/api/messages')
  console.log('res ', res)
}
const postMessage = async () => {
  const res = await useFetch('/api/messages', {
    method: 'post',
    body: {
      text: 'hanami',
    },
  })
  console.log('res ', res)

  loadMessages()
}
</script>

<template>
  <!-- <NuxtLayout> -->
  <NuxtPage />
  <!-- </NuxtLayout> -->
</template>
<!-- <template>
  <main>
    <div class="h-100" />
    <MDC
      :value="md"
      tag="article"
    />

    <MDCRenderer :body="article?.body" />

    <button @click="logMarkdownAst">
      log markdown ast
    </button>

    <button @click="loadMessages">
      load messages
    </button>
    <button @click="postMessage">
      post message
    </button>
  </main>
</template> -->
