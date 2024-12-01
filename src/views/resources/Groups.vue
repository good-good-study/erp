<template>
  <div class="resource-groups">
    <a-card title="文件分组">
      <template #extra>
        <a-button type="primary" @click="showModal">
          新增分组
        </a-button>
      </template>

      <a-table :columns="columns" :data-source="groups" :loading="loading">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <a-space>
              <a @click="handleEdit(record)">编辑</a>
              <a-divider type="vertical" />
              <a-popconfirm
                title="确定要删除此分组吗？"
                @confirm="handleDelete(record)"
              >
                <a class="danger">删除</a>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-card>

    <a-modal
      v-model:open="modalOpen"
      :title="modalMode === 'add' ? '新增分组' : '编辑分组'"
      @ok="handleModalOk"
    >
      <a-form :model="formState" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
        <a-form-item label="分组名称" required>
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item label="描述">
          <a-input v-model:value="formState.description" type="textarea" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const modalOpen = ref(false)
const modalMode = ref<'add' | 'edit'>('add')

const formState = ref({
  name: '',
  description: ''
})

const columns = [
  {
    title: '分组名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: '文件数量',
    dataIndex: 'fileCount',
    key: 'fileCount',
  },
  {
    title: '操作',
    key: 'action',
  },
]

const groups = ref([
  {
    key: '1',
    name: '文档',
    description: '文档文件',
    fileCount: 10,
  },
  {
    key: '2',
    name: '图片',
    description: '图片文件',
    fileCount: 20,
  },
])

const showModal = () => {
  modalMode.value = 'add'
  formState.value = {
    name: '',
    description: ''
  }
  modalOpen.value = true
}

const handleEdit = (record: any) => {
  modalMode.value = 'edit'
  formState.value = { ...record }
  modalOpen.value = true
}

const handleDelete = (record: any) => {
  groups.value = groups.value.filter(item => item.key !== record.key)
}

const handleModalOk = () => {
  if (modalMode.value === 'add') {
    groups.value.push({
      key: Date.now().toString(),
      ...formState.value,
      fileCount: 0
    })
  } else {
    const index = groups.value.findIndex(item => item.key === formState.value.key)
    if (index !== -1) {
      groups.value[index] = { ...formState.value }
    }
  }
  modalOpen.value = false
}
</script>

<style lang="less" scoped>
.resource-groups {
  .danger {
    color: #ff4d4f;
  }
}
</style>