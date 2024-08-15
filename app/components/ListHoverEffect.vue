<template>
  <ul class="relative">
    <li
      v-for="(item, index) in list"
      :key="item.id || index"
      ref="domRef"
      @mouseenter="() => handleMouseover(index)"
      @mouseleave="() => handleMouseleave(index)"
    >
      <slot
        :item="item"
        :index="index"
      />
    </li>

    <div
      class="absolute bg-primary opacity-20 duration-200 pointer-events-none transform-origin-b"
      :class="[rounded? `rounded-${rounded}` : 'rounded']"
      :style="{
        left: left + 'px',
        top: top + 'px',
        width: width + 'px',
        height: height + 'px',
        opacity: hovered ? 0.1 : 0,
        transform: hovered ? 'scale(1)' : 'scale(1.2)',
      }"
    />
  </ul>
</template>

<script setup lang="ts" generic="T extends any">
defineProps<{ list: T[], rounded?: 'md' | 'xl' | '2xl' }>()

const domRef = ref<HTMLElement[] | null>(null)

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
  } = domRef.value![index]!

  hovered.value = true
  left.value = offsetLeft
  top.value = offsetTop
  width.value = clientWidth
  height.value = clientHeight
}

const handleMouseleave = (index: number) => {
  const { offsetTop, offsetLeft } = domRef.value![index]!
  left.value = offsetLeft
  top.value = offsetTop
  hovered.value = false
}
</script>
