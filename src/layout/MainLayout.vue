<template>
  <a-layout class="main-layout">
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      class="main-sider"
    >
      <div class="logo">
        <img src="/logo.png" alt="Logo" />
        <span v-show="!collapsed">ERP System</span>
      </div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        mode="inline"
        theme="dark"
      >
        <a-sub-menu key="dashboard">
          <template #icon>
            <DashboardOutlined />
          </template>
          <template #title>Dashboard</template>
          <a-menu-item key="analysis">
            <router-link to="/dashboard/analysis">数据分析</router-link>
          </a-menu-item>
          <a-menu-item key="workplace">
            <router-link to="/dashboard/workplace">工作台</router-link>
          </a-menu-item>
        </a-sub-menu>

        <a-sub-menu key="inventory">
          <template #icon>
            <InboxOutlined />
          </template>
          <template #title>库存管理</template>
          <a-menu-item key="stock">
            <router-link to="/inventory/stock">库存查询</router-link>
          </a-menu-item>
          <a-menu-item key="in-out">
            <router-link to="/inventory/in-out">出入库管理</router-link>
          </a-menu-item>
        </a-sub-menu>

        <a-sub-menu key="employee">
          <template #icon>
            <TeamOutlined />
          </template>
          <template #title>员工管理</template>
          <a-menu-item key="employee-list">
            <router-link to="/employee/list">员工列表</router-link>
          </a-menu-item>
          <a-menu-item key="employee-roles">
            <router-link to="/employee/roles">角色权限</router-link>
          </a-menu-item>
        </a-sub-menu>

        <a-sub-menu key="resources">
          <template #icon>
            <FolderOutlined />
          </template>
          <template #title>资源管理</template>
          <a-menu-item key="resource-files">
            <router-link to="/resources/files">文件管理</router-link>
          </a-menu-item>
          <a-menu-item key="resource-groups">
            <router-link to="/resources/groups">分组管理</router-link>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header class="main-header">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <div class="header-right">
          <a-space>
            <a-badge count="5">
              <bell-outlined class="header-icon" />
            </a-badge>
            <a-dropdown>
              <a-space>
                <a-avatar>
                  <template #icon><UserOutlined /></template>
                </a-avatar>
                <span class="username">Admin</span>
              </a-space>
              <template #overlay>
                <a-menu>
                  <a-menu-item key="profile">
                    <router-link to="/profile">
                      <user-outlined />个人信息
                    </router-link>
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

      <a-layout-content class="main-content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  InboxOutlined,
  TeamOutlined,
  FolderOutlined,
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons-vue'

const router = useRouter()
const collapsed = ref(false)
const selectedKeys = ref<string[]>(['analysis'])
const openKeys = ref<string[]>(['dashboard'])

const handleLogout = () => {
  router.push('/login')
}
</script>

<style lang="less" scoped>
.main-layout {
  min-height: 100vh;

  .main-sider {
    .logo {
      height: 64px;
      padding: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
      color: white;
      
      img {
        height: 32px;
        width: 32px;
      }

      span {
        font-size: 18px;
        font-weight: 600;
        white-space: nowrap;
        opacity: 1;
        transition: opacity 0.3s;
      }
    }
  }

  .main-header {
    background: #fff;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .trigger {
      font-size: 18px;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
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

  .main-content {
    margin: 24px;
    padding: 24px;
    background: #fff;
    min-height: 280px;
  }
}

// Transition animations
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>