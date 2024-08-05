<template>
  <div>
    <div class="flex flex-row max-md:justify-center max-md:items-center max-md:flex-col py-10 md:min-h-100vh justify-between lg:w-1000px md:w-768px mx-auto">
      <div class="flex flex-col justify-center max-md:pt-40 ">
        <h2 class="text-10 font-normal flex">
          <span
            v-for="(letter, index) in 'Hi, I\'m'"
            :key="index"
            v-motion
            class="inline-block"
            :class="[letter === ' ' ? 'mx-1' :'']"
            :initial="{
              opacity: 0,
              y: 20,
            }"
            :visible="{
              opacity: 1,
              y: 0,
            }"
            :delay="index *20"
          >
            {{ letter }}
          </span>

          <div class="ml-1">
            <span class="font-bold text-sky">
              <span
                v-for="(letter, index) in 'Hanami'"
                :key="index"
                v-motion
                class="inline-block"
                :initial="{
                  opacity: 0,
                  y: 20,
                }"
                :visible="{
                  opacity: 1,
                  y: 0,
                }"
                :delay="index * 30 + 400"
              >{{ letter }}</span>
            </span>
          </div>
        </h2>

        <p class="text-6 mt-4">
          <span
            v-for="(letter, index) in 'A NodeJS Full Stack'"
            :key="index"
            v-motion
            class="inline-block"
            :class="[letter === ' ' ? 'mx-1' :'']"
            :initial="{
              opacity: 0,
              y: 20,
            }"
            :visible="{
              opacity: 1,
              y: 0,
            }"
            :delay="index * 20 + 400 + ('hanami').length * 30"
          >
            {{ letter }}
          </span>
        </p>

        <p class="text-4 mt-4">
          <span
            v-for="(letter, index) in 'An independent developer coding with love.'"
            :key="index"
            v-motion
            class="inline-block"
            :class="[letter === ' ' ? 'mx-1' :'']"
            :initial="{
              y: 10,
              opacity: 0,
            }"
            :visible="{
              opacity: 1,
              y: 0,
            }"
            :delay="10*index + 1200"
          >{{ letter }}</span>
        </p>

        <ul class="mt-10">
          <li
            v-for="(link, index) in socialLinks"
            :key="link.name"
            class="flex-inline mr-2"
          >
            <Motion
              :initial="{
                opacity: 0,
                y: 20,
              }"
              :visible="{
                opacity: 1,
                y: 0,
              }"
              :delay="100 * index + 1600"
            >
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
            </Motion>
          </li>
        </ul>
      </div>

      <div class="flex items-center max-md:pt-20">
        <NuxtImg
          class="w-50 h-50 rounded-full"
          src="https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo30pib8ra1mi6g5p82lhqlnd033mv9rrg?imageView2/2/w/540/format/webp|imageMogr2/strip2"
        />
      </div>
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
          <p class="text-4 mt-4">
            也要前进
          </p>
        </Motion>
      </div>

      <ul class="flex justify-center mt-20">
        <li
          v-for="(blogLink, index) in blogLinks"
          :key="blogLink.name"
        >
          <Motion
            :initial="{
              opacity: 0,
              y: 20,
            }"
            :visible="{
              opacity: 1,
              y: 0,
            }"
            :delay="100 * index + 100"
          >
            <div
              class="flex-inline items-center"
            >
              <NuxtLink
                :href="blogLink.path"
                class="flex items-center  hover:text-sky duration-200 hover:-translate-y-2 "
              >
                <i
                  class="w-6 h-6 opacity-80"
                  :class="blogLink.icon"
                />
                <span class="ml-3 text-4  opacity-80">{{ blogLink.name }}</span>
              </NuxtLink>

              <span
                v-if="index+1 != blogLinks.length"
                class="inline mx-4"
              > · </span>
            </div>
          </Motion>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
type BlogLink = {
  icon: string
  name: string
  path: string
}

type SocialLink = {
  color?: string
} & BlogLink

const socialLinks: SocialLink[] = [
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
    name: 'Github',
    path: 'https://github.com/sukinosuki',
    color: 'bg-gray',
  },
]

const blogLinks: BlogLink[] = [
  {
    icon: 'i-ri:article-line',
    name: '文稿',
    path: '/post',
  },
  {
    icon: 'i-ri:booklet-line',
    name: '语录',
    path: '/',
  },
  {
    icon: 'i-ri:user-5-line',
    name: '友人',
    path: '/',
  },
  {
    icon: 'i-ri:palette-line',
    name: '项目',
    path: '/',
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
</script>
