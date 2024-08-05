c<template>
  <div>
    <NModal
      v-model:show="visible"
      preset="card"
      class="w-200"
      title="Friend"
    >
      <NForm
        ref="formRef"
        :model="formModel"
        :rules="formRules"
        label-align="left"
        label-width="100"
        label-placement="left"
      >
        <NFormItem
          label="Blog Name"
          path="blog_name"
        >
          <NInput
            v-model:value="formModel.blog_name"
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
        <div class="flex justify-end">
          <NSpace>
            <NButton
              class="px-10"
              @click="visible = false"
            >
              Cancel
            </NButton>

            <NButton
              class="px-10"
              type="primary"
              :loading="confirmLoading"
              @click="handleSubmit"
            >
              Ok
            </NButton>
          </NSpace>
        </div>
      </template>
    </NModal>
  </div>
</template>

<script setup lang="ts">
import { NButton, NForm, NFormItem, NInput, NModal, NSelect, NSpace, useMessage, type FormRules } from 'naive-ui'
import { sleep } from '~/util'
import admin_friendApi from '~/admin-api/friendApi'
import { toCatch } from '~/util/toCatch'
import { useForm } from '~/hook/useForm'
import { FriendStatus, friendStatusOptions } from '~~/api/enum/FriendStatus'

const visible = defineModel<boolean>('visible', {
  default: false,
  required: true,
})

const props = defineProps<{
  row: API_Friend.Model | null
}>()

const message = useMessage()

type FriendForm = {
  id: number | null
} & Pick<API_Friend.Model, 'avatar' | 'blog_name' | 'email' | 'introduction' | 'nickname' | 'link' | 'status'>

const emit = defineEmits<{
  (e: 'after-confirm'): void
}>()

const initialForm: FriendForm = {
  id: null,
  avatar: '',
  blog_name: '',
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
  avatar: {
    required: true,
    trigger: ['change'],
  },
  blog_name: {
    required: true,
    trigger: ['change'],
  },
  email: {
    required: true,
    trigger: ['change'],
  },
  introduction: {
    required: true,
    trigger: ['change'],
  },
  nickname: {
    required: true,
    trigger: ['change'],
  },
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
      form.data.value.blog_name = props.row.blog_name
      form.data.value.link = props.row.link
      form.data.value.status = props.row.status
    }
  }
  else {
    form.reset()
  }
})

const handleSubmit = async () => {
  const [validateOk, validateMsg] = await form.validate()

  if (!validateOk) {
    message.warning(validateMsg!)
    return
  }

  if (confirmLoading.value) return

  confirmLoading.value = true

  const { nickname, blog_name, link, email, avatar, introduction, id, status } = formModel.value

  const data: API_Friend.Update = {
    id: id!,
    nickname,
    blog_name,
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
  await sleep()

  // TODO
  emit('after-confirm')
}
</script>
