<template>
  <div>
    <NModal
      v-model:show="visible"
      preset="card"
      class="w-140 max-md-90%"
      title="Category"
    >
      <NForm
        ref="formRef"
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

        <NFormItem
          label="Alias"
          path="alias"
        >
          <NInput
            v-model:value="formModel.alias"
            maxlength="20"
            show-count
          />
          <template
            v-if="formModel.alias?.trim()"
            #feedback
          >
            你可以通过 <span class="text-gray">`/api/category/<span class="text-[var(--n-color-target)]">{{ formModel.alias }}</span>/post`</span> 获取该分类下的文章
          </template>
        </NFormItem>
      </NForm>

      <template #footer>
        <div class="flex justify-between">
          <NButton @click="handleCloseModal">
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
import admin_categoryApi from '~~/dashboard/api/categoryApi'
import { useForm } from '~~/dashboard/composables/useForm'
import { FormModalAction } from '~~/type/enum/formModalAction'
import { toCatch } from '~/utils/toCatch'

type CategoryForm = {
  id: number | null
  alias: string | null
} & Pick<API_Category.Model, 'name'>

const emit = defineEmits<{
  (e: 'after-confirm'): void
}>()

const props = defineProps<{ row?: API_Category.Model | null, action: FormModalAction }>()

const formRules: FormRules = {
  name: {
    required: true,
    trigger: ['change'],
  },
}

const defaultFormValue: CategoryForm = {
  id: null,
  name: '',
  alias: null,
}

const visible = defineModel<boolean>('visible', {
  default: false,
  required: true,
})
const confirmLoading = ref(false)
const form = useForm(defaultFormValue)
const formRef = form.ref
const formModel = form.data

watch(visible, () => {
  if (!visible.value) {
    form.reset()
    return
  }

  if (props.action === FormModalAction.EDIT) {
    formModel.value.id = props.row!.id
    formModel.value.name = props.row!.name
    formModel.value.alias = props.row!.alias
  }
})

// close modal
const handleCloseModal = () => {
  visible.value = false
}

// confirm
const handleConfirm = async () => {
  const [validateOk] = await form.validate()
  if (!validateOk) {
    return
  }

  confirmLoading.value = true
  const { id, name, alias } = formModel.value
  const data: API_Category.Update = {
    id: id || 0,
    name,
    alias: alias?.trim() || null,
  }
  const fn = props.action === FormModalAction.ADD ? admin_categoryApi.add : admin_categoryApi.update

  const [err] = await toCatch(fn(data))
  confirmLoading.value = false

  if (err) return

  emit('after-confirm')
}
</script>
