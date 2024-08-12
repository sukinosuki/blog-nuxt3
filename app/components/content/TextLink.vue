<template>
  <span
    class="flex-inline items-center after:absolute relative group underline underline-offset-2 hover:underline-offset-10 hover:underline-op-0 duration-100
    after:-bottom-4px after:left-0 after:duration-200 after:content-[''] after:h-2px after:w-0 hover:after:w-100% after:bg-sky"
  >
    <a
      :href="link"
      target="_blank"
    >
      {{ text || '-' }}
    </a>
    <i class="i-ri:arrow-right-up-line w-1.3em h-1.3em opacity-60" />

    <div
      class="absolute p-2 shadow-xl rounded-xl z-1 top-100% left-50% -translate-x-50% translate-y-2 invisible opacity-0 bg-sky-1/30
      backdrop-blur-xl
      group-hover:translate-y-1 group-hover:opacity-100 duration-200 group-hover:visible"
    >
      <a
        :href="link"
        target="_blank"
      >{{ link }}</a>
    </div>
  </span>
</template>

<script setup lang="ts">
defineProps<{
  text: string
  link: string
}>()
</script>

<style scoped>

</style>
