<template>
  <div
    ref="boxRef"
    :style="{
      transform: cardTransform,
      transition: 'transform 0.25s ease-out',
    }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const boxRef = ref<HTMLDivElement | null>(null)

const props = defineProps<{
  maxRotation?: number
}>()

const { elementX, elementY, isOutside, elementHeight, elementWidth } = useMouseInElement(boxRef)

const cardTransform = computed(() => {
  if (!isOutside.value) return ''

  const MAX_ROTATION = props.maxRotation || 2
  const rX = (MAX_ROTATION / 2 - (elementY.value / elementHeight.value) * MAX_ROTATION).toFixed(2)
  const rY = ((elementX.value / elementWidth.value) * MAX_ROTATION - MAX_ROTATION / 2).toFixed(2)

  return `perspective(${elementWidth.value}px) rotateX(${rX}deg) rotateY(${rY}deg)`
})
</script>
