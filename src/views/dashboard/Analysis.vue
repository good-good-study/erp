`<template>
  <div class="dashboard-analysis">
    <a-row :gutter="[16, 16]">
      <a-col :xs="24" :sm="12" :md="6" v-for="card in cards" :key="card.title">
        <a-card :loading="loading">
          <template #title>
            <component :is="card.icon" class="card-icon" />
            {{ card.title }}
          </template>
          <div class="card-content">
            <h2>{{ card.value }}</h2>
            <div class="card-footer">
              <span>
                较上周
                <component :is="card.trend === 'up' ? 'rise-outlined' : 'fall-outlined'" 
                  :class="card.trend"
                />
                {{ card.rate }}%
              </span>
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="[16, 16]" class="chart-row">
      <a-col :xs="24" :lg="16">
        <a-card title="销售趋势">
          <div ref="salesChart" class="chart"></div>
        </a-card>
      </a-col>
      <a-col :xs="24" :lg="8">
        <a-card title="销售分布">
          <div ref="pieChart" class="chart"></div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import {
  ShoppingCartOutlined,
  UserOutlined,
  AccountBookOutlined,
  InboxOutlined,
  RiseOutlined,
  FallOutlined
} from '@ant-design/icons-vue'
import { useBreakpoint } from '@/hooks/useBreakpoint'

const { isMobile } = useBreakpoint()
const loading = ref(false)
const salesChart = ref<HTMLElement | null>(null)
const pieChart = ref<HTMLElement | null>(null)
let charts: echarts.ECharts[] = []

const cards = [
  {
    title: '总销售额',
    value: '¥ 126,560',
    icon: ShoppingCartOutlined,
    trend: 'up',
    rate: 12.3
  },
  {
    title: '访问人数',
    value: '8,846',
    icon: UserOutlined,
    trend: 'up',
    rate: 5.6
  },
  {
    title: '支付笔数',
    value: '6,560',
    icon: AccountBookOutlined,
    trend: 'down',
    rate: 2.3
  },
  {
    title: '库存量',
    value: '12,423',
    icon: InboxOutlined,
    trend: 'up',
    rate: 8.1
  }
]

const initCharts = () => {
  if (salesChart.value && pieChart.value) {
    const lineChart = echarts.init(salesChart.value)
    const pie = echarts.init(pieChart.value)
    
    lineChart.setOption({
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
      }]
    })

    pie.setOption({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: isMobile.value ? 'horizontal' : 'vertical',
        left: isMobile.value ? 'center' : 'left',
        top: isMobile.value ? 'bottom' : 'center'
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: '服装' },
            { value: 735, name: '电子' },
            { value: 580, name: '食品' },
            { value: 484, name: '家具' },
            { value: 300, name: '其他' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    })

    charts = [lineChart, pie]
  }
}

onMounted(() => {
  initCharts()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  charts.forEach(chart => chart.dispose())
  window.removeEventListener('resize', handleResize)
})

const handleResize = () => {
  charts.forEach(chart => chart.resize())
}
</script>

<style lang="less" scoped>
.dashboard-analysis {
  .ant-card {
    margin-bottom: 16px;
  }

  .card-icon {
    font-size: 20px;
    color: #1890ff;
  }

  .card-content {
    h2 {
      margin: 0;
      font-size: 24px;
    }

    .card-footer {
      margin-top: 8px;
      color: rgba(0, 0, 0, 0.45);

      .up {
        color: #52c41a;
      }

      .down {
        color: #ff4d4f;
      }
    }
  }

  .chart {
    height: 300px;
  }

  .chart-row {
    margin-top: 16px;
  }
}
</style>`