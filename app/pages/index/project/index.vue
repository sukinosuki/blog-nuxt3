<template>
  <div>
    <h2 class="text-10 font-bold">
      # Project
    </h2>

    <ul class="md:grid md:grid-cols-4 mt-20">
      <ProjectItem
        v-for="(project, index) in projects"
        :key="project.id"
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
        :delay="70 * index"
        :duration="200"
        :project="project"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import projectApi from '~/api/app-api/projectApi'

const { data, error } = await useAsyncData<API_Project.Model[], ServerErrorRes>('/api/project', projectApi.get, {
  getCachedData: (key) => {
    return useNuxtApp().payload.data[key]
  },
})

if (error.value) {
  showError(error.value)
}

const projects = data

useHead({
  title: 'Project',
})
</script>
