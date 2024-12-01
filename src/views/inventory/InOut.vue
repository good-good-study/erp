`<template>
  <div class="in-out-page">
    <a-card title="出入库管理">
      <a-space class="operation-bar">
        <a-button type="primary" @click="handleAdd">
          新增入库
        </a-button>
        <a-button @click="handleExport">
          导出记录
        </a-button>
      </a-space>

      <a-table :columns="columns" :data-source="data" :loading="loading">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <a-space>
              <a @click="handleView(record)">查看详情</a>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)

const columns = [
  {
    title: '单据编号',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '操作人',
    dataIndex: 'operator',
    key: 'operator',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '操作',
    key: 'action',
  },
]

const data = [
  {
    id: 'RK202308001',
    type: '入库',
    date: '2023-08-20',
    operator: '张三',
    status: '已完成',
  },
  {
    id: 'CK202308001',
    type: '出库',
    date: '2023-08-19',
    operator: '李四',
    status: '处理中',
  },
]

const handleAdd = () => {
  console.log('新增入库')
}

const handleExport = () => {
  console.log('导出记录')
}

const handleView = (record: any) => {
  console.log('查看详情', record)
}
</script>

<style lang="less" scoped>
.in-out-page {
  padding: 24px;

  .operation-bar {
    margin-bottom: 16px;
  }
}
</style>`