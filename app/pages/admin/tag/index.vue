<template>
  <div>
    <NCard title="Tag">
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
        :loading="pageData.pageStatus === PageStatus.LOADING"
        :columns="columns"
        :data="pageData.data"
      />
    </NCard>

    <AdminTagFormModal
      v-model:visible="pageData.modalVisible"
      :action="pageData.action!"
      :row="pageData.activeRow"
      @after-confirm="handleFormModalAfterConfirm"
    />
  </div>
</template>

<script setup lang="tsx">
import dayjs from 'dayjs'
import { NButton, NCard, NDataTable, NPopconfirm, NSpace, type DataTableColumns } from 'naive-ui'
import admin_tagApi from '~/admin-api/tagApi'
import { FormModelAction } from '~/type/enum/formModalAction'
import { PageStatus } from '~/type/enum/pageStatus'
import { toCatch } from '~/util/toCatch'

type PageData<T> = {
  pageStatus: PageStatus
  data: T
  activeRow: API_Tag.Model | null
  action: FormModelAction | null
  modalVisible: boolean
}

const pageData = ref<PageData<API_Tag.Model[]>>({
  data: [],
  pageStatus: PageStatus.LOADING,
  activeRow: null,
  action: null,
  modalVisible: false,
})

const handleEdit = (row: API_Tag.Model) => {
  pageData.value.modalVisible = true
  pageData.value.activeRow = row
  pageData.value.action = FormModelAction.EDIT
}

//
const handleDelete = async (row: API_Tag.Model) => {
  const [err] = await toCatch(admin_tagApi.delete(row.id))
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
const fetchData = async () => {
  pageData.value.pageStatus = PageStatus.LOADING

  const [err, res] = await toCatch(admin_tagApi.get())
  pageData.value.pageStatus = PageStatus.SUCCESS
  if (err) return

  pageData.value.data = res || []
}

onMounted(() => {
  fetchData()
})

const columns: DataTableColumns<API_Tag.Model> = [
  {
    title: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    key: 'name',
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
