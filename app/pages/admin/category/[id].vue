<script setup lang="ts">
import Vditor from 'vditor'

import 'vditor/dist/index.css'
import { NButton, NCard, NForm, NFormItem, NInput, NSelect, useMessage, type FormInst, type FormRules } from 'naive-ui'
import useArticleApi from '~/api/useArticleApi'
import { catchUseFetch } from '~/util/catchUseFetch'
import { PageStatus } from '~/type/enum/pageStatus'
import { sleep } from '~/util'

const articleApi = useArticleApi()
const message = useMessage()
const route = useRoute()
const router = useRouter()
const id = Number(route.params.id)
const isUpdate = id !== 0

const pageStatus = ref(PageStatus.LOADING)

const vditor = ref<Vditor | null>(null)

type ArticleForm = {
  title: string
  tags: string[]
  category_id: string | null
  description: string
}

const formRef = ref<FormInst>()

const articleModel = ref<ArticleForm>({
  title: '',
  tags: [],
  category_id: null,
  description: '',
})

const confirmLoading = ref(false)

const categoryOptions = ref([
  {
    label: 'life',
    value: '1',
  },
  {
    label: 'code',
    value: '2',
  },
])

const tagOptions = ref([
  {
    label: 'nuxt',
    value: '1',
  },
  {
    label: 'kotlin',
    value: '2',
  },
  {
    label: 'java',
    value: '3',
  },
  {
    label: 'TypeScript',
    value: '4',
  },
])

const formRules: FormRules = {
  title: [
    {
      required: true,
      trigger: ['change'],
    },
  ],

  category_id: {
    required: true,
    trigger: ['change'],
  },

  description: {
    required: true,
    trigger: ['change'],
  },

}

//
const fetchData = async () => {
  if (!isUpdate) return

  await sleep(1000)

  pageStatus.value = PageStatus.LOADING
  const [err, res] = await catchUseFetch(articleApi.getById(id))

  if (err) {
    pageStatus.value = PageStatus.FAILED
    return
  }

  pageStatus.value = PageStatus.SUCCESS
  articleModel.value.category_id = String(res!.category_id)
  articleModel.value.title = res!.title
  articleModel.value.description = res!.description
  vditor.value?.setValue(res!.content)
}

const initVditor = () => {
  vditor.value = new Vditor('vditor', {
    height: 700,
    after: () => {
    },
  })
}

onMounted(() => {
  initVditor()
  fetchData()
})

onUnmounted(() => {
  console.log('onUnmounted')
  vditor.value?.destroy()
})
//
const handleSubmit = async () => {
  console.log('form ', articleModel.value)

  const validate = await formRef.value?.validate().catch((err) => {
    message.warning(err[0][0].message)
  })

  if (!validate) return

  if (confirmLoading.value) return

  confirmLoading.value = true

  console.log('validate ', validate)

  console.log('article ', vditor.value?.getValue())
  console.log('article length', vditor.value?.getValue().length)
  console.log('article html ', vditor.value?.getHTML())
  const parsed = await parseMarkdown(vditor.value!.getValue())
  console.log('parsed markdown ', parsed)

  const { title, description, category_id, tags } = articleModel.value

  const data: API_Article.Update = {
    id,
    title,
    description,
    category_id: Number(category_id!),
    content: vditor.value?.getValue() || '',
    tags: tags.map(Number),
  }
  console.log('data ', data)

  const fn = isUpdate ? articleApi.update : articleApi.add
  const [err, res] = await catchUseFetch(fn(data))
  confirmLoading.value = false
  if (err !== null) {
    return
  }

  console.log('res ', res)

  message.success('ok')
  await sleep()

  router.push('/admin/article')
}
</script>

<template>
  <div>
    <NCard>
      <NForm
        ref="formRef"
        :model="articleModel"
        :rules="formRules"
      >
        <NFormItem
          class="md-w-100"
          label="Title"

          path="title"
        >
          <NInput
            v-model:value="articleModel.title"
            maxlength="50"
            show-count
          />
        </NFormItem>

        <NFormItem
          class="md-w-100"
          label="Category"
          path="category_id"
        >
          <NSelect
            v-model:value="articleModel.category_id"
            :options="categoryOptions"
          />
        </NFormItem>

        <NFormItem
          label="Tags"
          class="md-w-100"
          path="tags"
        >
          <NSelect
            v-model:value="articleModel.tags"
            multiple
            :max-tag-count="4"
            :options="tagOptions"
          />
        </NFormItem>

        <NFormItem
          label="Description"
          path="description"
          class="md-w-100"
        >
          <NInput
            v-model:value="articleModel.description"
            maxlength="20"
            show-count
            type="textarea"
          />
        </NFormItem>
      </NForm>

      <div id="vditor" />

      <div class="flex justify-center mt-10">
        <NButton
          class="px-10"
          type="primary"
          :loading="confirmLoading"
          @click="handleSubmit"
        >
          save
        </NButton>
      </div>
    </NCard>
  </div>
</template>
