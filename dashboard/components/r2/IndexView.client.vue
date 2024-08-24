<template>
  <div>
    <NCard title="R2">
      <template #header-extra>
        <NSpace>
          <NCheckbox v-model:checked="isShowImage">
            show image
          </NCheckbox>
          <NButton
            size="small"
            @click="handleRefresh"
          >
            Refresh
            <template #icon>
              <i class="i-ri:refresh-line" />
            </template>
          </NButton>

          <!-- <NButton
            type="primary"
            size="small"
          >
            New
            <template #icon>
              <i class="i-ri:add-fill" />
            </template>
          </NButton> -->
        </NSpace>
      </template>

      <NDataTable
        remote
        :columns="columns"
        :data="files"
        scroll-x="1200"
      />
    </NCard>

    <div class="flex justify-center mt-10">
      <NButton
        v-if="!!cursor"
        type="primary"
        class="rounded-full shadow-2xl"
        :loading="pageData.pageStatus === PageStatus.LOADING"
        @click="handleLoadMore"
      >
        Load more
      </NButton>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { NButton, NCard, NCheckbox, NDataTable, NPopconfirm, NSpace, type DataTableColumns } from 'naive-ui'
import type { OnError } from 'naive-ui/es/upload/src/interface'
import AppImage from '~/components/AppNuxtImage.vue'
import r2Api from '~~/dashboard/api/r2Api'
import { PageStatus } from '~~/type/enum/pageStatus'

type PageData = {
  pageStatus: PageStatus
}
const pageData = ref<PageData>({
  pageStatus: PageStatus.LOADING,
})

const LIMIT = 10
const files = ref<API_R2.Model[]>([])
const cursor = ref<string | null>(null)
const isShowImage = ref(false)

watch(isShowImage, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      useNuxtApp().$mediumZoom?.detach('[zoomable]').attach('[zoomable]')
    }, 1000)
  }
})
const handleRefresh = () => {
  cursor.value = null

  fetchData()
}

//
const fetchData = async () => {
  pageData.value.pageStatus = PageStatus.LOADING

  const params: API_R2.Get = {
    size: LIMIT,
    cursor: cursor.value,
  }

  const [err, res] = await toCatch(r2Api.get(params))

  if (err || !res) {
    pageData.value.pageStatus = PageStatus.FAILED
    return
  }

  pageData.value.pageStatus = PageStatus.SUCCESS
  if (params.cursor) {
    files.value.push(...res.list)
  }
  else {
    files.value = res.list
  }

  cursor.value = res.cursor

  setTimeout(() => {
    useNuxtApp().$mediumZoom?.detach('[zoomable]').attach('[zoomable]')
  }, 1000)
}

const handleLoadMore = () => {
  fetchData()
}

const handleDelete = async (index: number) => {
  const row = files.value[index]!
  const [err] = await toCatch(r2Api.delete(row.pathname))
  if (err) return

  files.value.splice(index, 1)
}

onMounted(() => {
  fetchData()
})

const columns: DataTableColumns<API_R2.Model> = computed(() => {
  const _columns: DataTableColumns<API_R2.Model> = [
    {
      title: 'Pathname',
      key: 'pathname',
    },
  ]

  if (isShowImage.value) {
    _columns.push(
      {
        title: 'view',
        key: 'pathname',
        width: 120,
        render: row => <img zoomable class="h-10 object-contain" src={`/api-admin/r2/${row.pathname}`} />,
      },
    )
  }

  _columns.push(
    ...[

      {
        title: 'Uploaded At',
        key: 'uploadedAt',
        render: row => dateUtil.format(row.uploadedAt),
      },
      {
        title: 'Content Type',
        key: 'contentType',
      },
      {
        title: 'Size',
        key: 'size',
        render: row => `${row.size / 1000} kb`,
      },
      {
        title: 'Operation',
        key: 'id',
        width: 160,
        render: (row, index) => (
          <NSpace>
            <NPopconfirm onPositiveClick={() => handleDelete(index)}>
              {{
                default: () => 'Delete this record?',
                trigger: () => (
                  <NButton type="error" size="small">Del</NButton>
                ),
              }}
            </NPopconfirm>
          </NSpace>
        ),
      },
    ],
  )

  return _columns
})
</script>
