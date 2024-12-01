<template>
  <div class="roles-management">
    <a-row :gutter="16">
      <a-col :span="8">
        <a-card title="角色列表">
          <template #extra>
            <a-button type="primary" @click="showRoleModal">
              新增角色
            </a-button>
          </template>
          <a-menu
            v-model:selectedKeys="selectedRole"
            mode="inline"
            style="border-right: 0"
          >
            <a-menu-item v-for="role in roles" :key="role.id">
              {{ role.name }}
              <template #icon>
                <TeamOutlined />
              </template>
            </a-menu-item>
          </a-menu>
        </a-card>
      </a-col>
      
      <a-col :span="16">
        <a-card 
          title="权限配置" 
          v-if="currentRole"
        >
          <template #extra>
            <a-button type="primary" @click="savePermissions">
              保存更改
            </a-button>
          </template>
          
          <a-checkbox-group v-model:value="selectedPermissions">
            <a-row>
              <a-col :span="8" v-for="perm in permissions" :key="perm.id">
                <a-checkbox :value="perm.id">{{ perm.name }}</a-checkbox>
              </a-col>
            </a-row>
          </a-checkbox-group>
        </a-card>
      </a-col>
    </a-row>

    <a-modal
      v-model:open="roleModalOpen"
      title="新增角色"
      @ok="handleRoleModalOk"
    >
      <a-form :model="roleForm" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
        <a-form-item label="角色名称" required>
          <a-input v-model:value="roleForm.name" />
        </a-form-item>
        <a-form-item label="角色描述">
          <a-input v-model:value="roleForm.description" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { TeamOutlined } from '@ant-design/icons-vue'

const roleModalOpen = ref(false)
const selectedRole = ref<string[]>(['1'])
const selectedPermissions = ref<string[]>(['1', '2'])

const roleForm = ref({
  name: '',
  description: ''
})

const roles = ref([
  { id: '1', name: '管理员', description: '系统管理员' },
  { id: '2', name: '运营', description: '运营人员' },
  { id: '3', name: '开发者', description: '开发人员' },
  { id: '4', name: '员工', description: '普通员工' },
])

const permissions = ref([
  { id: '1', name: '查看仪表盘' },
  { id: '2', name: '员工管理' },
  { id: '3', name: '角色管理' },
  { id: '4', name: '库存查询' },
  { id: '5', name: '出入库管理' },
  { id: '6', name: '资源管理' },
])

const currentRole = computed(() => {
  return roles.value.find(role => role.id === selectedRole.value[0])
})

const showRoleModal = () => {
  roleForm.value = {
    name: '',
    description: ''
  }
  roleModalOpen.value = true
}

const handleRoleModalOk = () => {
  roles.value.push({
    id: Date.now().toString(),
    ...roleForm.value
  })
  roleModalOpen.value = false
}

const savePermissions = () => {
  // Save permissions logic here
}
</script>

<style lang="less" scoped>
.roles-management {
  .ant-checkbox-group {
    width: 100%;
  }
  
  .ant-checkbox-wrapper {
    margin-left: 0;
    margin-bottom: 16px;
  }
}
</style>