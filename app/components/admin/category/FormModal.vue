<template>
  <div>
    <NModal
      v-model:show="visible"
      preset="card"
      class="w-200"
      title="Category"
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
            你可以通过 <span class="text-gray">`/api/category/<span class="text-blue">{{ formModel.alias }}</span>/post`</span> 获取该分类下的文章
          </template>
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
import admin_categoryApi from '~/admin-api/categoryApi'
import { FormModelAction } from '~/type/enum/formModalAction'
import { toCatch } from '~/util/toCatch'

const message = useMessage()

type CategoryForm = {
  id: number | null
  alias: string | null
} & Pick<API_Category.Model, 'name'>

const formRef = ref<FormInst>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'after-confirm'): void
}>()

const defaultFormValue: CategoryForm = {
  id: null,
  name: '',
  alias: null,
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
    formModel.value.alias = props.row!.alias
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
  const { id, name, alias } = formModel.value
  const data: API_Category.Update = {
    id: id || 0,
    name,
    alias: alias?.trim() || null,
  }
  const fn = props.action === FormModelAction.ADD ? admin_categoryApi.add : admin_categoryApi.update

  const [err] = await toCatch(fn(data))
  confirmLoading.value = false

  if (err) return

  emit('after-confirm')
}
</script>
