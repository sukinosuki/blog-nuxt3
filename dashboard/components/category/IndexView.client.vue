<template>
  <div>
    <NCard title="Category">
      <template #header-extra>
        <NSpace>
          <NButton
            size="small"
            @click="fetchData"
          >
            Refresh
            <template #icon>
              <i class="i-ri:refresh-line" />
            </template>
          </NButton>

          <NButton
            size="small"
            type="primary"
            @click="handleAdd"
          >
            New
            <template #icon>
              <i class="i-ri:add-fill" />
            </template>
          </NButton>
        </NSpace>
      </template>

      <NDataTable
        :loading="pageData.pageStatus === PageStatus.LOADING"
        :columns="columns"
        scroll-x="800"
        :data="pageData.data"
      />
    </NCard>

    <CategoryFormModal
      v-model:visible="pageData.modalVisible"
      :action="pageData.action"
      :row="pageData.activeRow"
      @after-confirm="handleFormModalAfterConfirm"
    />
  </div>
</template>

<script setup lang="tsx">
import { NButton, NCard, NDataTable, NPopconfirm, NSpace, type DataTableColumns } from 'naive-ui'
import { FormModalAction } from '~~/type/enum/formModalAction'
import { PageStatus } from '~~/type/enum/pageStatus'
import categoryApi from '~~/dashboard/api/categoryApi'

  type PageData<T> = {
    pageStatus: PageStatus
    data: T
    activeRow: API_Category.Model | null
    action: FormModalAction
    modalVisible: boolean
  }

const pageData = ref<PageData<API_Category.Model[]>>({
  data: [],
  pageStatus: PageStatus.LOADING,
  activeRow: null,
  action: FormModalAction.ADD,
  modalVisible: false,
})

const handleEdit = (row: API_Category.Model) => {
  pageData.value.modalVisible = true
  pageData.value.activeRow = row
  pageData.value.action = FormModalAction.EDIT
}

//
const handleDelete = async (row: API_Category.Model) => {
  const [err] = await toCatch(categoryApi.delete(row.id))
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
const fetchData = async () => {
  pageData.value.pageStatus = PageStatus.LOADING

  const [err, res] = await toCatch(categoryApi.get())
  pageData.value.pageStatus = PageStatus.SUCCESS
  if (err) return

  pageData.value.data = res || []
}

onMounted(() => {
  fetchData()
})

const columns: DataTableColumns<API_Category.Model> = [
  {
    title: 'id',
    key: 'id',
    width: 100,
  },
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Alias',
    key: 'alias',
  },
  {
    title: 'Created At',
    key: 'created_at',
    width: 200,
    render: row => dateUtil.format(row.created_at),
  },
  {
    title: 'Operation',
    key: 'id',
    width: 130,
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
