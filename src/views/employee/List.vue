<template>
  <div class="employee-list">
    <a-card title="员工管理">
      <template #extra>
        <a-button type="primary" @click="showModal">
          新增员工
        </a-button>
      </template>

      <a-table :columns="columns" :data-source="employees" :loading="loading">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'role'">
            <a-tag :color="getRoleColor(record.role)">{{ record.role }}</a-tag>
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a @click="handleEdit(record)">编辑</a>
              <a-divider type="vertical" />
              <a-popconfirm
                title="确定要删除此员工吗？"
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
      :title="modalMode === 'add' ? '新增员工' : '编辑员工'"
      @ok="handleModalOk"
    >
      <a-form :model="formState" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
        <a-form-item label="姓名" required>
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item label="角色" required>
          <a-select v-model:value="formState.role">
            <a-select-option value="管理员">管理员</a-select-option>
            <a-select-option value="运营">运营</a-select-option>
            <a-select-option value="开发者">开发者</a-select-option>
            <a-select-option value="员工">员工</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="邮箱">
          <a-input v-model:value="formState.email" />
        </a-form-item>
        <a-form-item label="手机">
          <a-input v-model:value="formState.phone" />
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
  role: '员工',
  email: '',
  phone: ''
})

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '角色',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '手机',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '操作',
    key: 'action',
  },
]

const employees = ref([
  {
    key: '1',
    name: '张三',
    role: '管理员',
    email: 'zhangsan@example.com',
    phone: '13800138000',
  },
  {
    key: '2',
    name: '李四',
    role: '运营',
    email: 'lisi@example.com',
    phone: '13800138001',
  },
])

const getRoleColor = (role: string) => {
  const colors: Record<string, string> = {
    '管理员': 'red',
    '运营': 'green',
    '开发者': 'blue',
    '员工': 'orange',
  }
  return colors[role] || 'default'
}

const showModal = () => {
  modalMode.value = 'add'
  formState.value = {
    name: '',
    role: '员工',
    email: '',
    phone: ''
  }
  modalOpen.value = true
}

const handleEdit = (record: any) => {
  modalMode.value = 'edit'
  formState.value = { ...record }
  modalOpen.value = true
}

const handleDelete = (record: any) => {
  employees.value = employees.value.filter(item => item.key !== record.key)
}

const handleModalOk = () => {
  if (modalMode.value === 'add') {
    employees.value.push({
      key: Date.now().toString(),
      ...formState.value
    })
  } else {
    const index = employees.value.findIndex(item => item.key === formState.value.key)
    if (index !== -1) {
      employees.value[index] = { ...formState.value }
    }
  }
  modalOpen.value = false
}
</script>

<style lang="less" scoped>
.employee-list {
  .danger {
    color: #ff4d4f;
  }
}
</style>