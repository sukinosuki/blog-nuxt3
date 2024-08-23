<template>
  <div class="flex justify-center items-center px-3 h-100vh">
    <div
      class="w-100 rounded-2xl bg-white dark-bg-black px-4 py-10"
    >
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
          <NInput
            v-model:value="formModel.password"
            type="password"
            show-password-on="click"
          />
        </NFormItem>
      </NForm>

      <div class="mt-2">
        <NButton
          type="primary"
          class="w-full rounded-full !text-white"
          :loading="confirmLoading"
          @click="handleLogin"
        >
          Submit
        </NButton>

        <a
          class="w-full mt-15 block bg-gray/10 shadow h-34px flex justify-center items-center rounded-full gap-x-1 leading-none"
          href="/api/auth/github"
        ><i class="i-simple-icons:github block w-1.1em h-1.1em" />
          Login with GitHub</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NButton, NForm, NFormItem, NInput, type FormRules } from 'naive-ui'
import authApi from '~~/dashboard/api/authApi'

type LoginForm = API_Auth.Login

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

// const { signIn, getProviders } = useAuth()
const userSession = useUserSession()
// const providers = await getProviders()
// console.log('providers ', providers)

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

  const [err] = await toCatch(authApi.login(data))
  if (err) {
    confirmLoading.value = false
    return
  }

  userSession.fetch()
    .then(() => {
      navigateTo('/dashboard/post')
    })
    .finally(() => {
      confirmLoading.value = false
    })
}
</script>
