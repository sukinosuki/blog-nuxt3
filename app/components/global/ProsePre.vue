<template>
  <div class="my-4">
    <p class="m-0 italic text-14px">
      <span>
        {{ filename }}
      </span>
    </p>
    <div class="relative group bg-#f3f3f3 dark-bg-black rounded">
      <span class="absolute text-3 left-1 top-1 leading-none opacity-0 group-hover:opacity-100 duration-200">
        {{ language }}
      </span>

      <button
        v-if="isSupported"
        class="absolute right-1 top-1 opacity-0 invisible flex items-center rounded px-2 py-1 z-1 bg-gray-1 group-hover:opacity-100 group-hover:visible duration-200
      hover:bg-gray-2 shadow dark-bg-dark dark-hover:bg-gray-9"
        @click="handleCopy"
      >
        <div
          class="w-1em h-1em"
          :class="[copied ? 'i-ri:file-copy-fill' : 'i-ri:file-copy-line']"
        />

        <span class="ml-1 font-bold text-14px">
          {{ copied ? 'Copied' : 'Copy' }}
        </span>
      </button>

      <pre
        ref="preRef"
        :class="$props.class"
        class="!p-4 m-0 whitespace-normal"
      >
    <slot />
  </pre>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  code: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
})

const source = ref<string>('')
const preRef = ref<HTMLPreElement | null>(null)

const { copy, copied, isSupported } = useClipboard({ source })

const handleCopy = () => {
  copy(preRef.value!.textContent!)
}
</script>

<style>
pre code .line {
  display: block;
}

pre {
  padding: 1em 0 !important;
  --tw-prose-pre-bg: #8881 !important;
}

.line {
  display: block;
  /* padding: 0 1rem; */
}

.line.highlight {
  width: 100%;
  background-color: #8881 !important;
}

.line.diff.remove {
  background-color: rgba(194, 58, 58, 0.3) !important;
}

.line.diff.add {
  background-color: rgba(46, 141, 46, 0.3) !important;
}

.line.diff.remove::before {
  content: '-';
  color: #c23a3a;
}

.line.diff.add::before {
  content: '+';
  color: #23b73c;
}
</style>
