<template>
  <div>
    <NModal
      v-model:show="visible"
      preset="card"
      class="w-140 max-md-w-90%"
      title="Tag"
    >
      <NForm
        ref="formRef"
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
  </div>
</template>

<script setup lang="tsx">
import { NButton, NForm, NFormItem, NInput, NInputNumber, NModal, type FormRules } from 'naive-ui'
import admin_tagApi from '~~/dashboard/api/tagApi'
import { useForm } from '~~/dashboard/composables/useForm'
import { FormModalAction } from '~~/type/enum/formModalAction'

type CategoryForm = {
  id: number | null
} & Pick<API_Tag.Model, 'name'>

const emit = defineEmits<{
  (e: 'after-confirm'): void
}>()

const initialFormModel: CategoryForm = {
  id: null,
  name: '',
}

const visible = defineModel<boolean>('visible', {
  default: false,
  required: true,
})

const props = defineProps<{
  row?: API_Tag.Model | null
  action: FormModalAction | null
}>()

const formRules: FormRules = {
  name: {
    required: true,
    trigger: ['change'],
  },
}

const form = useForm(initialFormModel)
const formModel = form.data
const formRef = form.ref

const confirmLoading = ref(false)

watch(visible, () => {
  if (!visible.value) {
    form.reset()
    return
  }

  if (props.action === FormModalAction.EDIT) {
    formModel.value.id = props.row!.id
    formModel.value.name = props.row!.name
  }
})

// confirm
const handleConfirm = async () => {
  const [validateOk] = await form.validate()

  if (!validateOk) return

  confirmLoading.value = true
  const { id, name } = formModel.value
  const data: API_Tag.Update = {
    id: id ?? 0,
    name,
  }
  const fn = props.action === FormModalAction.ADD ? admin_tagApi.add : admin_tagApi.update

  const [err] = await toCatch(fn(data))
  confirmLoading.value = false

  if (err) return

  emit('after-confirm')
}
</script>
