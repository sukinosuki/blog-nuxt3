<template>
  <div>
    <NModal
      v-model:show="visible"
      preset="card"
      class="w-200"
      title="Tag"
      @after-leave="handleAfterClose"
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
          label="Name"
          path="name"
        >
          <NInput
            v-model:value="formModel.name"
            maxlength="20"
            show-count
          />
        </NFormItem>
      </NForm>

      <template #footer>
        <div class="flex justify-end">
          <NSpace>
            <NButton @click="handleCloseModal">
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
import { NButton, NForm, NFormItem, NInput, NInputNumber, NModal, NSpace, useMessage, type FormInst, type FormRules } from 'naive-ui'
import useTagApi from '~/api/useTagApi'
import { FormModelAction } from '~/type/enum/formModalAction'
import { catchUseFetch } from '~/util/catchUseFetch'

const message = useMessage()
const tagApi = useTagApi()

type CategoryForm = {
  id: number | null
  name: string
}

const formRef = ref<FormInst>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'after-confirm'): void
}>()

const defaultFormValue: CategoryForm = {
  id: null,
  name: '',
}

const visible = defineModel<boolean>('visible', {
  default: false,
  required: true,
})

const props = defineProps<{ row?: API_Category.Model | null, action: FormModelAction }>()

const formRules: FormRules = {
  name: {
    required: true,
    trigger: ['change'],
  },
}
const formModel = ref<CategoryForm>({ ...defaultFormValue })
const confirmLoading = ref(false)

watch(visible, () => {
  if (!visible.value) return

  if (props.action === FormModelAction.EDIT) {
    formModel.value.id = props.row!.id
    formModel.value.name = props.row!.name
  }
})

// modal close event
const handleAfterClose = () => {
  Object.entries(defaultFormValue).forEach(([k, v]) => {
    formModel.value[k] = v
  })
}

// close modal
const handleCloseModal = () => {
  visible.value = false
  emit('close')
}

// confirm
const handleConfirm = async () => {
  const validate = await formRef.value?.validate().catch((err) => {
    message.warning(err[0][0].message)
  })

  if (!validate) return

  confirmLoading.value = true
  const { id, name } = formModel.value
  const data: API_Category.Update = {
    id: id ?? 0,
    name,
  }
  const fn = props.action === FormModelAction.ADD ? tagApi.add : tagApi.update

  const [err] = await catchUseFetch(fn(data))
  confirmLoading.value = false

  if (err) {
    return
  }

  emit('after-confirm')
}
</script>
