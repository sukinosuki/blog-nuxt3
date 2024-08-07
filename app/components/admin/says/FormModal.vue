<template>
  <div>
    <NModal
      v-model:show="visible"
      preset="card"
      class="w-200"
      title="Project"
    >
      <NForm
        ref="formRef"
        label-placement="left"
        label-width="80"
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
          label="Text"
          path="text"
        >
          <NInput
            v-model:value="formModel.text"
            maxlength="200"
            show-count
          />
        </NFormItem>

        <NFormItem
          label="Source"
          path="source"
        >
          <NInput
            v-model:value="formModel.source"
            maxlength="100"
            show-count
          />
        </NFormItem>

        <NFormItem
          label="Author"
          path="author"
        >
          <NInput
            v-model:value="formModel.author"
            maxlength="100"
            show-count
          />
        </NFormItem>

        <NFormItem
          label="Enabled"
          path="enabled"
        >
          <NSwitch v-model:value="formModel.enabled" />
        </NFormItem>
      </NForm>

      <template #footer>
        <div class="flex justify-end">
          <NSpace>
            <NButton @click="visible = false">
              Cancel
            </NButton>
            <NButton
              type="primary"
              :loading="confirmLoading"
              @click="handleConfirm"
            >
              Ok
            </NButton>
          </NSpace>
        </div>
      </template>
    </NModal>
  </div>
</template>

<script setup lang="tsx">
import { NButton, NForm, NFormItem, NInput, NInputNumber, NModal, NSpace, NSwitch, useMessage, type FormRules } from 'naive-ui'
import admin_saysApi from '~/admin-api/saysApi'
import { useForm } from '~/hook/useForm'
import { FormModelAction } from '~/type/enum/formModalAction'
import { toCatch } from '~/util/toCatch'

const message = useMessage()

type SaysForm = {
  id: number | null
} & Pick<API_Says.Model, 'author' | 'enabled' | 'source' | 'text'>

const emit = defineEmits<{
  (e: 'after-confirm'): void
}>()

const visible = defineModel<boolean>('visible', {
  default: false,
  required: true,
})

const props = defineProps<{ row?: API_Says.Model | null }>()

const formRules: FormRules = {
  text: {
    required: true,
    trigger: ['change'],
  },
}

const initialForm: SaysForm = {
  id: null,
  author: '',
  source: '',
  text: '',
  enabled: true,
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

  if (props.row?.id) {
    formModel.value.id = props.row!.id
    formModel.value.text = props.row!.text
    formModel.value.author = props.row!.author
    formModel.value.source = props.row!.source
    formModel.value.enabled = props.row!.enabled
  }
})

// confirm
const handleConfirm = async () => {
  const [validateOk, validateMsg] = await form.validate()
  if (!validateOk || validateMsg) {
    message.warning(validateMsg || 'validate failed.')

    return
  }

  if (confirmLoading.value) return

  confirmLoading.value = true
  const { id, text, author, source, enabled } = formModel.value
  const data: API_Says.Update = {
    id: id || 0,
    text,
    author,
    source,
    enabled,
  }
  const fn = data.id ? admin_saysApi.update : admin_saysApi.add

  const [err] = await toCatch(fn(data))
  confirmLoading.value = false

  if (err) return

  emit('after-confirm')
}
</script>
