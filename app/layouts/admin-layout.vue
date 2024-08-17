<template>
  <div
    class="mx-auto px-3 lg:w-90%"
  >
    <div
      v-if="visible"
      class="flex justify-between pt-30 mb-6 select-none max-md-invisible"
    >
      <ul class="flex">
        <li
          v-for="(menu, index) in menus"
          :key="index"
        >
          <NuxtLink
            :href="menu.path"
            class="text-5 px-2 after:content-[''] after:absolute relative after:w-full after:h-2px after:-bottom-2px after:left-0 after:bg-admin-primary after:invisible
            [&.router-link-exact-active]:text-admin-primary active-scale-90 block duration-200 [&.router-link-exact-active>span]:opacity-100 [&.router-link-exact-active>span]:w-auto"
          >
            <!-- <span class="w-0 opacity-0 inline-block duration-200">#</span> -->
            <span>
              /{{ menu.name }}
            </span>
          </NuxtLink>
        </li>
      </ul>

      <NButton
        type="tertiary"
        text
        class="text-5"
        @click="handleLogout"
      >
        Logout
        <i class="i-ri:shut-down-line w-1em h-1em ml-1" />
      </NButton>
    </div>

    <slot />
  </div>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui'
import admin_authApi from '~/api/admin-api/authApi'
import { toCatch } from '~/utils/toCatch'

type Menu = {
  name: string
  nameCn: string
  path: string
}

const menus: Menu[] = [
  {
    name: 'Post',
    path: '/admin/post',
    nameCn: '文章',
  },
  {
    name: 'Category',
    path: '/admin/category',
    nameCn: '分类',
  },
  {
    name: 'Friend',
    path: '/admin/friend',
    nameCn: '友链',
  },
  {
    name: 'Tag',
    path: '/admin/tag',
    nameCn: '标签',
  },
  {
    name: 'Says',
    path: '/admin/says',
    nameCn: '语录',
  },
  {
    name: 'Project',
    path: '/admin/project',
    nameCn: '项目',
  },
]

const route = useRoute()

watch(() => route.path, () => {
  console.log('route ', route)
})
const visible = computed(() => {
  return route.name !== 'admin-auth-login'
})

const userSession = useUserSession()
const router = useRouter()

//
const handleLogout = async () => {
  const [err] = await toCatch(admin_authApi.logout())
  if (err) return

  await userSession.clear()

  // TODO
  router.replace('/admin/auth/login')
}
</script>
