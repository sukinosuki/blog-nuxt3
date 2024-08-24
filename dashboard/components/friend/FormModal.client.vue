c<template>
  <div>
    <NModal
      v-model:show="visible"
      preset="card"
      class="w-140"
      title="Friend"
    >
      <NForm
        ref="formRef"
        :model="formModel"
        :rules="formRules"
      >
        <NFormItem
          label="Site Name"
          path="site_name"
        >
          <NInput
            v-model:value="formModel.site_name"
            maxlength="50"
            show-count
          />
        </NFormItem>

        <NFormItem
          label="Nickname"
          path="nickname"
        >
          <NInput
            v-model:value="formModel.nickname"
            maxlength="50"
            show-count
          />
        </NFormItem>

        <NFormItem
          label="Link"
          path="link"
        >
          <NInput
            v-model:value="formModel.link"
            maxlength="200"
            show-count
          />
        </NFormItem>

        <NFormItem
          label="Avatar"
          path="avatar"
        >
          <NInput
            v-model:value="formModel.avatar"
            maxlength="200"
            show-count
          />
        </NFormItem>

        <div class="flex justify-center">
          <div class="h-20">
            <AppImage
              v-if="formModel.avatar"
              class="w-20 h-20 rounded-lg"
              :src="formModel.avatar"
              alt=""
            />
          </div>
        </div>

        <NFormItem
          label="Email"
          path="email"
        >
          <NInput
            v-model:value="formModel.email"
            maxlength="50"
            show-count
          />
        </NFormItem>

        <NFormItem
          label="Introduction"
          path="introduction"
        >
          <NInput
            v-model:value="formModel.introduction"
            type="textarea"
            maxlength="100"
            show-count
          />
        </NFormItem>

        <NFormItem
          label="Status"
          path="status"
        >
          <NSelect
            v-model:value="formModel.status"
            :options="friendStatusOptions"
          />
        </NFormItem>
      </NForm>

      <template #footer>
        <div class="flex justify-between">
          <NButton
            @click="visible = false"
          >
            Cancel
          </NButton>

          <NButton
            :loading="confirmLoading"
            type="primary"
            @click="handleSubmit"
          >
            Submit
          </NButton>
        </div>
      </template>
    </NModal>
  </div>
</template>

<script setup lang="ts">
import { NButton, NForm, NFormItem, NInput, NModal, NSelect, useMessage, type FormRules } from 'naive-ui'
import admin_friendApi from '~~/dashboard/api/friendApi'
import { toCatch } from '~/utils/toCatch'
import { useForm } from '~~/dashboard/composables/useForm'
import { FriendStatus, friendStatusOptions } from '~~/type/enum/FriendStatus'
import type { FormModalAction } from '~~/type/enum/formModalAction'

const visible = defineModel<boolean>('visible', {
  default: false,
  required: true,
})

const props = defineProps<{
  row: API_Friend.Model | null
  action: FormModalAction | string | null
}>()

const message = useMessage()

type FriendForm = {
  id: number | null
} & Pick<API_Friend.Model, 'avatar' | 'site_name' | 'email' | 'introduction' | 'nickname' | 'link' | 'status'>

const emit = defineEmits<{
  (e: 'after-confirm'): void
}>()

const initialForm: FriendForm = {
  id: null,
  avatar: '',
  site_name: '',
  email: '',
  introduction: '',
  nickname: '',
  link: '',
  status: FriendStatus.DISABLED,
}

const form = useForm(initialForm)
const { data: formModel, ref: formRef } = form

const confirmLoading = ref(false)

const formRules: FormRules = {
  // avatar: {
  //   required: true,
  //   trigger: ['change'],
  // },
  site_name: {
    required: true,
    trigger: ['change'],
  },
  // email: {
  //   required: true,
  //   trigger: ['change'],
  // },
  introduction: {
    required: true,
    trigger: ['change'],
  },
  // nickname: {
  //   required: true,
  //   trigger: ['change'],
  // },
  link: {
    required: true,
    trigger: ['change'],
  },
}

watch(visible, () => {
  if (visible.value) {
    if (props.row) {
      form.data.value.id = props.row.id
      form.data.value.avatar = props.row.avatar
      form.data.value.email = props.row.email
      form.data.value.introduction = props.row.introduction
      form.data.value.nickname = props.row.nickname
      form.data.value.site_name = props.row.site_name
      form.data.value.link = props.row.link
      form.data.value.status = props.row.status
    }
  }
  else {
    form.reset()
  }
})

const handleSubmit = async () => {
  const [validateOk] = await form.validate()

  if (!validateOk) return

  if (confirmLoading.value) return

  confirmLoading.value = true

  const { nickname, site_name, link, email, avatar, introduction, id, status } = formModel.value

  const data: API_Friend.Update = {
    id: id!,
    nickname,
    site_name,
    link,
    email,
    avatar,
    introduction,
    status,
  }

  const fn = data.id ? admin_friendApi.update : admin_friendApi.add
  const [err] = await toCatch(fn(data))
  confirmLoading.value = false
  if (err !== null) return

  message.success('ok')

  emit('after-confirm')
}
</script>
