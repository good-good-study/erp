`<template>
  <a-layout-header class="main-header">
    <div class="header-left">
      <menu-unfold-outlined
        v-if="collapsed"
        class="trigger"
        @click="toggleCollapsed"
      />
      <menu-fold-outlined
        v-else
        class="trigger"
        @click="toggleCollapsed"
      />
    </div>

    <div class="header-right">
      <a-space>
        <a-badge :count="5" :offset="[10, 0]">
          <bell-outlined class="header-icon" />
        </a-badge>
        <a-dropdown>
          <a-space>
            <a-avatar>
              <template #icon><UserOutlined /></template>
            </a-avatar>
            <span class="username" v-if="!isMobile">Admin</span>
          </a-space>
          <template #overlay>
            <a-menu>
              <a-menu-item key="profile">
                <user-outlined />个人信息
              </a-menu-item>
              <a-menu-item key="settings">
                <setting-outlined />系统设置
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="logout" @click="handleLogout">
                <logout-outlined />退出登录
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-space>
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons-vue'
import { useBreakpoint } from '@/hooks/useBreakpoint'

const props = defineProps<{
  collapsed: boolean
}>()

const emit = defineEmits<{
  (e: 'update:collapsed', value: boolean): void
}>()

const router = useRouter()
const { isMobile } = useBreakpoint()

const toggleCollapsed = () => {
  emit('update:collapsed', !props.collapsed)
}

const handleLogout = () => {
  router.push('/login')
}
</script>

<style lang="less" scoped>
.main-header {
  background: #fff;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .header-left {
    .trigger {
      font-size: 18px;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }
  }

  .header-right {
    .header-icon {
      font-size: 18px;
      cursor: pointer;
      padding: 0 12px;

      &:hover {
        color: #1890ff;
      }
    }

    .username {
      margin-left: 8px;
    }
  }
}
</style>`