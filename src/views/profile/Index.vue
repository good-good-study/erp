<template>
  <div class="profile-page">
    <a-row :gutter="16">
      <a-col :span="8">
        <a-card>
          <div class="profile-info">
            <a-avatar :size="64">
              <template #icon><UserOutlined /></template>
            </a-avatar>
            <h2>Admin User</h2>
            <p>管理员</p>
          </div>
          
          <a-divider />
          
          <div class="profile-meta">
            <p>
              <MailOutlined /> admin@example.com
            </p>
            <p>
              <PhoneOutlined /> 13800138000
            </p>
            <p>
              <ClockCircleOutlined /> 最后登录：2023-08-20 10:00:00
            </p>
          </div>
        </a-card>
      </a-col>
      
      <a-col :span="16">
        <a-card title="基本信息">
          <a-form
            :model="formState"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 16 }"
          >
            <a-form-item label="用户名">
              <a-input v-model:value="formState.username" />
            </a-form-item>
            <a-form-item label="昵称">
              <a-input v-model:value="formState.nickname" />
            </a-form-item>
            <a-form-item label="邮箱">
              <a-input v-model:value="formState.email" />
            </a-form-item>
            <a-form-item label="手机">
              <a-input v-model:value="formState.phone" />
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 4 }">
              <a-button type="primary" @click="handleSave">保存更改</a-button>
            </a-form-item>
          </a-form>
        </a-card>

        <a-card title="修改密码" class="margin-top">
          <a-form
            :model="passwordForm"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 16 }"
          >
            <a-form-item label="当前密码" required>
              <a-input-password v-model:value="passwordForm.oldPassword" />
            </a-form-item>
            <a-form-item label="新密码" required>
              <a-input-password v-model:value="passwordForm.newPassword" />
            </a-form-item>
            <a-form-item label="确认密码" required>
              <a-input-password v-model:value="passwordForm.confirmPassword" />
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 4 }">
              <a-button type="primary" @click="handleChangePassword">
                修改密码
              </a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  ClockCircleOutlined
} from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

const formState = ref({
  username: 'admin',
  nickname: 'Admin User',
  email: 'admin@example.com',
  phone: '13800138000'
})

const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const handleSave = () => {
  message.success('保存成功')
}

const handleChangePassword = () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    message.error('两次输入的密码不一致')
    return
  }
  message.success('密码修改成功')
  passwordForm.value = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  }
}
</script>

<style lang="less" scoped>
.profile-page {
  .profile-info {
    text-align: center;
    padding: 16px 0;

    h2 {
      margin: 16px 0 8px;
    }

    p {
      color: rgba(0, 0, 0, 0.45);
    }
  }

  .profile-meta {
    p {
      margin-bottom: 8px;
      color: rgba(0, 0, 0, 0.65);

      .anticon {
        margin-right: 8px;
      }
    }
  }

  .margin-top {
    margin-top: 16px;
  }
}
</style>