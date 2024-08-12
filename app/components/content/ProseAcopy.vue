<template>
  <span
    ref="linkOuterRef"
    class="group relative flex-inline items-center underline underline-offset-2 hover:underline-op-0 duration-100 after:absolute relative
        after:bottom-0 after:left-0 after:duration-200 after:content-[''] after:h-2px after:w-0 hover:after:w-100% after:bg-sky"
    @mouseover="handleHover"
    @mouseleave="handleLeave"
  >
    <NuxtLink
      :href="href"
      :target="target"
      class="flex-inline items-center"
    >
      <slot />
      <i class="i-ri:arrow-right-up-line w-1.3em h-1.3em opacity-60 inline-block" />
    </NuxtLink>

    <Teleport to="body">
      <Transition>
        <div
          v-if="visible"
          ref="popoverRef"
          class="fixed p-2 shadow-xl rounded-xl z-1 -translate-x-50% bg-sky-1/30 backdrop-blur-xl duration-200"
          :style="{
            left: (domRect?.width||0) /2 + (domRect?.left||0) + 'px',
            top: (domRect?.height||0) + (domRect?.top || 0) + 'px',
          }"
          @mouseover="handleMouseOver2"
          @mouseleave="handleMouseLeave2"
        >
          <NuxtLink
            :href="href"
            :target="target"
            class="no-underline"
          >{{ href }}</NuxtLink>
        </div>
      </Transition>
    </Teleport>
    <!-- <Teleport to="body">
      <div
        ref="popoverRef"
        class="absolute p-2 shadow-xl rounded-xl z-1 top-100% left-50% -translate-x-50% translate-y-2  bg-sky-1/30
        backdrop-blur-xl group-hover:translate-y-1 group-hover:opacity-100 duration-200 group-hover:visible"
      >
        <NuxtLink
          :href="href"
          :target="target"
          class="no-underline"
        >{{ href }}</NuxtLink>
      </div>
    </Teleport> -->
  </span>
</template>

<script setup lang="ts">
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

const popoverVisible = ref(false)
const popoverVisible2 = ref(false)
const popoverRef = ref<HTMLSpanElement | null>(null)
const linkOuterRef = ref<HTMLSpanElement | null>(null)
const domRect = ref<DOMRect | null>(null)

const visible = computed(() => {
  return popoverVisible.value || popoverVisible2.value
})
const handleHover = () => {
  console.log('[handleHover] clientTop ', linkOuterRef.value?.clientTop)
  console.log('[handleHover] clientLeft ', linkOuterRef.value?.clientLeft)

  popoverVisible.value = true
  domRect.value = linkOuterRef.value!.getClientRects()[0]!

  popoverRef.value!.style.left = domRect.value.left
  popoverRef.value!.style.top = domRect.value.top
  console.log('domRect.value ', domRect.value)
  console.log('popoverRef.value!.style ', popoverRef.value!.style)
}

const handleLeave = () => {
  setTimeout(() => {
    popoverVisible.value = false
  }, 100)
}

const handleMouseOver2 = () => {
  popoverVisible2.value = true
}

const handleMouseLeave2 = () => {
  setTimeout(() => {
    popoverVisible2.value = false
  }, 100)
}
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translate(-50%, 10px)
}
</style>
