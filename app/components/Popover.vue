<template>
  <div>
    <span
      ref="attachDomRef"
      class="inline-block"
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
            top: 10 + (attachDomRect?.height || 0) + (attachDomRect?.top || 0) + 'px',
          }"
          class="fixed -translate-x-50% z-9999"
          @mouseover="handlePopoverDomMouseover"
          @mouseleave="handlePopoverDomeMouseleave"
        >
          <slot name="popover" />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
const isAttachedDomHovered = ref(false)
const isPopoverDomHovered = ref(false)
const popoverRef = ref<HTMLSpanElement | null>(null)
const attachDomRef = ref<HTMLSpanElement | null>(null)
const attachDomRect = ref<DOMRect | null>(null)

// const slots = useSlots()
// const hasPopoverSlot = !!slots['popover']

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
  transform: translate(-50%, 10px);
  /* pointer-events: none; */
}
</style>
