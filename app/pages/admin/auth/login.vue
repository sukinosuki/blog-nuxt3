<template>
  <div class="flex justify-center items-center px-3 h-100vh">
    <div class="w-100 rounded-2xl bg-white dark-bg-black px-4 py-10">
      <h4 class="text-10 text-center">
        Login
      </h4>

      <NForm
        ref="formRef"
        :model="formModel"
        class="mt-10"
        :rules="formRules"
      >
        <NFormItem
          label="Username"
          path="username"
        >
          <NInput v-model:value="formModel.username" />
        </NFormItem>

        <NFormItem
          label="Password"
          path="password"
        >
          <NInput v-model:value="formModel.password" />
        </NFormItem>
      </NForm>

      <div class="mt-10">
        <NButton
          type="primary"
          class="w-100% rounded-full !text-white"
          :loading="confirmLoading"
          @click="handleLogin"
        >
          Submit
        </NButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NButton, NForm, NFormItem, NInput, type FormRules } from 'naive-ui'
import admin_authApi from '~/api/admin-api/authApi'
import { useForm } from '~/hook/useForm'
import { toCatch } from '~/utils/toCatch'

definePageMeta({
  layout: 'default',
})

type LoginForm = {
  username: string
  password: string
}

const confirmLoading = ref(false)
const initialForm: LoginForm = {
  username: '',
  password: '',
}

const formRules: FormRules = {
  username: {
    required: true,
    trigger: ['change'],
  },
  password: {
    required: true,
    trigger: ['change'],
  },
}

const form = useForm(initialForm)
const formRef = form.ref
const formModel = form.data

const router = useRouter()
// const message = useMessage()
const userSession = useUserSession()
//
const handleLogin = async () => {
  const [validateOk] = await form.validate()
  if (!validateOk) {
    return
  }

  if (confirmLoading.value) return

  confirmLoading.value = true
  const data: API_Auth.Login = {
    username: formModel.value.username,
    password: formModel.value.password,
  }

  const [err] = await toCatch(admin_authApi.login(data))
  if (err) {
    confirmLoading.value = false
    return
  }

  userSession.fetch().then(() => {
    router.push('/admin/post')
  }).finally(() => {
    confirmLoading.value = false
  })
}
</script>
