<template>
  <div>
    <h2 class="text-10 font-bold">
      # Project
    </h2>

    <ul class="md:grid md:grid-cols-4 mt-20">
      <li
        v-for="(project, index) in projects"
        :key="project.id"
      >
        <a
          v-motion="{
            initial: {
              opacity: 0,
              y: 20,
            },
            enter: {
              opacity: 1,
              y: 0,
            },
          }"
          :duration="200"
          :href="project.repository"
          target="_blank"
          class="flex items-center mb-10 px-2 group"
          :delay="70 * index"
        >
          <div
            class="w-14 h-14 rounded-xl bg-sky-9/20 group-hover:-translate-y-2 duration-200 overflow-hidden"
          >
            <img
              v-if="project.cover"
              :src="project.cover"
              alt=""
            >
            <div
              v-else
              class="h-100% flex items-center justify-center text-8 text-white"
            >
              {{ project.name[0] }}
            </div>
          </div>

          <div class="flex-1 flex flex-col line-height-none ml-3 h-15 justify-around">
            <h5 class="text-4 line-clamp-1 ">{{ project.name }}</h5>
            <p class="text-14px text-black/80 dark:text-white/80 line-clamp-2 mt-1">{{ project.description }}</p>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import projectApi from '~/api/projectApi'

const data = await useAsyncData('/api/project', projectApi.get)

const projects = data.data
</script>

<style scoped>

</style>
