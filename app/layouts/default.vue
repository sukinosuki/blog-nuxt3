<template>
  <div>
    <header
      class="py-2 px-2 bg-opacity-50 backdrop-blur-xl fixed w-full top-0 flex justify-around items-center z-999"
      :class="[isLeave ? 'shadow' : '']"
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
              <div class="rounded-full px-3 shadow bg-white">
                <ul class="flex">
                  <li
                    v-for="(nav, index) in navs"
                    :key="index"
                    class="relative group"
                  >
                    <NuxtLink
                      :href="nav.path"
                      class="flex h-10 items-center px-2 mx-2 "
                    >
                      {{ nav.name }}
                    </NuxtLink>
                    <div
                      v-if="nav.children"
                      class="absolute px-2 top-10 z-1 left-50% -translate-x-50% group-hover:opacity-100 opacity-0
                      pointer-events-none group-hover:pointer-events-auto
                      group-hover:block group-hover:opacity-100 group-hover:-translate-y-2 duration-300"
                    >
                      <div class="h-5" />
                      <ul class="rounded-md shadow bg-white backdrop-blur-md">
                        <li
                          v-for="(subNav, subNavIndex) in nav.children"
                          :key="subNavIndex"
                        >
                          <NuxtLink
                            :href="subNav.path"
                            class="flex justify-center items-center w-30 px-2 h-10 hover:text-sky hover:bg-gray/20 rounded-md"
                          >
                            {{ subNav.name }}
                          </NuxtLink>
                        </li>
                      </ul>
                    </div>
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

    <main class="mx-auto px-2 min-h-100vh md:w-960px mt-100px">
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

const { default: appConfig } = await import('../../app_config.json')

console.log('appConfig ', appConfig)

const headerRef = ref(null)
const { styles, isEnter, isLeave } = useFixedHeader(headerRef)

const navs = appConfig.navs

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
