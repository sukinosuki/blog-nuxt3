<template>
  <div>
    <div :class="[samplePreviewVisible?'':'md-max-w-768px mx-auto']">
      <div class="flex justify-between">
        <div>
          <span class="text-primary italic font-bold">{{ post?.title }}</span>
        </div>
        <div class="flex items-center">
          <NSpace class="flex items-center">
            <div
              class="p-1 rounded cursor-pointer duration-200 active:scale-90 "
              :class="[samplePreviewVisible ? 'bg-gray-2 dark:bg-gray-6' : '']"
              @click="samplePreviewVisible = !samplePreviewVisible"
            >
              <div
                class="i-ri:slash-commands-2 w-1.4em h-1.4em text-black/40 dark-text-white"
              />
            </div>

            <NButton
              size="small"
              @click="previewModalVisible = true"
            >
              Preview
            </NButton>

            <NButton
              type="primary"
              size="small"
              :loading="confirmLoading"
              @click="handleSubmit"
            >
              Submit
            </NButton>
          </NSpace>
        </div>
      </div>

      <div class="mt-4 flex">
        <div
          class="max-md-w-100%"
          :class="[samplePreviewVisible ? 'w-50%' : 'w-100%']"
        >
          <codemirror
            v-model="code"
            placeholder="Code goes here..."
            :style="{ height: 'auto' }"
            :autofocus="true"
            :indent-with-tab="true"
            :tab-size="2"
            :extensions="extensions"
            @change="() => {}"
            @focus="() => {}"
            @blur="() => {}"
          />
        </div>
        <div
          v-if="samplePreviewVisible"
          class="w-50% p-2 max-w-100% max-md-hidden prose text-base prose-truegray dark:prose-invert"
        >
          <MDC :value="code" />
        </div>
      </div>
    </div>

    <PostPreviewModal
      v-model:visible="previewModalVisible"
      :post="post"
      :content="code"
    />
  </div>
</template>

<script setup lang="ts">
// https://github.com/surmon-china/vue-codemirror
import { NButton, NSpace } from 'naive-ui'
import { Codemirror } from 'vue-codemirror'
import { oneDark } from '@codemirror/theme-one-dark'
import { markdown } from '@codemirror/lang-markdown'
import { PageStatus } from '~~/type/enum/pageStatus'
import admin_postApi from '~~/dashboard/api/postApi'

const route = useRoute()
const id = Number(route.params.id)
const isUpdate = id !== 0

const pageStatus = ref(PageStatus.LOADING)
const samplePreviewVisible = ref(false)

const confirmLoading = ref(false)

const post = ref<API_Post.Model | null>(null)

const code = ref('')
const previewModalVisible = ref(false)

//
const extensions = computed(() => {
  if (colorMode.value === 'dark') {
    return [oneDark, markdown()]
  }

  return [markdown()]
})

const colorMode = useColorMode()

//
const fetchData = async () => {
  if (!isUpdate) return

  pageStatus.value = PageStatus.LOADING
  const [err, res] = await toCatch(admin_postApi.getById(id))

  if (err || !res) {
    pageStatus.value = PageStatus.FAILED
    return
  }

  pageStatus.value = PageStatus.SUCCESS

  code.value = res.content
  post.value = res
}

const handleSubmit = async () => {
  if (confirmLoading.value) return

  confirmLoading.value = true

  const data: API_Post.UpdateField = {
    id,
    value: code.value,
    field: 'content',
  }

  const [err] = await toCatch(admin_postApi.updateField(data))
  confirmLoading.value = false
  if (err !== null) {
    return
  }

  navigateTo('/dashboard/post')
}

onMounted(() => {
  fetchData()
})
</script>
