<template>
  <a
    :href="project.repository"
    target="_blank"
    class="flex items-center mb-10 px-2 group"
  >
    <div
      class="w-14 h-14 rounded-xl bg-gray-3 dark-bg-black shadow group-hover:-translate-y-2 duration-200 overflow-hidden"
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
      <h5 class="text-4 line-clamp-1 text-dark-9 dark:text-white">{{ project.name }}</h5>
      <p class="text-14px text-dark/80 dark:text-white/80 line-clamp-2 mt-1">{{ project.description }}</p>
    </div>
  </a>
</template>

<script setup lang="ts">
defineProps<{ project: API_Project.Model }>()
</script>
