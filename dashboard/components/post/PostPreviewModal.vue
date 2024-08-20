<template>
  <NModal
    v-model:show="visible"
    preset="card"
    class="w-200"
    title="Preview"
  >
    <MDCRenderer
      v-if="markdownContent"
      class="prose text-base prose-truegray no-underline dark:prose-invert max-w-full"
      :body="markdownContent.body"
      :data="markdownContent.data"
    />
  </NModal>
</template>

<script setup lang="ts">
import type { MDCParserResult } from '@nuxtjs/mdc'
import { NModal } from 'naive-ui'

const markdownParser = useMarkdownParser()
const markdownContent = ref<MDCParserResult | null>(null)

const props = defineProps<{
  post: API_Post.Model | null
  content: string
}>()

const visible = defineModel<boolean>('visible', {
  required: true,
  default: false,
})

watch(visible, async () => {
  if (!visible.value) {
    markdownContent.value = null
    return
  }

  const [err, value] = await toCatch(markdownParser(props.content))
  if (err) return

  markdownContent.value = value
})
</script>
