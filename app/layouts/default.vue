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
              <ul class="flex rounded-full px-3 shadow-2xl shadow-op-40 shadow-primary bg-white dark:bg-black">
                <li
                  v-for="(nav, index) in navs"
                  :key="index"
                  class="relative"
                >
                  <Popover>
                    <NuxtLink
                      :href="nav.path"
                      class="flex h-10 items-center px-4"
                    >
                      {{ nav.name }}
                    </NuxtLink>

                    <template #popover>
                      <ul class="rounded-md bg-white dark-bg-black backdrop-blur-xl">
                        <ListHoverEffect
                          :list="nav.children || []"
                          effect-class="rounded-md"
                        >
                          <template #default="slopProps">
                            <NuxtLink
                              :href="slopProps.item.path"
                              class="flex justify-center items-center group w-30 px-2 h-10 hover:text-primary rounded-md duration-100"
                            >
                              <span class="group-hover:translate-x-1 duration-200">
                                {{ slopProps.item.name }}
                              </span>
                            </NuxtLink>
                          </template>
                        </ListHoverEffect>
                      </ul>
                    </template>
                  </Popover>
                </li>
              </ul>
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

/**
 * Credit to [@hooray](https://github.com/hooray)
 * @see https://github.com/vuejs/vitepress/pull/2347
 */
const toggleColorMode = async (event: MouseEvent) => {
  const prevValue = colorMode.value
  const isAppearanceTransition = document.startViewTransition
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!isAppearanceTransition) {
    if (colorMode.preference === 'dark') {
      colorMode.preference = 'light'
    }
    else if (colorMode.preference === 'light') {
      colorMode.preference = 'system'
    }
    else {
      colorMode.preference = 'dark'
    }
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )

  // @ts-expect-error: Transition API
  const transition = document.startViewTransition(async () => {
    if (colorMode.preference === 'dark') {
      colorMode.preference = 'light'
    }
    else if (colorMode.preference === 'light') {
      colorMode.preference = 'system'
    }
    else {
      colorMode.preference = 'dark'
    }

    await nextTick()
  })

  transition.ready
    .then(() => {
      if (colorMode.value === prevValue) return

      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]
      document.documentElement.animate(
        {
          clipPath: colorMode.value === 'dark'
            ? [...clipPath].reverse()
            : clipPath,
        },
        {
          duration: 400,
          easing: 'ease-out',
          pseudoElement: colorMode.value === 'dark'
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        },
      )
    })
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
