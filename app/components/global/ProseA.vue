<template>
  <Popover>
    <span
      ref="linkOuterRef"
      class="group relative flex-inline items-center underline underline-offset-2 hover:underline-op-0 duration-100 after:absolute relative
    after:bottom-0 after:left-0 after:duration-200 after:h-2px after:w-0 hover:after:w-100% after:bg-primary"
    >
      <NuxtLink
        :href="href"
        :target="target"
        class="flex-inline items-center"
      >
        <slot />
        <i class="i-ri:arrow-right-up-line w-1.3em h-1.3em opacity-60 inline-block" />
      </NuxtLink>
    </span>

    <template #popover>
      <div
        class="p-2 shadow-xl rounded-xl bg-white/80 dark-bg-black backdrop-blur-xl"
      >
        <NuxtLink
          :href="href"
          :target="target"
          class="text-primary"
        >{{ href }}</NuxtLink>
      </div>
    </template>
  </Popover>
</template>

<script setup lang="ts">
import Popover from '../Popover.vue'

defineProps({
  href: {
    type: String,
    default: '',
  },
  target: {
    type: String as PropType<'_blank' | '_parent' | '_self' | '_top' | (string & object) | null | undefined>,
    default: undefined,
    required: false,
  },
})
</script>
