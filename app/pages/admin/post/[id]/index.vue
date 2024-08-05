<template>
  <div>
    <NCard>
      <div class="flex justify-center">
        <NForm
          ref="formRef"
          :model="postModel"
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
              v-model:value="postModel.title"
              maxlength="50"
              show-count
            />
          </NFormItem>

          <NFormItem
            class="md-w-100"
            label="Alias"
            path="alias"
          >
            <NInput
              v-model:value="postModel.alias"
              maxlength="50"
              show-count
            />

            <template
              v-if="postModel.alias"
              #feedback
            >
              你可以通过 <span class="text-blue">`/api/post/{{ postModel.alias }}`</span> 获取这篇文章
            </template>
          </NFormItem>

          <NFormItem
            class="md-w-100"
            label="Category"
            path="category_id"
          >
            <NSelect
              v-model:value="postModel.category_id"
              :options="categoryOptions"
            />
          </NFormItem>

          <NFormItem
            label="Tags"
            class="md-w-100"
            path="tag_ids"
          >
            <NSelect
              v-model:value="postModel.tag_ids"
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
              v-model:value="postModel.description"
              maxlength="200"
              show-count
              type="textarea"
            />
          </NFormItem>

          <NFormItem
            label="Enabled"
            path="enabled"
          >
            <NSwitch
              v-model:value="postModel.enabled"
            />
          </NFormItem>

          <NFormItem
            label="Is Sticky"
            path="is_sticky"
          >
            <NSwitch
              v-model:value="postModel.is_sticky"
            />
          </NFormItem>
        </NForm>
      </div>

      <div class="flex justify-center mt-10">
        <NButton
          class="px-10 "
          type="primary"
          :loading="confirmLoading"
          @click="handleSubmit"
        >
          Submit
        </NButton>
      </div>
    </NCard>
  </div>
</template>

<script setup lang="ts">
import { NButton, NCard, NForm, NFormItem, NInput, NSelect, NSwitch, useMessage, type FormInst, type FormRules } from 'naive-ui'
import { PageStatus } from '~/type/enum/pageStatus'
import { sleep } from '~/util'
import { toCatch } from '~/util/toCatch'
import admin_postApi from '~/admin-api/postApi'
import admin_tagApi from '~/admin-api/tagApi'
import admin_categoryApi from '~/admin-api/categoryApi'

const message = useMessage()
const route = useRoute()
const router = useRouter()
const id = Number(route.params.id)
const isUpdate = id !== 0

const pageStatus = ref(PageStatus.LOADING)

type PostForm = {
  title: string
  tag_ids: string[]
  category_id: string | null
  description: string
  enabled: boolean
  is_sticky: boolean
  alias: string
}

const formRef = ref<FormInst>()

const postModel = ref<PostForm>({
  title: '',
  tag_ids: [],
  category_id: null,
  description: '',
  enabled: false,
  alias: '',
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
  const [err, res] = await toCatch(admin_postApi.getById(id))

  if (err) {
    pageStatus.value = PageStatus.FAILED
    return
  }

  pageStatus.value = PageStatus.SUCCESS
  postModel.value.category_id = String(res!.category_id)
  postModel.value.title = res!.title
  postModel.value.tag_ids = res!.tags.map(tag => tag.id + '')
  postModel.value.description = res!.description
  postModel.value.enabled = res!.enabled
  postModel.value.is_sticky = res!.is_sticky
  postModel.value.alias = res!.alias || ''
}

const fetchTagOptions = async () => {
  const [err, res] = await toCatch(admin_tagApi.get())

  if (err) return

  tagOptions.value = res?.map(item => ({ label: item.name, value: item.id + '' })) || []
}
const fetchCategoryOptions = async () => {
  const [err, res] = await toCatch(admin_categoryApi.get())
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
  console.log('form ', postModel.value)

  const validate = await formRef.value?.validate().catch((err) => {
    message.warning(err[0][0].message)
  })

  if (!validate) return

  if (confirmLoading.value) return

  confirmLoading.value = true

  const { title, description, category_id, tag_ids, is_sticky, enabled, alias } = postModel.value

  const data: API_Post.Update = {
    id,
    title,
    description,
    category_id: Number(category_id!),
    tag_ids: tag_ids.map(Number),
    is_sticky,
    enabled,
    alias: alias.trim() || null,
  }
  console.log('data ', data)

  const fn = isUpdate ? admin_postApi.update : admin_postApi.add
  const [err] = await toCatch(fn(data))
  confirmLoading.value = false
  if (err !== null) {
    return
  }

  message.success('ok')
  await sleep()

  // TODO
  router.push('/admin/post')
}
</script>
