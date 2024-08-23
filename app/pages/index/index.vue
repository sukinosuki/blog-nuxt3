<template>
  <div>
    <div class="flex flex-row max-md:justify-center max-md:items-center max-md:flex-col py-10 md:min-h-70vh justify-between mx-auto">
      <div class="flex flex-col justify-center">
        <h2 class="text-10 font-normal flex max-md-justify-center">
          <span
            v-for="(letter, index) in hi"
            :key="index"
            v-motion="{
              initial: {
                y: 10,
                opacity: 0,
              },
              visibleOnce: {
                y: 0,
                opacity: 1,
              },
            }"
            :delay="index * hiStaggerDelay"
            class="inline-block"
            :class="[letter === ' ' ? 'mx-1' : '']"
          >
            {{ letter }}
          </span>

          <div class="ml-2">
            <span class="font-bold text-sky font-lxgw-wenkai-tc">
              <span
                v-for="(letter, index) in username"
                :key="index + letter"
                v-motion="{
                  initial: {
                    y: 20,
                    opacity: 0,
                  },
                  visibleOnce: {
                    y: 0,
                    opacity: 1,
                  },
                }"
                :delay="hiAnimateCompleteDuration + (index * usernameStaggerDelay)"
                class="inline-block"
              >{{ letter }}</span>
            </span>
          </div>
        </h2>

        <p class="text-6 mt-4 flex max-md-justify-center font-m-plus-rounded-1c">
          <span
            v-for="(letter, index) in des1"
            :key="index"
            v-motion="{
              initial: {
                y: 20,
                opacity: 0,
              },
              visibleOnce: {
                y: 0,
                opacity: 1,
              },
            }"
            class="inline-block"
            :class="[letter === ' ' ? 'mx-1' :'']"
            :delay="(index * des1StaggerDelay) + usernameAnimateCompleteDuration"
          >
            {{ letter }}
          </span>
        </p>

        <p class="text-6 mt-4 flex max-md-justify-center">
          <span
            v-for="(letter, index) in des2"
            :key="index"
            v-motion="{
              initial: {
                y: 10,
                opacity: 0,
              },
              visibleOnce: {
                y: 0,
                opacity: 1,
              },
            }"
            class="inline-block text-14px"
            :class="[letter === ' ' ? 'mx-1' : '']"
            :delay="(des2StaggerDelay * index) + des1AnimateCompleteDuration"
            :duration="200"
          >
            {{ letter }}
          </span>
        </p>

        <ul class="mt-10 flex max-md-justify-center">
          <li
            v-for="(link, index) in socialLinks"
            :key="link.name"
            v-motion="{
              initial: {
                opacity: 0,
                y: 20,
              },
              visibleOnce: {
                opacity: 1,
                y: 0,
              },
            }"
            :duration="200"
            class="flex-inline mr-2"
            :delay="index * socialLinksStaggerDelay + des2AnimateCompleteDuration"
          >
            <Popover>
              <div>
                <a
                  target="_blank"
                  :href="link.path"
                  class="w-10 h-10 flex items-center justify-center rounded-full text-white shadow-2xl "
                  :class="link.color"
                >
                  <div
                    class="w-6 h-6"
                    :class="link.icon"
                  />
                </a>
              </div>

              <template #popover>
                <div class="p-2 shadow-xl rounded-xl bg-white/80 dark-bg-black backdrop-blur-xl">
                  <a
                    :href="link.path"
                    target="_blank"
                    class="text-primary"
                  >
                    {{ link.name }}
                  </a>
                </div>
              </template>
            </Popover>
          </li>
        </ul>
      </div>

      <div class="flex items-center max-md:pt-20">
        <AppImage
          v-motion="{
            initial: {
              opacity: 0,
            },
            visibleOnce: {
              opacity: 1,
              transition: {
                delay: socialLinksAnimateCompleteDuration,
              },
            },
          }"
          class="w-50 h-50 rounded-full"
          src="https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo30pib8ra1mi6g5p82lhqlnd033mv9rrg?imageView2/2/w/540/format/webp|imageMogr2/strip2"
        />
      </div>
    </div>

    <div class="py-30 flex justify-center">
      <span
        v-motion="{
          initial: {
            opacity: 0,
          },
          visibleOnce: {
            opacity: 1,
            transition: {
              delay: socialLinksAnimateCompleteDuration + 1000,
            },
          },
        }"
        class="text-13px"
      >能为改变自己而努力，我觉得是件厉害的事</span>
    </div>

    <div class="py-20">
      <div class="flex items-center flex-col ">
        <Motion
          :initial="{
            opacity: 0,
            y: 20,
          }"
          :visible-once="{
            opacity: 1,
            y: 0,
          }"
          :delay="200"
        >
          <h3
            class="text-8"
          >
            迷子?
          </h3>
        </Motion>
        <Motion
          :initial="{
            opacity: 0,
            y: 20,
          }"
          :visible-once="{
            opacity: 1,
            y: 0,
          }"
          :delay="300"
        >
          <p class="text-14px mt-4">
            也要前进
          </p>
        </Motion>
      </div>

      <ul class="flex justify-center mt-30 max-md:flex-col">
        <li
          v-for="(blogLink, index) in blogLinks"
          :key="blogLink.name"
          v-motion="{
            initial: {
              opacity: 0,
              y: 20,
            },
            visibleOnce: {
              opacity: 1,
              y: 0,
            },
          }"
          class="flex-inline items-center max-md-w-full justify-center mb-2 max-md-flex-col"
          :duration="150"
          :delay="70 * index + 100"
        >
          <NuxtLink
            :href="blogLink.path"
            class="flex items-center hover:text-primary duration-200 hover:-translate-y-2"
          >
            <i
              class="w-5 h-5 opacity-80 max-md-hidden"
              :class="blogLink.icon"
            />
            <span class="ml-3 text-4 opacity-80 max-md-ml-0">{{ blogLink.name }}</span>
          </NuxtLink>

          <span
            v-if="index + 1 !== blogLinks.length"
            class="inline mx-4"
          > · </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  auth: false,
})
type BlogLink = {
  icon: string
  name: string
  path: string
}

type SocialLink = {
  color?: string
} & BlogLink

const hi = ref('Hi, I\'m')
const username = ref('桜花秋水')
const des1 = ref('A NodeJS Full Stack')
const des2 = ref('An independent developer coding with love.')
const hiStaggerDelay = ref(30)
const usernameStaggerDelay = ref(30)
const des1StaggerDelay = ref(20)
const des2StaggerDelay = ref(10)
const socialLinksStaggerDelay = ref(100)

const socialLinks = ref<SocialLink[]>([
  {
    icon: 'i-ri:bilibili-line',
    name: 'Bilibili',
    path: 'https://space.bilibili.com/672111',
    color: 'bg-sky',
  },
  {
    icon: 'i-simple-icons:xiaohongshu',
    name: '小红书',
    path: 'https://www.xiaohongshu.com/user/profile/6502ac75000000001603b403',
    color: 'bg-red',
  },
  {
    icon: 'i-ri:github-line',
    name: 'Github',
    path: 'https://github.com/sukinosuki',
    color: 'bg-black',
  },
  {
    icon: 'i-ri:mail-line',
    name: 'Email',
    path: 'mailto:miiro444@outlook.com',
    color: 'bg-gray',
  },
])

const blogLinks: BlogLink[] = [
  {
    icon: 'i-ri:article-line',
    name: 'Post',
    path: '/post',
  },
  {
    icon: 'i-ri:booklet-line',
    name: 'Says',
    path: '/says',
  },
  {
    icon: 'i-ri:user-5-line',
    name: 'Friends',
    path: '/friend',
  },
  {
    icon: 'i-ri:palette-line',
    name: 'Project',
    path: '/project',
  },
  {
    icon: 'i-ri:signpost-line',
    name: 'Shorts',
    path: '/',
  },
  {
    icon: 'i-ri:timer-2-line',
    name: 'Moments',
    path: '/',
  },
]

const hiAnimateCompleteDuration = computed(() => {
  return hi.value.length * hiStaggerDelay.value
})

const usernameAnimateCompleteDuration = computed(() => {
  return hiAnimateCompleteDuration.value + username.value.length * usernameStaggerDelay.value + 200
})

const des1AnimateCompleteDuration = computed(() => {
  return usernameAnimateCompleteDuration.value + des1.value.length * des1StaggerDelay.value + 200
})

const des2AnimateCompleteDuration = computed(() => {
  return des1AnimateCompleteDuration.value + des2StaggerDelay.value * des2.value.length + 300
})

const socialLinksAnimateCompleteDuration = computed(() => {
  return des2AnimateCompleteDuration.value + socialLinks.value.length * socialLinksStaggerDelay.value + 300
})
</script>
