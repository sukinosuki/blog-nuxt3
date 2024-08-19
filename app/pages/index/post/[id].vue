<template>
  <div
    class="md-w-768px mx-auto"
  >
    <div>
      <h1 class="text-10">
        {{ post?.title }}
      </h1>

      <div>
        <div class="space-x-1 flex items-center text-14px">
          <span>发布于: </span>
          <span v-if="post?.created_at">
            {{ publishDate }}
          </span>
        </div>
      </div>

      <p class="mt-2">
        {{ post?.description }}
      </p>
    </div>

    <div
      v-if="markdownContent"
      class="prose text-base prose-truegray no-underline dark:prose-invert max-w-full"
    >
      <!-- <MDC
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
          </MDC> -->
      <ClientOnly>
        <MDCRenderer
          :body="markdownContent.body"
          :data="markdownContent.data"
        />
      </ClientOnly>
    </div>

    <div
      v-else
      class="h-100 flex justify-center items-center animate-bounce"
    >
      <span class="w-4 h-4 rounded-full bg-black" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MDCParserResult } from '@nuxtjs/mdc'
import postApi from '~/api/app-api/postApi'

const route = useRoute()
const id = route.params.id as string
const markdownContent = ref<MDCParserResult | null>(null)

const { data: post, error } = await useAsyncData(`/post/${id}`, () => postApi.getById(id), {
  getCachedData: (key) => {
    return useNuxtApp().payload.data[key]
  },
})

if (error.value) {
  showError(error.value)
}

useHead({
  title: post.value?.title,
})

const publishDate = computed(() => {
  return dateUtil.format(post.value!.created_at)
})

const markdownParser = useMarkdownParser()
const md = `---
title: Sam
---

# H1 标题

## H2 标题

### H3 标题

#### H4 标题


A [rich text](/) will be **rendered** by the component.


|  "引用 abc "

::github-repos-card{repos="flutter/packages"}
::

inline \`unocss\` [miiro](https://github.com/sukinosuki){target="_blank"}

aa [Link](https://www.baidu.com) bb

![image](https://r2-img.lnbiuc.com/blog/2024/02/2183ab9bfce23f50dd39994b521a44f5ea408fcab6d5fe525b2124527a7ea58e.gif)

Simple paragraph
Apply any font size for body you like and prose will scale the styles for the respective HTML elements. For instance, prose text-lg has body font size 1.125rem and h1 will scale with that size 2.25 times. See all the supported HTML elements.

Inline code \`const codeInline: string = 'highlighted code inline'\`{lang="ts"} can be contained in paragraphs.

Code block:
\`\`\`javascript[filename]{1,3-5}meta
import { parseMarkdown } from '@nuxtjs/mdc/runtime'

async function main(mdc: string) {
  const ast = await parseMarkdown(mdc)
  // Do your magic with parsed AST tree

  return ast // [!code ++]
  return ast // [!code --]
}
\`\`\`
`

onMounted(async () => {
  const start = new Date()
  console.log('start.getTime() ', start.getTime())

  if (!post.value!.content) return

  markdownContent.value = await markdownParser(post.value!.content)

  // console.log('parsed ', new Date().getTime() - start.getTime())

  setTimeout(() => {
    useNuxtApp().$mediumZoom?.detach(['zoomable']).attach(['zoomable'])
  }, 1000)
})
</script>
