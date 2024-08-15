<template>
  <span
    ref="attachDomRef"
    @mouseover="handleAttachDomMouseover"
    @mouseleave="handleAttachDomMouseleave"
  >
    <slot />
  </span>

  <Teleport to="body">
    <Transition>
      <div
        v-if="visible"
        ref="popoverRef"
        :style="{
          left: (attachDomRect?.width || 0) / 2 + (attachDomRect?.left || 0) + 'px',
          top: 30 + (attachDomRect?.height || 0) + (attachDomRect?.top || 0) + 'px',
        }"
        class="fixed -translate-50% z-1"
        @mouseover="handlePopoverDomMouseover"
        @mouseleave="handlePopoverDomeMouseleave"
      >
        <!-- <slot name="popover" /> -->
        <div
          class="p-2 shadow-xl rounded-xl bg-white/80 dark-bg-black backdrop-blur-xl"
        >
          <slot name="popover" />
          <!-- <span
              v-if="hasPopoverSlot"
              class="text-primary"
            >查看原图</span> -->
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const isAttachedDomHovered = ref(false)
const isPopoverDomHovered = ref(false)
const popoverRef = ref<HTMLSpanElement | null>(null)
const attachDomRef = ref<HTMLSpanElement | null>(null)
const attachDomRect = ref<DOMRect | null>(null)

const slots = useSlots()
const hasPopoverSlot = !!slots['popover']

const leaveFlag = ref(false)
const visible = computed(() => {
  return isAttachedDomHovered.value || isPopoverDomHovered.value
})
const handleAttachDomMouseover = () => {
  isAttachedDomHovered.value = true
  attachDomRect.value = attachDomRef.value!.getClientRects()[0]!
}

const handleAttachDomMouseleave = () => {
  setTimeout(() => {
    isAttachedDomHovered.value = false
  }, 70)
}

const handlePopoverDomMouseover = () => {
  if (leaveFlag.value) return

  isPopoverDomHovered.value = true
}

const handlePopoverDomeMouseleave = () => {
  setTimeout(() => {
    leaveFlag.value = true
    isPopoverDomHovered.value = false

    setTimeout(() => {
      leaveFlag.value = false
    }, 200)
  }, 70)
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: .2s ease;
  pointer-events: none
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translate(-50%, -10px);
  /* pointer-events: none; */
}
</style>
