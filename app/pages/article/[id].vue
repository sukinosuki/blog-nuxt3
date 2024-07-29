<template>
  <Suspense>
    <div>
      <div>
        <h1>{{ article?.title }}</h1>
        <p>{{ article?.description }}</p>

        <NSpace>
          <NTag
            v-for="tag in article?.tags"
            :key="tag.id"
            type="primary"
            size="small"
          >
            {{ tag.name }}
          </NTag>
        </NSpace>
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
import { NSpace, NTag } from 'naive-ui'

const route = useRoute()
const id = Number(route.params.id)

const parse = useMarkdownParser()
const { data: article } = await useAsyncData(`article:${id}`, () => $fetch<API_Article.Model>(`/api/article/${id}`))
const markdownContent = ref(null)

console.log('article ', article.value?.content)

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
  markdownContent.value = await parse(article.value!.content)
  // markdownContent.value = await parse(md)
  console.log('markdownContent.value ', markdownContent.value)
})
// const markdownContent = await parseMarkdown(data.value!.content, {
//   highlight: {
//     highlighter: createShikiHighlighter(),
//   },
// })
</script>

<style>
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
</style>
