<template>
  <div
    class="mx-auto px-3 lg:w-90%"
  >
    <div
      v-if="visible"
      class="flex justify-between pt-30 mb-6 select-none"
    >
      <ul class="flex max-md-hidden">
        <li
          v-for="(menu, index) in menus"
          :key="index"
        >
          <NuxtLink
            :href="menu.path"
            class="text-5 px-2 after:content-[''] after:absolute relative after:w-full after:h-2px after:-bottom-2px after:left-0 after:bg-primary after:invisible
            [&.router-link-active]:text-primary active-scale-90 block duration-200 [&.router-link-exact-active>span]:opacity-100 [&.router-link-exact-active>span]:w-auto"
          >
            <span>
              /{{ menu.name }}
            </span>
          </NuxtLink>
        </li>
      </ul>

      <div
        class="flex items-center cursor-pointer active-scale-90 duration-200"
        @click="handleLogout"
      >
        <button class="text-5 bg-transparent">
          Logout
        </button>
        <i class="i-ri:shut-down-line w-1.3em h-1.3em ml-1 inline-block" />
      </div>
    </div>

    <slot />
  </div>
</template>

<script setup lang="ts">
import admin_authApi from '~~/dashboard/api/authApi'
import { toCatch } from '~/utils/toCatch'

type Menu = {
  name: string
  nameCn: string
  path: string
}

const menus: Menu[] = [
  {
    name: 'POST',
    path: '/dashboard/post',
    nameCn: '文章',
  },
  {
    name: 'CATEGORY',
    path: '/dashboard/category',
    nameCn: '分类',
  },
  {
    name: 'FRIEND',
    path: '/dashboard/friend',
    nameCn: '友链',
  },
  {
    name: 'TAG',
    path: '/dashboard/tag',
    nameCn: '标签',
  },
  {
    name: 'SAYS',
    path: '/dashboard/says',
    nameCn: '语录',
  },
  {
    name: 'PROJECT',
    path: '/dashboard/project',
    nameCn: '项目',
  },
]

const route = useRoute()
const visible = computed(() => {
  return route.name !== 'dashboard-auth-login'
})

const userSession = useUserSession()

//
const handleLogout = async () => {
  const [err] = await toCatch(admin_authApi.logout())
  if (err) return

  await userSession.clear()

  navigateTo('/dashboard/auth/login')
}
</script>
