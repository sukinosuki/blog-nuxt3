<template>
  <div>
    <NCard>
      <div id="vditor" />

      <div class="flex justify-center mt-10">
        <NButton
          class="px-10"
          type="primary"
          :loading="confirmLoading"
          @click="handleSubmit"
        >
          save
        </NButton>
      </div>
    </NCard>
  </div>
</template>

<script setup lang="ts">
import Vditor from 'vditor'

import 'vditor/dist/index.css'
import { NButton, NCard, useMessage } from 'naive-ui'
import { PageStatus } from '~/type/enum/pageStatus'
import { sleep } from '~/util'
import { toCatch } from '~/util/toCatch'
import admin_postApi from '~/admin-api/postApi'

const message = useMessage()
const route = useRoute()
const router = useRouter()
const id = Number(route.params.id)
const isUpdate = id !== 0

const pageStatus = ref(PageStatus.LOADING)

const vditor = ref<Vditor | null>(null)

const confirmLoading = ref(false)

//
const fetchData = async () => {
  if (!isUpdate) return

  pageStatus.value = PageStatus.LOADING
  const [err, res] = await toCatch(admin_postApi.getById(id))

  if (err) {
    pageStatus.value = PageStatus.FAILED
    return
  }

  pageStatus.value = PageStatus.SUCCESS

  vditor.value?.setValue(res!.content)
}

const initVditor = () => {
  vditor.value = new Vditor('vditor', {
    height: 700,
    after: () => {
    },
  })
}

onMounted(() => {
  initVditor()
  fetchData()
})

onUnmounted(() => {
  console.log('onUnmounted')
  vditor.value?.destroy()
})

//
const handleSubmit = async () => {
  if (confirmLoading.value) return

  confirmLoading.value = true

  console.log('article ', vditor.value?.getValue())
  console.log('article length', vditor.value?.getValue().length)
  console.log('article html ', vditor.value?.getHTML())
  const parsed = await parseMarkdown(vditor.value!.getValue())
  console.log('parsed markdown ', parsed)

  const data: API_Post.UpdateField = {
    id,
    value: vditor.value?.getValue() || '',
    field: 'content',
  }
  console.log('data ', data)

  const [err, res] = await toCatch(admin_postApi.updateField(data))
  confirmLoading.value = false
  if (err !== null) {
    return
  }

  console.log('res ', res)

  message.success('ok')
  await sleep()

  // TODO
  router.push('/admin/post')
}
</script>
