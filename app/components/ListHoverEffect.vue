<template>
  <ul class="relative">
    <li
      v-for="(item, index) in list"
      :key="item.id || index"
      ref="itemRef"
      @mouseenter="() => handleMouseover(index)"
      @mouseleave="() => handleMouseleave(index)"
    >
      <slot
        :item="item"
        :index="index"
      />
    </li>

    <div
      :class="effectClass"
      class="absolute bg-primary/10 dark:bg-primary/20 duration-200 pointer-events-none transform-origin-b"
      :style="{
        left: left + 'px',
        top: top + 'px',
        width: width + 'px',
        height: height + 'px',
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'scale(1)' : 'scale(1.2)',
      }"
    />
  </ul>
</template>

<script setup lang="ts" generic="T extends any">
defineProps<{
  list: T[]
  effectClass?: string
  opacity?: number
}>()

const itemRef = ref<HTMLElement[] | null>(null)

const hovered = ref(false)
const left = ref(0)
const top = ref(0)
const width = ref(0)
const height = ref(0)

const handleMouseover = (index: number) => {
  const {
    offsetTop, // 相对于父级的top.(所以需要是直接子元素)
    offsetLeft, // 相对于低级的left
    clientWidth, // dom宽度
    clientHeight, // dom高度
  } = itemRef.value![index]!

  hovered.value = true
  left.value = offsetLeft
  top.value = offsetTop
  width.value = clientWidth
  height.value = clientHeight
}

const handleMouseleave = (index: number) => {
  const { offsetTop, offsetLeft } = itemRef.value![index]!
  left.value = offsetLeft
  top.value = offsetTop
  hovered.value = false
}
</script>
