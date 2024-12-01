<template>
  <div class="resource-files">
    <a-card>
      <template #title>
        <a-space>
          文件管理
          <a-select
            v-model:value="currentGroup"
            style="width: 200px"
            placeholder="选择分组"
          >
            <a-select-option value="">全部文件</a-select-option>
            <a-select-option v-for="group in groups" :key="group.id" :value="group.id">
              {{ group.name }}
            </a-select-option>
          </a-select>
        </a-space>
      </template>
      
      <template #extra>
        <a-upload
          :customRequest="handleUpload"
          :showUploadList="false"
        >
          <a-button type="primary">
            <upload-outlined /> 上传文件
          </a-button>
        </a-upload>
      </template>

      <a-table :columns="columns" :data-source="files" :loading="loading">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'size'">
            {{ formatFileSize(record.size) }}
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a @click="handleDownload(record)">下载</a>
              <a-divider type="vertical" />
              <a-dropdown>
                <a>
                  更多 <down-outlined />
                </a>
                <template #overlay>
                  <a-menu>
                    <a-menu-item @click="handleMove(record)">
                      移动到分组
                    </a-menu-item>
                    <a-menu-item @click="handleDelete(record)">
                      删除
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-card>

    <a-modal
      v-model:open="moveModalOpen"
      title="移动到分组"
      @ok="handleMoveModalOk"
    >
      <a-select
        v-model:value="targetGroup"
        style="width: 100%"
        placeholder="选择目标分组"
      >
        <a-select-option v-for="group in groups" :key="group.id" :value="group.id">
          {{ group.name }}
        </a-select-option>
      </a-select>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UploadOutlined, DownOutlined } from '@ant-design/icons-vue'

const loading = ref(false)
const currentGroup = ref('')
const moveModalOpen = ref(false)
const targetGroup = ref('')
const currentFile = ref<any>(null)

const columns = [
  {
    title: '文件名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '大小',
    dataIndex: 'size',
    key: 'size',
  },
  {
    title: '上传时间',
    dataIndex: 'uploadTime',
    key: 'uploadTime',
  },
  {
    title: '操作',
    key: 'action',
  },
]

const groups = ref([
  { id: '1', name: '文档' },
  { id: '2', name: '图片' },
  { id: '3', name: '视频' },
])

const files = ref([
  {
    key: '1',
    name: 'document.pdf',
    size: 1024576,
    uploadTime: '2023-08-20 10:00:00',
    groupId: '1',
  },
  {
    key: '2',
    name: 'image.jpg',
    size: 2048576,
    uploadTime: '2023-08-19 15:30:00',
    groupId: '2',
  },
])

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const handleUpload = (options: any) => {
  const { file, onSuccess } = options
  // Upload file logic here
  setTimeout(() => {
    files.value.push({
      key: Date.now().toString(),
      name: file.name,
      size: file.size,
      uploadTime: new Date().toLocaleString(),
      groupId: currentGroup.value,
    })
    onSuccess()
  }, 1000)
}

const handleDownload = (record: any) => {
  // Download file logic here
}

const handleMove = (record: any) => {
  currentFile.value = record
  moveModalOpen.value = true
}

const handleDelete = (record: any) => {
  files.value = files.value.filter(item => item.key !== record.key)
}

const handleMoveModalOk = () => {
  if (currentFile.value && targetGroup.value) {
    const index = files.value.findIndex(item => item.key === currentFile.value.key)
    if (index !== -1) {
      files.value[index] = {
        ...files.value[index],
        groupId: targetGroup.value
      }
    }
  }
  moveModalOpen.value = false
  targetGroup.value = ''
  currentFile.value = null
}
</script>

<style lang="less" scoped>
.resource-files {
  .upload-hint {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.45);
  }
}
</style>