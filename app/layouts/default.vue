<template>
  <div>
    <header
      class="py-2 px-2 bg-opacity-60  backdrop-blur-xl fixed w-full top-0 flex justify-around items-center z-999"
      :class="[isLeave ? 'shadow' : '']"
    >
      <div class="w-100% lg:w-960px xl:w-1280px flex justify-between items-center ">
        <NuxtLink
          href="/sitemap"
          class="md-hidden w-10 h-10 flex justify-center items-center border-rounded-md cursor-pointer border-1px border-gray/30 border-solid rounded-full"
        >
          <i class="block i-ri:menu-line w-5 h-5" />
        </NuxtLink>

        <div class="flex relative">
          <NuxtLink href="/">
            <NuxtImg
              class="w-12 h-12 rounded-xl shadow-2xl"
              src="https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo30pib8ra1mi6g5p82lhqlnd033mv9rrg?imageView2/2/w/540/format/webp|imageMogr2/strip2"
            />
          </NuxtLink>

          <!-- <div class="ml-4">
            <h1 class="font-500 line-height-none text-8 m-0">
              Article
            </h1>
            <span class="mt-2 line-height-none block text-4 ">article/hanami233</span>
          </div> -->
        </div>

        <div class="flex flex-1 justify-center items-center">
          <div class="fixed flex max-md-hidden">
            <nav
              ref="headerRef"
              class="flex sticky"
              :style="styles"
            >
              <div class="rounded-full px-3 shadow-2xl shadow-op-40 shadow-primary bg-white dark:bg-black">
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
                      <ul class="rounded-md bg-white dark-bg-black backdrop-blur-xl">
                        <li
                          v-for="(subNav, subNavIndex) in nav.children"
                          :key="subNavIndex"
                        >
                          <NuxtLink
                            :href="subNav.path"
                            class="flex justify-center items-center w-30 px-2 h-10 hover:text-primary hover:bg-primary/20 rounded-md duration-100"
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
          class="flex items-center justify-center w-10 h-10 border-rounded-md cursor-pointer border-1px border-gray/30 border-solid rounded-full"
          @click="toggleColorMode"
        >
          <ClientOnly>
            <Transition name="dark-mode-icon-toggle">
              <i
                v-if="colorMode.preference === 'dark'"
                class="block w-5 h-5 i-ri:moon-foggy-fill absolute"
              />
              <i
                v-else-if="colorMode.preference === 'light'"
                class="block w-5 h-5 i-ri:sun-foggy-fill absolute"
              />
              <i
                v-else-if="colorMode.preference === 'system'"
                class="block w-5 h-5 i-ri:contrast-line absolute"
              />
            </Transition>
          </ClientOnly>
        </div>
      </div>
    </header>

    <main>
      <slot />
    </main>

    <!-- <AppFooter /> -->
  </div>
</template>

<script setup lang="ts">
import { useFixedHeader } from 'vue-use-fixed-header'

const { default: appConfig } = await import('../../app_config.json')

// console.log('appConfig ', appConfig)

const headerRef = ref(null)
const { styles, isEnter, isLeave } = useFixedHeader(headerRef)

const navs = appConfig.navs

const colorMode = useColorMode()

const toggleColorMode = () => {
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

<style scoped>
.dark-mode-icon-toggle-enter-active,
.dark-mode-icon-toggle-leave-active {
  transition: all 0.25s ease-out;
}

.dark-mode-icon-toggle-enter-from {
  opacity: 0;
  transform: translateX(10px) scale(0.8);
}

.dark-mode-icon-toggle-leave-to {
  opacity: 0;
  transform: translateX(-10px) scale(0.8);
}
</style>
