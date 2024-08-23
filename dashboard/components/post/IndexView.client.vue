<template>
  <div>
    <NCard title="Posts">
      <template #header-extra>
        <NSpace>
          <NButton
            size="small"
            @click="() => fetchData()"
          >
            Refresh
            <template #icon>
              <div class="i-ri:refresh-line" />
            </template>
          </NButton>

          <NButton
            type="primary"
            size="small"
            @click="() => handleAdd()"
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
        remote
        :loading="pageData.pageStatus === PageStatus.LOADING"
        :columns="columns"
        :data="pageData.data"
        :pagination="pagination"
        :row-key="rowKey"
        scroll-x="1200"
        @update:page="handlePageChange"
      />
    </NCard>

    <PostFormModal
      v-model:visible="pageData.modalVisible"
      :action="pageData.action"
      :row="pageData.activeRow"
      @after-confirm="handleAfterConfirm"
    />
  </div>
</template>

<script setup lang="tsx">
import { NButton, NCard, NDataTable, NPopconfirm, NSpace, NSwitch, NTag, type DataTableColumns, type PaginationProps } from 'naive-ui'
import postApi from '~~/dashboard/api/postApi'

import { FormModalAction } from '~~/type/enum/formModalAction'
import { PageStatus } from '~~/type/enum/pageStatus'

type PageData<T> = {
  pageStatus: PageStatus
  data: T
  activeRow: API_Post.Model | null
  action: 'delete' | 'update:enabled' | null | FormModalAction
  modalVisible: boolean
}

const pageData = ref<PageData<API_Post.Model[]>>({
  data: [],
  pageStatus: PageStatus.LOADING,
  activeRow: null,
  action: null,
  modalVisible: false,
})

const rowKey = (row: API_Post.Model) => row.id

const handleDelete = async (row: API_Post.Model) => {
  const [err] = await toCatch(postApi.delete(row.id))
  if (err) return

  fetchData()
}

const handleAdd = async () => {
  pageData.value.action = FormModalAction.ADD
  pageData.value.modalVisible = true
}

const handleEdit = async (row: API_Post.Model) => {
  pageData.value.action = FormModalAction.EDIT
  pageData.value.activeRow = row
  pageData.value.modalVisible = true
}

const toContentPage = async (row: API_Post.Model) => {
  navigateTo(`/dashboard/post/${row.id}/content`)
}

const pagination = reactive<PaginationProps>({
  pageSize: 10,
  page: 1,
  pageCount: 1,
})

//
const fetchData = async () => {
  pageData.value.pageStatus = PageStatus.LOADING

  const params: API_Post.Get = {
    page: pagination.page!,
    size: pagination.pageSize!,
  }

  const [err, res] = await toCatch(postApi.get(params))

  pageData.value.pageStatus = PageStatus.SUCCESS
  if (err || !res) return

  pageData.value.data = res.list

  pagination.pageCount = Math.ceil(res.total / pagination.pageSize!)
}

const handlePageChange = (page: number) => {
  pagination.page = page
  fetchData()
}

const handleToggleValue = async (row: API_Post.Model, field: keyof API_Post.Model) => {
  if (pageData.value.activeRow === row && pageData.value.action === 'update:enabled') return

  pageData.value.activeRow = row
  pageData.value.action = 'update:enabled'

  const data: API_Post.UpdateField = {
    id: row.id,
    field: field,
    value: !row[field],
  }
  const [err] = await toCatch(postApi.updateField(data))
  pageData.value.activeRow = null
  pageData.value.action = null

  if (err) return

  fetchData()
}

const handleAfterConfirm = () => {
  pageData.value.modalVisible = false
  if (pageData.value.action === FormModalAction.ADD) {
    pagination.page = 1
  }
  fetchData()
}

onMounted(() => {
  fetchData()
})

const columns: DataTableColumns<API_Post.Model> = [
  {
    title: 'id',
    key: 'id',
    width: 80,
  },
  {
    title: 'Title',
    key: 'title',
    ellipsis: true,
  },
  {
    title: 'Alias',
    key: 'alias',
  },
  {
    title: 'Category',
    key: 'category_id',
    render: row => row.category?.name,
  },
  {
    title: 'Tags',
    key: 'tags',
    render: row => (
      <NSpace>
        {
          row.tags?.map(tag => (
            <NTag type="success">{tag?.name}</NTag>
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
        loading={pageData.value.activeRow === row && pageData.value.action === 'update:enabled'}
        value={row.enabled}
        onUpdateValue={() => handleToggleValue(row, 'enabled')}
      >
      </NSwitch>
    ),
  },
  {
    title: 'Pin top',
    key: 'is_sticky',
    render: row => (
      <NSwitch
        loading={pageData.value.activeRow === row && pageData.value.action === 'update:enabled'}
        value={row.is_sticky}
        onUpdateValue={() => handleToggleValue(row, 'is_sticky')}
      >
      </NSwitch>
    ),
  },
  {
    title: 'Created At',
    key: 'created_at',
    width: 160,
    render: row => dateUtil.format(row.created_at),
  },
  {
    title: 'Operation',
    key: 'id',
    width: 220,
    render: row => (
      <NSpace>

        <NButton type="primary" size="small" onClick={() => handleEdit(row)}>Edit</NButton>
        <NButton size="small" onClick={() => toContentPage(row)}>Content</NButton>
        <NPopconfirm onPositiveClick={() => handleDelete(row)}>
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
]
</script>
