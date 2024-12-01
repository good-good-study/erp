`<template>
  <div class="stock-page">
    <a-card title="库存查询">
      <a-table :columns="columns" :data-source="data" :loading="loading">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <a-space>
              <a @click="handleEdit(record)">编辑</a>
              <a @click="handleView(record)">查看</a>
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
    title: '商品编号',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '商品名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '库存数量',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: '单位',
    dataIndex: 'unit',
    key: 'unit',
  },
  {
    title: '操作',
    key: 'action',
  },
]

const data = [
  {
    id: 'SP001',
    name: '商品A',
    quantity: 100,
    unit: '个',
  },
  {
    id: 'SP002',
    name: '商品B',
    quantity: 200,
    unit: '件',
  },
]

const handleEdit = (record: any) => {
  console.log('编辑', record)
}

const handleView = (record: any) => {
  console.log('查看', record)
}
</script>

<style lang="less" scoped>
.stock-page {
  padding: 24px;
}
</style>`