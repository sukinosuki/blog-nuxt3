<template>
  <div>
    <NCard title="Posts">
      <template #header-extra>
        <NSpace>
          <NButton
            size="small"
            click="() => fetchData()"
          >
            Refresh
            <template #icon>
              <div class="i-ri:refresh-line" />
            </template>
          </NButton>

          <NButton
            type="primary"
            size="small"
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
      :action="pageData.action"
      @after-confirm="handleAfterConfirm"
    />
  </div>
</template>

<script setup lang="tsx">
import { NButton, NCard, NDataTable, NDropdown, NPopconfirm, NSpace, type DataTableColumns, type PaginationProps } from 'naive-ui'
import admin_friendApi from '~/api/admin-api/friendApi'
import AppImage from '~/components/AppImage.vue'
import Popover from '~/components/Popover.vue'
import { FormModalAction } from '~/type/enum/formModalAction'
import { PageStatus } from '~/type/enum/pageStatus'
import { FriendStatus, friendStatus, friendStatusOptions } from '~~/type/enum/FriendStatus'

type PageData<T> = {
  pageStatus: PageStatus
  data: T
  activeRow: API_Friend.Model | null
  action: 'update:status' | null | FormModalAction
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
  pageData.value.action = FormModalAction.EDIT
  pageData.value.activeRow = row
  pageData.value.modalVisible = true
}

const handleAdd = () => {
  pageData.value.action = FormModalAction.ADD
  pageData.value.activeRow = null
  pageData.value.modalVisible = true
}

const handleUpdateStatus = async (row: API_Friend.Model, newValue: FriendStatus) => {
  if (row.status === newValue) return

  pageData.value.activeRow = row
  pageData.value.action = 'update:status'
  const data: API_Friend.UpdateField = {
    id: row.id,
    field: 'status',
    value: newValue,
  }

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
    width: 80,
  },
  {
    title: 'Blog Name',
    key: 'blog_name',
    render: row => (
      <Popover>
        {{
          default: () => <a href={row.link} target="_blank" class="text-blue">{row.blog_name}</a>,
          popover: () => (
            <div class="p-2 shadow-xl rounded-xl bg-white/80 dark-bg-black backdrop-blur-xl">
              <a
                href="link.path"
                target="_blank"
                class="text-primary"
              >
                { row.link }
              </a>
            </div>
          ),
        }}
      </Popover>
    ),
  },
  // {
  //   title: 'Url',
  //   key: 'link',
  //   render: row => <a href={row.link} target="_blank" class="text-blue">{row.link}</a>,
  // },
  {
    title: 'Nickname',
    key: 'nickname',
  },
  {
    title: 'Avatar',
    key: 'avatar',
    // render: row => <img src={row.avatar} class="w-10 h-10 rounded-full"></img>,
    render: row => (
      <AppImage class="w-10 h-10 rounded bg-gray-1" src={row.avatar}>
      </AppImage>
    ),
  },
  // {
  //   title: 'Introduction',
  //   key: 'introduction',
  // },
  // {
  //   title: 'Email',
  //   key: 'email',
  // },
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
            class="w-full text-3 "
            type={row.status === FriendStatus.NORMAL ? 'success' : 'error'}
            loading={pageData.value.action === 'update:status' && pageData.value.activeRow?.id === row.id}
          >
            {/* renderIcon={() => (
              <i
                class="i-ri:arrow-down-s-line"
              />
            )} */}
            {friendStatus[row.status]}
          </NButton>
        </NDropdown>
      </div>
    ),
  },
  {
    title: 'Created At',
    key: 'created_at',
    width: 180,
    render: row => dateUtil.format(row.created_at),
  },
  {
    title: 'Operation',
    key: 'id',
    width: 140,
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
