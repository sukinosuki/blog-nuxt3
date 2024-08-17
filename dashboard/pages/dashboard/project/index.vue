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
              <i class="i-ri:refresh-line" />
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
        scroll-x="1400"
        :pagination="pagination"
        @update-page="handleUpdatePage"
      />
    </NCard>

    <ProjectFormModal
      v-model:visible="pageData.modalVisible"
      :action="pageData.action"
      :row="pageData.activeRow"
      @after-confirm="handleFormModalAfterConfirm"
    />
  </div>
</template>

<script setup lang="tsx">
import { NButton, NCard, NDataTable, NPopconfirm, NSpace, type DataTableColumns, type PaginationProps } from 'naive-ui'
import projectApi from '~~/dashboard/api/projectApi'
import { FormModalAction } from '~~/type/enum/formModalAction'
import { PageStatus } from '~~/type/enum/pageStatus'

type PageData<T> = {
  pageStatus: PageStatus
  data: T
  activeRow: API_Project.Model | null
  action: FormModalAction | null
  modalVisible: boolean
}

const pageData = ref<PageData<API_Project.Model[]>>({
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

const handleEdit = (row: API_Project.Model) => {
  pageData.value.modalVisible = true
  pageData.value.activeRow = row
  pageData.value.action = FormModalAction.EDIT
}

//
const handleDelete = async (row: API_Project.Model) => {
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
  pageData.value.modalVisible = false
  pageData.value.activeRow = null
  fetchData()
}

//
const fetchData = async (page = 1) => {
  pageData.value.pageStatus = PageStatus.LOADING

  const params: API_Project.Get = {
    page,
    size: pagination.pageSize!,
  }
  const [err, res] = await toCatch(projectApi.get(params))
  pageData.value.pageStatus = PageStatus.SUCCESS
  if (err || !res) return

  pageData.value.data = res.list
  pagination.page = page
  pagination.pageCount = Math.ceil(res.total / pagination.pageSize!)
}

const handleUpdatePage = (page: number) => {
  fetchData(page)
}

onMounted(() => {
  fetchData()
})

const columns: DataTableColumns<API_Project.Model> = [
  {
    title: 'id',
    key: 'id',
    width: 100,
  },
  {
    title: 'Name',
    key: 'name',
    width: 200,
  },
  {
    title: 'Description',
    key: 'description',
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: 'Cover',
    key: 'cover',
    width: 100,
    render: row => row.cover ? <img class="w-10 h-10 rounded-md" src={row.cover}></img> : '',
  },
  {
    title: 'Preview',
    key: 'preview',
    ellipsis: {
      tooltip: true,
    },
    render: row => row.preview ? <a class="text-blue" href={row.preview} target="__blank">{row.preview}</a> : '',
  },
  {
    title: 'Repository',
    key: 'repository',
    ellipsis: {
      tooltip: true,
    },
    render: row => <a class="text-blue" href={row.repository} target="__blank">{row.repository}</a>,
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
    width: 160,
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
