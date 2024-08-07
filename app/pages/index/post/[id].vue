<template>
  <Suspense>
    <div
      v-motion="{
        initial: {
          y: 20,
          opacity: 0,
        },
        enter: {
          y: 0,
          opacity: 1,
        },
      }"
    >
      <div>
        <h1 class="text-10">
          {{ post?.title }}
        </h1>

        <div>
          <div class="space-x-1 flex items-center">
            <i class="i-ri:time-line w-4 h-4" />
            <span class="text-4">
              {{ dayjs(post?.created_at).format('YYYY 年 M 月 DD 日') }}
            </span>
          </div>
        </div>
        <!-- <p>{{ article?.description }}</p> -->
      </div>

      <div v-if="markdownContent">
        <MDC
          v-slot="{ data, body }"
          :value="markdownContent"
        >
          <article class="p-4 prose">
            <h1 v-if="data?.title">
              {{ data.title }}
            </h1>
            <MDCRenderer
              v-if="body"
              :body="body"
              :data="data"
            />
          </article>
        </MDC>
      <!-- <MDCRenderer
        :body="markdownContent.body"
        :data="markdownContent.data"
      /> -->
      <!-- <MDC
        :value="article?.content"
      /> -->
      </div>
    </div>
  </Suspense>
</template>

<script setup lang="ts">
import { createShikiHighlighter } from '@nuxtjs/mdc/runtime'
import dayjs from 'dayjs'
import postApi from '~/api/postApi'

const route = useRoute()
const id = route.params.id

const parse = useMarkdownParser()
const { data: post } = await useAsyncData(`article:${id}`, () => postApi.getById(id))
const markdownContent = ref(null)

console.log('article ', post.value?.content)

const md = `---
title: Sam
---

# Simple

Simple paragraph

Inline code \`const codeInline: string = 'highlighted code inline'\`{lang="ts"} can be contained in paragraphs.

Code block:
\`\`\`typescript[filename]{1,3-5}meta
import { parseMarkdown } from '@nuxtjs/mdc/runtime'

async function main(mdc: string) {
  const ast = await parseMarkdown(mdc)
  // Do your magic with parsed AST tree

  return ast // [!code ++]
  return ast // [!code --]
}
\`\`\`
`

onBeforeMount(async () => {
  markdownContent.value = await parse(post.value!.content)
  // markdownContent.value = await parse(md)
  console.log('markdownContent.value ', markdownContent.value)
})
// const markdownContent = await parseMarkdown(data.value!.content, {
//   highlight: {
//     highlighter: createShikiHighlighter(),
//   },
// })
</script>

<!-- <style>
pre {
  padding: 1em 0 !important;
  --tw-prose-pre-bg: #8881 !important;
}
.line {
  display: block;
  padding: 0 1rem;
}
.line.highlight {
  width: 100%;
  background-color: #8881 !important;
}
.line.diff.remove {
  background-color: rgba(194, 58, 58, 0.3) !important;
}
.line.diff.add {
  background-color: rgba(46, 141, 46, 0.3) !important;
}
.line.diff.remove::before {
  content: '-';
  color: #c23a3a;
  position: absolute;
}
.line.diff.add::before {
  content: '+';
  color: #23b73c;
  position: absolute;
}
</style> -->
