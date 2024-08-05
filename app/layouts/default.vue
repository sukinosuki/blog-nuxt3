<template>
  <div>
    <header
      class="py-2 px-2 bg-opacity-50 backdrop-blur-xl fixed w-full top-0  flex justify-around items-center z-999"
      :class="[isLeave?'shadow':'']"
    >
      <div class="md:w-1000px flex justify-between items-center ">
        <div class="flex">
          <NuxtImg
            class="w-50px h-50px rounded-xl"
            src="https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo30pib8ra1mi6g5p82lhqlnd033mv9rrg?imageView2/2/w/540/format/webp|imageMogr2/strip2"
          />

          <!-- <div class=" ml-4">
            <h1 class="font-500 line-height-none text-8 m-0">
              Miiro Blog {{ appStore.count }}
            </h1>
            <span class="mt-2 line-height-none block text-4 ">article/hanami233</span>
          </div> -->
        </div>

        <div class="flex flex-1 justify-center items-center ">
          <div class="fixed flex ">
            <nav
              ref="headerRef"
              class="flex sticky"
              :style="styles"
            >
              <div class="rounded-full shadow">
                <ul class="flex">
                  <li
                    v-for="nav in navs"
                    :key="nav.name"
                  >
                    <NuxtLink
                      :href="nav.path"
                      class="flex h-10 items-center px-2 mx-2"
                    >
                      {{ nav.name }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>

        <div
          class=""
          @click="toggleColorMode"
        >
          <div
            class="flex items-center justify-center w-40px h-40px border-rounded-md cursor-pointer border-1 border-gray border-solid "
          >
            <i
              :class="themeIconClass"
            />
          </div>
        </div>
      </div>
    </header>

    <!-- <main class="mx-auto min-h-100vh md:w-768px mt-100px"> -->
    <main class="mx-auto min-h-100vh md:w-960px mt-100px">
      <slot />
    </main>

    <footer class="py-8 bg-sky-1/40 flex justify-center ">
      <div class="md:w-1000px">
        <div class="flex items-center ">
          <span class="flex items-center text-4">Contact
            <i class="i-ri:arrow-right-s-line w-5 h-5" />
          </span>
          <ul class="flex">
            <li>
              <a href="">
                Github
              </a>
            </li>
          </ul>
        </div>
        <p>@2024 Miiro Works</p>
        <p>Powered by Cloudflare</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useFixedHeader } from 'vue-use-fixed-header'

const headerRef = ref(null)
const { styles, isEnter, isLeave } = useFixedHeader(headerRef)

type Nav = {
  name: string
  path: string
}

const navs = ref<Nav[]>([
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Friend',
    path: '/friend',
  },
  {
    name: 'Post',
    path: '/post',
  },
  {
    name: 'About',
    path: '/about',
  },
  {
    name: 'Project',
    path: '/project',
  },
])

const colorMode = useColorMode()
const themeIconClass = ref('i-ri:sun-foggy-fill')

watch(colorMode, () => {
  console.log('colorMode 变化 ', colorMode.value)
  console.log('colorMode preference 变化 ', colorMode.preference)
  if (colorMode.preference === 'dark') {
    themeIconClass.value = 'i-ri:sun-foggy-fill'
  }
  if (colorMode.preference === 'light') {
    themeIconClass.value = 'i-ri:moon-foggy-fill'
  }
  if (colorMode.preference === 'system') {
    themeIconClass.value = 'i-ri:contrast-line'
  }
}, {
  immediate: true,
})

const toggleColorMode = () => {
  console.log('toggleColorMode preference ', colorMode.preference)
  console.log('toggleColorMode value ', colorMode.value)
  if (colorMode.preference === 'dark') {
    colorMode.preference = 'light'
    return
  }
  if (colorMode.preference === 'light') {
    colorMode.preference = 'system'
    return
  }

  colorMode.preference = 'dark'
}
</script>
