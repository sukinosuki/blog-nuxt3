<template>
  <NModal
    v-model:show="visible"
    preset="card"
    class="w-90% md:w-140"
    :title="`Post #${modalTitle}`"
  >
    <div class="flex relative w-full">
      <NSpin
        :show="pageStatus === PageStatus.LOADING"
        content-class="w-full"
        class="flex relative w-full"
      >
        <NForm
          ref="formRef"
          :model="postModel"
          :rules="formRules"
          read-only
          class="w-full"
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
            label="Cover"
            path="cover"
          >
            <NInput
              v-model:value="postModel.cover"
              maxlength="200"
              show-count
            />
          </NFormItem>

          <div class="pb-4 flex justify-center">
            <div class="w-full h-40 bg-gray/10 rounded-md overflow-hidden flex justify-center items-center relative group">
              <img
                v-if="postModel.cover"
                ref="coverRef"
                class="w-full h-100% object-contain"
                :src="postModel.cover.startsWith('http') ? postModel.cover : `/api-admin/r2/${postModel.cover}`"
                alt=""
              >
              <label
                for="cover-file-input"
                class="bg-black/30 opacity-0 w-full h-full absolute left-0 top-0 flex justify-center items-center group-hover-opacity-100 duration-200 cursor-pointer"
              >
                <i class="i-ri:image-add-fill color-white w-5em h-5em block opacity-0 group-hover-scale-70 group-hover:opacity-100 duration-200" />
              </label>
              <input
                id="cover-file-input"
                type="file"
                class="hidden"
                @change="handleFileChange"
              >
            </div>
          </div>

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

        <div class="flex justify-between mt-10">
          <NButton @click="visible = false">
            Cancel
          </NButton>
          <NButton
            class="px-10 !dark-text-white"
            type="primary"
            :loading="confirmLoading"
            @click="handleSubmit"
          >
            Submit
          </NButton>
        </div>
      </NSpin>
    </div>
  </NModal>
</template>

<script setup lang="ts">
import { NButton, NCol, NForm, NFormItem, NInput, NInputNumber, NModal, NRow, NSelect, NSpin, NSwitch, useMessage, type FormRules } from 'naive-ui'
import { PageStatus } from '~~/type/enum/pageStatus'
import { toCatch } from '~/utils/toCatch'
import admin_postApi from '~~/dashboard/api/postApi'
import admin_tagApi from '~~/dashboard/api/tagApi'
import admin_categoryApi from '~~/dashboard/api/categoryApi'
import { useForm } from '~~/dashboard/composables/useForm'
import { FormModalAction } from '~~/type/enum/formModalAction'
import r2Api from '~~/dashboard/api/r2Api'

type PostForm = {
  id: number | null
  tag_ids: string[]
  category_id: string | null
} & Pick<API_Post.Model, 'title' | 'alias' | 'description' | 'enabled' | 'is_sticky' | 'cover'>

const visible = defineModel<boolean>('visible', {
  default: false,
  required: true,
})

const emit = defineEmits<{
  (e: 'after-confirm'): void
}>()

const props = defineProps<{
  action: FormModalAction | null | string
  row: API_Post.Model | null
}>()

const message = useMessage()
const isView = computed(() => props.action === FormModalAction.VIEW)
const isEdit = computed(() => props.action === FormModalAction.EDIT)
const modalTitle = computed(() => {
  if (isView.value) return 'View'

  if (isEdit.value) return 'Edit'

  return 'Add'
})
const pageStatus = ref<PageStatus | null>(null)

const initialForm: PostForm = {
  id: null,
  title: '',
  tag_ids: [],
  category_id: null,
  description: '',
  enabled: false,
  alias: '',
  cover: '',
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

const coverRef = ref(null)

watch(visible, (newValue) => {
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
  postModel.value.cover = res.cover || ''
  postModel.value.id = res.id
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
  if (isView.value) {
    visible.value = false
    return
  }

  const [validateOk] = await form.validate()
  if (!validateOk) return

  if (confirmLoading.value) return

  confirmLoading.value = true

  const { title, description, category_id, tag_ids, is_sticky, enabled, alias, id, cover } = postModel.value

  const data: API_Post.Update = {
    id: id!,
    is_sticky,
    enabled,
    cover,
    title: title.trim(),
    description: description.trim(),
    category_id: Number(category_id!),
    tag_ids: tag_ids.map(Number),
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

const handleFileChange = async (e: Event) => {
  const element = e.currentTarget as HTMLInputElement
  if (!element.files) return

  const file = element.files[0]
  if (!file) return

  const formData = new FormData()
  formData.append('file', file)
  formData.append('category', 'post')

  const [err, res] = await toCatch(r2Api.upload(formData))
  if (err || !res) return

  form.data.value.cover = res.pathname
}
</script>
