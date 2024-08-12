<template>
  <div>
    <div
      class="mx-auto px-3 lg:w-90%"
    >
      <div
        v-if="visible"
        class="flex justify-between pt-20 mb-6"
      >
        <ul class="flex">
          <li
            v-for="(menu, index) in menus"
            :key="index"
          >
            <NuxtLink
              :href="menu.path"
              class="text-5 mr-4 after:content-[''] after:absolute relative after:w-100% after:h-2px after:-bottom-2px after:left-0 after:bg-primary after:invisible"
            >
              {{ menu.name }}
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

          <div class="i-ri:shut-down-line w-1em h-1em ml-1" />
        </NButton>
      </div>

      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui'
import admin_authApi from '~/api/admin-api/authApi'
import { toCatch } from '~/util/toCatch'

type Menu = {
  name: string
  path: string
}

const menus: Menu[] = [
  {
    name: 'Post',
    path: '/admin/post',
  },
  {
    name: 'Category',
    path: '/admin/category',
  },
  {
    name: 'Friend',
    path: '/admin/friend',
  },
  {
    name: 'Tag',
    path: '/admin/tag',
  },
  {
    name: 'Says',
    path: '/admin/says',
  },
  {
    name: 'Project',
    path: '/admin/project',
  },
]

const route = useRoute()

const visible = computed(() => {
  return route.name !== 'admin-auth-login'
})
const userSession = useUserSession()
const router = useRouter()
const handleLogout = async () => {
  const [err] = await toCatch(admin_authApi.logout())
  if (err) return

  await userSession.clear()

  router.replace('/admin/auth/login')
}
</script>

<style scoped>
.router-link-exact-active {
  color: rgb(var(--primary));
}
.router-link-exact-active::after{
  visibility: visible;
}
</style>
