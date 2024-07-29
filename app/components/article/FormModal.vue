c<template>
  <div>
    <NModal
      v-model="visible"
      preset="card"
      class="w-200"
      title="Article"
    >
      <NForm
        ref="formRef"
        :model="articleModel"
        :rules="formRules"
        label-align="left"
        label-width="100"
        label-placement="left"
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
          path="tag_ids"
        >
          <NSelect
            v-model:value="articleModel.tag_ids"
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

        <NFormItem
          label="Enabled"
          path="enabled"
        >
          <NSwitch
            v-model:value="articleModel.enabled"
          />
        </NFormItem>

        <NFormItem
          label="Is Sticky"
          path="is_sticky"
        >
          <NSwitch
            v-model:value="articleModel.is_sticky"
          />
        </NFormItem>
      </NForm>

      <template #footer>
        <div class="flex justify-center">
          <NButton
            class="px-10"
            type="primary"
            :loading="confirmLoading"
            @click="handleCloseModal"
          >
            Cancel
          </NButton>

          <NButton
            class="px-10"
            type="primary"
            :loading="confirmLoading"
            @click="handleSubmit"
          >
            Ok
          </NButton>
        </div>
      </template>
    </NModal>
  </div>
</template>

<script setup lang="ts">
// import Vditor from 'vditor'

// import 'vditor/dist/index.css'
import { NButton, NCard, NForm, NFormItem, NInput, NModal, NSelect, NSwitch, useMessage, type FormInst, type FormRules } from 'naive-ui'
import useArticleApi from '~/api/useArticleApi'
import { catchUseFetch } from '~/util/catchUseFetch'
import { PageStatus } from '~/type/enum/pageStatus'
import { sleep } from '~/util'
import useTagApi from '~/api/useTagApi'
import useCategoryApi from '~/api/useCategoryApi'

const visible = defineModel<boolean>('visible', {
  default: false,
  required: true,
})
const articleApi = useArticleApi()
const tagApi = useTagApi()
const categoryApi = useCategoryApi()

const message = useMessage()
const route = useRoute()
const router = useRouter()
const id = Number(route.params.id)
const isUpdate = id !== 0

const pageStatus = ref(PageStatus.LOADING)

// const vditor = ref<Vditor | null>(null)

  type ArticleForm = {
    title: string
    tag_ids: string[]
    category_id: string | null
    description: string
    enabled: boolean
    is_sticky: boolean
  }

const formRef = ref<FormInst>()

const articleModel = ref<ArticleForm>({
  title: '',
  tag_ids: [],
  category_id: null,
  description: '',
  enabled: false,
  is_sticky: false,
})

const confirmLoading = ref(false)

const categoryOptions = ref<LabelValue<string>[]>([])

const tagOptions = ref<LabelValue<string>[]>([])

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

  pageStatus.value = PageStatus.LOADING
  const [err, res] = await catchUseFetch(articleApi.getById(id))

  if (err) {
    pageStatus.value = PageStatus.FAILED
    return
  }

  pageStatus.value = PageStatus.SUCCESS
  articleModel.value.category_id = String(res!.category_id)
  articleModel.value.title = res!.title
  articleModel.value.tag_ids = res!.tags.map(tag => tag.id + '')
  articleModel.value.description = res!.description
}

const fetchTagOptions = async () => {
  const [err, res] = await catchUseFetch(tagApi.get())

  if (err) return

  tagOptions.value = res?.map(item => ({ label: item.name, value: item.id + '' })) || []
}
const fetchCategoryOptions = async () => {
  const [err, res] = await catchUseFetch(categoryApi.get())
  if (err) return

  categoryOptions.value = res?.map(item => ({ label: item.name, value: item.id + '' })) || []
}

onMounted(() => {
  fetchData()

  fetchTagOptions()
  fetchCategoryOptions()
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

  // console.log('article ', vditor.value?.getValue())
  // console.log('article length', vditor.value?.getValue().length)
  // console.log('article html ', vditor.value?.getHTML())
  // const parsed = await parseMarkdown(vditor.value!.getValue())
  // console.log('parsed markdown ', parsed)

  const { title, description, category_id, tag_ids, is_sticky, enabled } = articleModel.value

  const data: API_Article.Update = {
    id,
    title,
    description,
    category_id: Number(category_id!),
    // content: vditor.value?.getValue() || '',
    tag_ids: tag_ids.map(Number),
    is_sticky,
    enabled,
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

  // TODO
  router.push('/admin/article')
}

const handleCloseModal = async () => {

}
</script>
