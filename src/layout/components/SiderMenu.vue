`<template>
  <a-layout-sider
    :collapsed="collapsed"
    :trigger="null"
    collapsible
    :class="['main-sider', isMobile ? 'mobile' : '']"
    v-if="!isMobile || (isMobile && !collapsed)"
    :style="isMobile ? mobileStyle : {}"
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
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { DashboardOutlined, InboxOutlined } from '@ant-design/icons-vue'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { useRoute } from 'vue-router'

const props = defineProps<{
  collapsed: boolean
}>()

const emit = defineEmits<{
  (e: 'update:collapsed', value: boolean): void
}>()

const route = useRoute()
const { isMobile } = useBreakpoint()

const selectedKeys = ref<string[]>([route.name as string])
const openKeys = ref<string[]>(['dashboard'])

const mobileStyle = computed(() => ({
  position: 'fixed',
  height: '100vh',
  zIndex: 999,
}))
</script>

<style lang="less" scoped>
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

  &.mobile {
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
  }
}
</style>`