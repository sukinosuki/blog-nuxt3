<template>
  <div>
    <NCard title="Posts">
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
            @click="handleAdd"
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
        @update:page="page => fetchData(page)"
      />
    </NCard>

    <AdminFriendFormModal
      v-model:visible="pageData.modalVisible"
      :row="pageData.activeRow"
      @after-confirm="handleAfterConfirm"
    />
  </div>
</template>

<script setup lang="tsx">
import dayjs from 'dayjs'
import { NButton, NCard, NDataTable, NDropdown, NPopconfirm, NSelect, NSpace, NTag, type DataTableColumns, type PaginationProps } from 'naive-ui'
import admin_friendApi from '~/admin-api/friendApi'
import { PageStatus } from '~/type/enum/pageStatus'
import { sleep } from '~/util'
import { toCatch } from '~/util/toCatch'
import { FriendStatus, friendStatus, friendStatusOptions } from '~~/api/enum/FriendStatus'

type PageData<T> = {
  pageStatus: PageStatus
  data: T
  activeRow: API_Friend.Model | null
  action: 'delete' | 'updateField:status' | 'add' | 'edit' | null
  modalVisible: boolean
}

const pageData = ref<PageData<API_Friend.Model[]>>({
  data: [],
  activeRow: null,
  action: null,
  modalVisible: false,
  pageStatus: PageStatus.LOADING,
})

const rowKey = (row: API_Post.Model) => row.id

//
const handleDelete = async (row: API_Friend.Model) => {
  const [err] = await toCatch(admin_friendApi.delete(row.id))
  if (err) return

  fetchData()
}

const handleEdit = async (row: API_Friend.Model) => {
  pageData.value.action = 'edit'
  pageData.value.activeRow = row
  pageData.value.modalVisible = true
}

const handleAdd = () => {
  console.log('handleAdd11')

  pageData.value.action = 'add'
  pageData.value.activeRow = null
  pageData.value.modalVisible = true

  console.log('handleAdd ', { ...pageData.value })
}

const handleUpdateStatus = async (row: API_Friend.Model, newValue: FriendStatus) => {
  console.log('[handleUpdateStatus] newValue ', newValue)

  if (row.status === newValue) return
  pageData.value.activeRow = row
  pageData.value.action = 'updateField:status'
  const data: API_Friend.UpdateField = {
    id: row.id,
    field: 'status',
    value: newValue,
  }

  await sleep(1000)

  const [err] = await toCatch(admin_friendApi.updateField(data))
  pageData.value.activeRow = null
  pageData.value.action = null

  if (err) return

  fetchData()
}

const pagination = reactive<PaginationProps>({
  pageSize: 10,
  page: 1,
})

const fetchData = async (page = 1) => {
  pageData.value.pageStatus = PageStatus.LOADING

  const params: API_Post.Get = {
    page,
    size: pagination.pageSize!,
  }

  const [err, res] = await toCatch(admin_friendApi.get(params))

  pageData.value.pageStatus = PageStatus.SUCCESS
  if (err || !res) return

  pageData.value.data = res.list || []
  pagination.page = page
  pagination.pageCount = Math.ceil(res.total / pagination.pageSize!)
}

const handleAfterConfirm = () => {
  pageData.value.modalVisible = false
  pageData.value.activeRow = null
  pageData.value.action = null
  fetchData()
}

onMounted(() => {
  fetchData()
})

const columns: DataTableColumns<API_Friend.Model> = [
  {
    title: 'id',
    key: 'id',
  },
  {
    title: 'Nickname',
    key: 'nickname',
  },
  {
    title: 'Name',
    key: 'blog_name',
  },
  {
    title: 'Introduction',
    key: 'introduction',
  },
  {
    title: 'Email',
    key: 'email',
  },
  {
    title: 'Status',
    key: 'status',
    width: 140,
    render: row => (
      <div class="flex items-center space-x-1 ">
        <NDropdown trigger="hover" keyField="value" options={friendStatusOptions} onSelect={value => handleUpdateStatus(row, value)}>
          <NButton
            size="small"
            secondary
            iconPlacement="right"
            class="w-24"
            type={row.status === FriendStatus.NORMAL ? 'success' : 'error'}
            loading={pageData.value.action === 'updateField:status' && pageData.value.activeRow?.id === row.id}
            renderIcon={() => (
              <i
                class="i-ri:arrow-down-s-line"
              />
            )}
          >
            {friendStatus[row.status]}
          </NButton>
        </NDropdown>
        {/* <NTag type={row.status === FriendStatus.NORMAL ? 'success' : 'error'}>{friendStatus[row.status]}</NTag> */}

        {/* <span class="relative flex">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
        </span> */}
      </div>
    ),
  },
  {
    title: 'Created At',
    key: 'created_at',
    render: row => dayjs(row.created_at).format('YYYY-MM-DD HH:mm:ss'),
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
        {/* <NSelect
          class="w-24"
          size="small"
          loading={pageData.value.action === 'updateField:status' && pageData.value.activeRow?.id === row.id}
          disabled={pageData.value.action === 'updateField:status' && pageData.value.activeRow?.id === row.id}
          options={friendStatusOptions}
          value={row.status}
          onUpdate:value={value => handleUpdateStatus(row, value)}
        >
        </NSelect> */}

        {/* <NDropdown trigger="hover" keyField="value" options={friendStatusOptions} onSelect={value => handleUpdateStatus(row, value)}>
          <NButton
            size="small"
            iconPlacement="right"
            loading={pageData.value.action === 'updateField:status' && pageData.value.activeRow?.id === row.id}
            renderIcon={() => (
              <i
                class="i-ri:arrow-down-s-line"
              />
            )}
          >
            Status
          </NButton>
        </NDropdown> */}

        <NButton type="info" size="small" onClick={() => handleEdit(row)}>Edit</NButton>

        <NPopconfirm onPositiveClick={() => handleDelete(row)}>
          {{
            default: () => 'Delete this row?',
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
