<template>
  <div class="pie-echart">
    <BaseEchart :option="option" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseEchart from './base-echart.vue'
import type { EChartsOption } from 'echarts'
interface IProps {
  pieData: any[]
}
const props = defineProps<IProps>()
// console.log(props)
const option = computed<EChartsOption>(() => {
  return {
    legend: {
      top: 'top'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    toolbox: {
      show: true
    },
    series: [
      {
        type: 'pie',
        radius: [10, 160],
        center: ['50%', '65%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: props.pieData
      }
    ]
  }
})
</script>

<style lang="less">
.pie-echart {
  color: red;
}
</style>
