<template>
  <div>
    <NCard title="Articles">
      <template #header-extra>
        <NSpace>
          <NButton @click="fetchData">
            Refresh
            <template #icon>
              <div class="i-ri:refresh-line" />
            </template>
          </NButton>

          <NButton
            type="primary"
            @click="() => toDetailPage()"
          >
            New
            <template #icon>
              <i
                class="i-ri:add-fill"
              />
            </template>
          </NButton>
        </NSpace>
      </template>

      <NDataTable
        :loading="pageData.pageStatus === PageStatus.LOADING"
        :columns="columns"
        :data="pageData.data"
      />
    </NCard>
  </div>
</template>

<script setup lang="tsx">
import dayjs from 'dayjs'
import { NButton, NCard, NDataTable, NSpace, NSwitch, NTag, type DataTableColumns } from 'naive-ui'
import useArticleApi from '~/api/useArticleApi'
import { PageStatus } from '~/type/enum/pageStatus'
import { catchUseFetch } from '~/util/catchUseFetch'

const articleApi = useArticleApi()
const router = useRouter()

type PageData<T> = {
  pageStatus: PageStatus
  data: T
  activeRow: API_Article.Model | null
  action: 'delete' | 'updateField:enabled' | null
}

const pageData = ref<PageData<API_Article.Model[]>>({
  data: [],
  pageStatus: PageStatus.LOADING,
  activeRow: null,
  action: null,
})

//
const handleDelete = async (row: API_Article.Model) => {
  const [err] = await catchUseFetch(articleApi.delete(row.id))
  if (err) return

  fetchData()
}

//
const toDetailPage = async (row?: API_Article.Model) => {
  router.push(`/admin/article/${row?.id ?? 0}`)
}

const toContentPage = async (row: API_Article.Model) => {
  router.push(`/admin/article/${row.id}/content`)
}

//
const fetchData = async () => {
  pageData.value.pageStatus = PageStatus.LOADING

  const [err, res] = await catchUseFetch(articleApi.get())
  pageData.value.pageStatus = PageStatus.SUCCESS
  if (err) return

  pageData.value.data = res || []
}

const handleToggleValue = async (row: API_Article.Model, field: keyof API_Article.Model) => {
  if (pageData.value.activeRow === row && pageData.value.action === 'updateField:enabled') return

  pageData.value.activeRow = row
  pageData.value.action = 'updateField:enabled'

  // await sleep()
  const data: API_Article.UpdateField = {
    id: row.id,
    field: field,
    value: !row[field],
  }
  const [err] = await catchUseFetch(articleApi.updateField(data))
  pageData.value.activeRow = null
  pageData.value.action = null

  if (err) return

  fetchData()
}

onMounted(() => {
  fetchData()
})

const columns: DataTableColumns<API_Article.Model> = [
  {
    title: 'id',
    key: 'id',
  },
  {
    title: 'title',
    key: 'title',
  },
  {
    title: 'Category',
    key: 'category_id',
    render: row => row.category.name,
  },
  {
    title: 'Tags',
    key: 'tags',
    render: row => (
      <NSpace>
        {
          row.tags.map(tag => (
            <NTag type="success">{tag.name}</NTag>
          ))
        }
      </NSpace>
    ),
  },
  {
    title: 'Enabled',
    key: 'enabled',
    render: row => (
      <NSwitch
        loading={pageData.value.activeRow === row && pageData.value.action === 'updateField:enabled'}
        value={row.enabled}
        onUpdateValue={() => handleToggleValue(row, 'enabled')}
      >
      </NSwitch>
    ),
  },
  {
    title: 'Sticky',
    key: 'is_sticky',
    render: row => (
      <NSwitch
        loading={pageData.value.activeRow === row && pageData.value.action === 'updateField:enabled'}
        value={row.is_sticky}
        onUpdateValue={() => handleToggleValue(row, 'is_sticky')}
      >
      </NSwitch>
    ),
  },
  {
    title: 'Created At',
    key: 'created_at',
    render: row => dayjs(row.created_at).format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    title: 'Operation',
    key: 'id',
    render: row => (
      <NSpace>
        <NButton type="error" size="small" onClick={() => handleDelete(row)}>Del</NButton>
        <NButton type="info" size="small" onClick={() => toDetailPage(row)}>Edit</NButton>
        <NButton type="info" size="small" onClick={() => toContentPage(row)}>Content</NButton>
      </NSpace>
    ),
  },
]
</script>
