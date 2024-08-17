<template>
  <NModal
    v-model:show="visible"
    preset="card"
    class="w-140 max-md-90%"
    title="Project"
  >
    <NForm
      ref="formRef"
      label-width="100"
      :model="formModel"
      :rules="formRules"
    >
      <NFormItem
        label="ID"
        path="id"
        class="hidden"
      >
        <NInputNumber
          v-model:value="formModel.id"
          readonly
        />
      </NFormItem>

      <NFormItem
        label="Name"
        path="name"
      >
        <NInput
          v-model:value="formModel.name"
          maxlength="50"
          show-count
        />
      </NFormItem>

      <NFormItem
        label="Description"
        path="description"
      >
        <NInput
          v-model:value="formModel.description"
          type="textarea"
          maxlength="100"
          show-count
        />
      </NFormItem>

      <NFormItem
        label="Repository"
        path="repository"
      >
        <NInput
          v-model:value="formModel.repository"
          maxlength="200"
          show-count
        />
      </NFormItem>

      <NFormItem
        label="Cover"
        path="cover"
      >
        <NInput
          v-model:value="formModel.cover"
          maxlength="200"
          show-count
        />
      </NFormItem>

      <NFormItem
        label="Preview"
        path="preview"
      >
        <NInput
          v-model:value="formModel.preview"
          maxlength="200"
          show-count
        />
      </NFormItem>
    </NForm>

    <template #footer>
      <div class="flex justify-between">
        <NButton @click="visible = false">
          Cancel
        </NButton>
        <NButton
          type="primary"
          :loading="confirmLoading"
          @click="handleConfirm"
        >
          Submit
        </NButton>
      </div>
    </template>
  </NModal>
</template>

<script setup lang="tsx">
import { NButton, NForm, NFormItem, NInput, NInputNumber, NModal, type FormRules } from 'naive-ui'
import admin_projectApi from '~/api/admin-api/projectApi'
import { useForm } from '~/hook/useForm'
import { FormModalAction } from '~/type/enum/formModalAction'

type ProjectForm = {
  id: number | null
} & Pick<API_Project.Model, 'name' | 'cover' | 'description' | 'preview' | 'repository'>

const emit = defineEmits<{
  (e: 'after-confirm'): void
}>()

const visible = defineModel<boolean>('visible', {
  default: false,
  required: true,
})

const props = defineProps<{
  row?: API_Project.Model | null
  action: FormModalAction | string | null
}>()

const formRules: FormRules = {
  name: {
    required: true,
    trigger: ['change'],
  },
  description: {
    required: true,
    trigger: ['change'],
  },
  repository: {
    required: true,
    trigger: ['change'],
  },
}

const initialForm: ProjectForm = {
  id: null,
  name: '',
  cover: null,
  description: '',
  preview: null,
  repository: '',
}

const form = useForm(initialForm)
const formRef = form.ref
const formModel = form.data
const confirmLoading = ref(false)

watch(visible, () => {
  if (!visible.value) {
    form.reset()
    return
  }

  if (props.action === FormModalAction.EDIT) {
    formModel.value.id = props.row!.id
    formModel.value.name = props.row!.name
    formModel.value.cover = props.row!.cover
    formModel.value.description = props.row!.description
    formModel.value.preview = props.row!.preview
    formModel.value.repository = props.row!.repository
  }
})

// confirm
const handleConfirm = async () => {
  const [validateOk] = await form.validate()
  if (!validateOk) {
    return
  }

  if (confirmLoading.value) return

  confirmLoading.value = true
  const { id, preview, name, cover, description, repository } = formModel.value
  const data: API_Project.Update = {
    id: id || 0,
    name,
    cover,
    description,
    repository,
    preview,
  }
  const fn = props.action === FormModalAction.ADD ? admin_projectApi.add : admin_projectApi.update

  const [err] = await toCatch(fn(data))
  confirmLoading.value = false

  if (err) return

  emit('after-confirm')
}
</script>
