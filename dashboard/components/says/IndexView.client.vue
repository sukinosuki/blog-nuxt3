<template>
  <div>
    <NCard title="Projects">
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
            size="small"
            type="primary"
            @click="() => handleAdd()"
          >
            New
            <template #icon>
              <i class="i-ri:add-fill" />
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
        scroll-x="1200"
        @update-page="handleUpdatePage"
      />
    </NCard>

    <SaysFormModal
      v-model:visible="pageData.modalVisible"
      :row="pageData.activeRow"
      :action="pageData.action"
      @after-confirm="handleFormModalAfterConfirm"
    />
  </div>
</template>

<script setup lang="tsx">
import { NButton, NCard, NDataTable, NPopconfirm, NSpace, NSwitch, type DataTableColumns, type PaginationProps } from 'naive-ui'
import projectApi from '~~/dashboard/api/projectApi'
import saysApi from '~~/dashboard/api/saysApi'
import { FormModalAction } from '~~/type/enum/formModalAction'
import { PageStatus } from '~~/type/enum/pageStatus'

  type PageData<T> = {
    pageStatus: PageStatus
    data: T
    activeRow: API_Says.Model | null
    action: 'delete' | 'update:enabled' | null | FormModalAction
    modalVisible: boolean
  }

const pageData = ref<PageData<API_Says.Model[]>>({
  data: [],
  pageStatus: PageStatus.LOADING,
  activeRow: null,
  action: null,
  modalVisible: false,
})

const pagination = reactive<PaginationProps>({
  pageSize: 10,
  page: 1,
})

const handleToggleEnabled = async (row: API_Says.Model) => {
  pageData.value.activeRow = row
  pageData.value.action = 'update:enabled'

  const data: API_Says.UpdateField = {
    id: row.id,
    field: 'enabled',
    value: !row.enabled,
  }
  const [err] = await toCatch(saysApi.updateField(data))

  pageData.value.action = null
  if (err) return

  fetchData()
}

const handleEdit = (row: API_Says.Model) => {
  pageData.value.modalVisible = true
  pageData.value.activeRow = row
  pageData.value.action = FormModalAction.EDIT
}

//
const handleDelete = async (row: API_Says.Model) => {
  const [err] = await toCatch(projectApi.delete(row.id))
  if (err) return

  fetchData()
}

//
const handleAdd = async () => {
  pageData.value.modalVisible = true
  pageData.value.activeRow = null
  pageData.value.action = FormModalAction.ADD
}

const handleFormModalAfterConfirm = () => {
  if (pageData.value.action === FormModalAction.ADD) {
    pagination.page = 1
  }
  fetchData()
  pageData.value.modalVisible = false
  pageData.value.activeRow = null
}

//
const fetchData = async () => {
  pageData.value.pageStatus = PageStatus.LOADING

  const params: API_Project.Get = {
    page: pagination.page!,
    size: pagination.pageSize!,
  }
  const [err, res] = await toCatch(saysApi.get(params))
  pageData.value.pageStatus = PageStatus.SUCCESS
  if (err || !res) return

  pageData.value.data = res.list
  pagination.pageCount = Math.ceil(res.total / pagination.pageSize!)
}

const handleUpdatePage = (page: number) => {
  pagination.page = page
  fetchData()
}

onMounted(() => {
  fetchData()
})

const columns: DataTableColumns<API_Says.Model> = [
  {
    title: 'id',
    key: 'id',
    width: 100,
  },
  {
    title: 'Text',
    key: 'text',
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: 'Author',
    key: 'author',
    width: 140,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: 'Source',
    key: 'source',
    width: 140,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: 'Enabled',
    key: 'enabled',
    width: 80,
    render: row => <NSwitch loading={row.id === pageData.value.activeRow?.id && pageData.value.action === 'update:enabled'} value={row.enabled} onUpdate:value={() => handleToggleEnabled(row)}></NSwitch>,
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
    width: 200,
    render: row => (
      <NSpace>
        <NButton type="primary" size="small" onClick={() => handleEdit(row)}>Edit</NButton>
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
