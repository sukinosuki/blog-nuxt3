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
          <div class="space-x-1 flex items-center text-14px">
            <span>发布于:</span>
            <span>
              {{ dayjs(post?.created_at).format('YYYY 年 M 月 DD 日') }}
            </span>
          </div>
        </div>
        <!-- <p>{{ article?.description }}</p> -->
      </div>

      <div
        v-if="markdownContent"
        class="prose text-base prose-truegray no-underline dark:prose-invert max-w-100%"
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

        <!-- <MDCRenderer
          v-if="markdownContent?.body"
          :body="markdownContent.body"
          :data="markdownContent.data"
        /> -->

        <MDCRenderer
          :body="markdownContent.body"
          :data="markdownContent.data"
        />
      </div>

      <!-- <MDC
        :value="md"
      /> -->
    </div>
  </Suspense>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import postApi from '~/api/app-api/postApi'
import { sleep } from '~/util'

const route = useRoute()
const id = route.params.id as string

// const parse = useMarkdownParser()
const { data: post } = await useAsyncData(`/post/${id}`, () => postApi.getById(id))

const markdownContent = ref(null)

console.log('article ', post.value?.content)

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

onBeforeMount(async () => {
  // markdownContent.value = await parse(post.value!.content)
  // markdownContent.value = await parse(md)
  markdownContent.value = await parseMarkdown(md)
  console.log('markdownContent.value ', markdownContent.value)
})
</script>
