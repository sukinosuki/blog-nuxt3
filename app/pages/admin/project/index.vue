<template>
  <div>
    <NCard title="Projects">
      <template #header-extra>
        <NSpace>
          <NButton @click="() => fetchData()">
            Refresh
            <template #icon>
              <div class="i-ri:refresh-line" />
            </template>
          </NButton>

          <NButton
            type="primary"
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
        @update-page="handleUpdatePage"
      />
    </NCard>

    <AdminProjectFormModal
      v-model:visible="pageData.modalVisible"
      :action="pageData.action!"
      :row="pageData.activeRow"
      @after-confirm="handleFormModalAfterConfirm"
    />
  </div>
</template>

<script setup lang="tsx">
import dayjs from 'dayjs'
import { NButton, NCard, NDataTable, NPopconfirm, NSpace, type DataTableColumns, type PaginationProps } from 'naive-ui'
import admin_projectApi from '~/admin-api/projectApi'
import { FormModelAction } from '~/type/enum/formModalAction'
import { PageStatus } from '~/type/enum/pageStatus'
import { toCatch } from '~/util/toCatch'

type PageData<T> = {
  pageStatus: PageStatus
  data: T
  activeRow: API_Project.Model | null
  action: FormModelAction | null
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
  pageData.value.action = FormModelAction.EDIT
}

//
const handleDelete = async (row: API_Project.Model) => {
  const [err] = await toCatch(admin_projectApi.delete(row.id))
  if (err) return

  fetchData()
}

//
const handleAdd = async () => {
  pageData.value.modalVisible = true
  pageData.value.activeRow = null

  pageData.value.action = FormModelAction.ADD
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
  const [err, res] = await toCatch(admin_projectApi.get(params))
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
    render: row => row.cover ? <img class="w-10 h-10 rounded-md" src={row.cover}></img> : null,
  },
  {
    title: 'Preview',
    key: 'preview',
    ellipsis: {
      tooltip: true,
    },
    render: row => row.preview ? <a class="text-blue" href={row.preview} target="__blank">{row.preview}</a> : null,
  },
  {
    title: 'Repository',
    key: 'repository',
    ellipsis: {
      tooltip: true,
    },
    render: row => <a class="text-blue" href={row.repository} target="__blank">{row.repository}</a>,
    // render: row => (
    //   <NTooltip>
    //     {{
    //       default: () => row.repository,
    //       trigger: () => <a class="text-blue" href={row.repository} target="__blank">{row.repository}</a>,
    //     }}
    //   </NTooltip>
    // ) },
  },
  {
    title: 'Created At',
    key: 'created_at',
    width: 160,
    render: row => dayjs(row.created_at).format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    title: 'Operation',
    key: 'id',
    width: 200,
    render: row => (
      <NSpace>
        <NPopconfirm onPositiveClick={() => handleDelete(row)}>
          {{
            default: () => 'Delete this row?',
            trigger: () => (
              <NButton type="error" size="small">Del</NButton>
            ),
          }}

        </NPopconfirm>
        <NButton type="info" size="small" onClick={() => handleEdit(row)}>Edit</NButton>
      </NSpace>
    ),
  },
]
</script>
