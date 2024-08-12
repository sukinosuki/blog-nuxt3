<template>
  <div>
    <NModal
      v-model:show="visible"
      preset="card"
      class="w-90% md:w-140"
      title="Post"
    >
      <NForm
        ref="formRef"
        :model="postModel"
        :rules="formRules"
        read-only
      >
        <NFormItem
          class="hidden"
          label="Id"
          path="id"
        >
          <NInputNumber
            v-model:value="postModel.id"
          />
        </NFormItem>

        <NFormItem
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
            你可以通过 `/api/post/<span class="text-[var(--n-color-target)]">{{ postModel.alias }}</span>` 获取这篇文章
          </template>
        </NFormItem>

        <NFormItem
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
        >
          <NInput
            v-model:value="postModel.description"
            maxlength="200"
            show-count
            type="textarea"
          />
        </NFormItem>

        <NRow>
          <NCol :span="12">
            <NFormItem
              label="Enabled"
              path="enabled"
            >
              <NSwitch
                v-model:value="postModel.enabled"
              />
            </NFormItem>
          </NCol>

          <NCol :span="12">
            <NFormItem
              label="Is Sticky"
              path="is_sticky"
            >
              <NSwitch
                v-model:value="postModel.is_sticky"
              />
            </NFormItem>
          </NCol>
        </NRow>
      </NForm>

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
    </NModal>
  </div>
</template>

<script setup lang="ts">
import { NButton, NCol, NForm, NFormItem, NInput, NInputNumber, NModal, NRow, NSelect, NSwitch, useMessage, type FormRules } from 'naive-ui'
import { PageStatus } from '~/type/enum/pageStatus'
import { toCatch } from '~/util/toCatch'
import admin_postApi from '~/api/admin-api/postApi'
import admin_tagApi from '~/api/admin-api/tagApi'
import admin_categoryApi from '~/api/admin-api/categoryApi'
import { useForm } from '~/hook/useForm'
import { FormModelAction } from '~/type/enum/formModalAction'

type PostForm = {
  id: number | null
  tag_ids: string[]
  category_id: string | null
} & Pick<API_Post.Model, 'title' | 'alias' | 'description' | 'enabled' | 'is_sticky'>

const visible = defineModel<boolean>('visible', {
  default: false,
  required: true,
})

const emit = defineEmits<{
  (e: 'after-confirm'): void
}>()

const props = defineProps<{
  action: FormModelAction
  row: API_Post.Model | null
}>()

const message = useMessage()
const isView = computed(() => props.action === FormModelAction.VIEW)
// const isAdd = computed(() => props.action === FormModelAction.ADD)
const isEdit = computed(() => props.action === FormModelAction.EDIT)

const pageStatus = ref(PageStatus.LOADING)

const initialForm: PostForm = {
  id: null,
  title: '',
  tag_ids: [],
  category_id: null,
  description: '',
  enabled: false,
  alias: '',
  is_sticky: false,
}
const form = useForm(initialForm)
const postModel = form.data
const formRef = form.ref

const confirmLoading = ref(false)

// TODO: 全局保存
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

watch(visible, (newValue) => {
  console.log('newValue ', newValue)

  if (!newValue) {
    form.reset()
    return
  }

  if (isEdit.value || isView.value) {
    fetchData()
  }

  fetchTagOptions()
  fetchCategoryOptions()
})
//
const fetchData = async () => {
  pageStatus.value = PageStatus.LOADING
  const [err, res] = await toCatch(admin_postApi.getById(props.row!.id))

  if (err || !res) {
    pageStatus.value = PageStatus.FAILED
    return
  }

  pageStatus.value = PageStatus.SUCCESS
  postModel.value.category_id = String(res.category_id)
  postModel.value.title = res.title
  postModel.value.tag_ids = res.tags?.map(tag => tag.id + '') || []
  postModel.value.description = res.description
  postModel.value.enabled = res.enabled
  postModel.value.is_sticky = res.is_sticky
  postModel.value.alias = res.alias || ''
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

//
const handleSubmit = async () => {
  console.log('form ', postModel.value)
  if (isView.value) {
    visible.value = false
    return
  }

  const [validateOk] = await form.validate()
  if (!validateOk) return

  if (confirmLoading.value) return

  confirmLoading.value = true

  const { title, description, category_id, tag_ids, is_sticky, enabled, alias, id } = postModel.value

  const data: API_Post.Update = {
    id: id!,
    title: title.trim(),
    description: description.trim(),
    category_id: Number(category_id!),
    tag_ids: tag_ids.map(Number),
    is_sticky,
    enabled,
    alias: alias?.trim() || null,
  }

  const fn = isEdit.value ? admin_postApi.update : admin_postApi.add
  const [err] = await toCatch(fn(data))
  confirmLoading.value = false
  if (err !== null) {
    return
  }

  message.success('ok')

  emit('after-confirm')
}
</script>
