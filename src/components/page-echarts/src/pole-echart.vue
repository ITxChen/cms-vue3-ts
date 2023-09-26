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
  labels: any[]
  values: any[]
}
const props = defineProps<IProps>()

var data: any = []
for (let i = 0; i < 5; ++i) {
  data.push(Math.round(Math.random() * 200))
}

const option = computed(() => {
  return {
    xAxis: {
      max: 'dataMax'
    },
    yAxis: {
      type: 'category',
      data: props.labels,
      inverse: true,
      animationDuration: 300,
      animationDurationUpdate: 300,
      max: props.labels.length
    },
    series: [
      {
        realtimeSort: true,
        name: 'X',
        type: 'bar',
        data: props.values,
        label: {
          show: true,
          position: 'right',
          valueAnimation: true
        }
      }
    ],
    legend: {
      show: true
    },
    animationDuration: 3000,
    animationDurationUpdate: 3000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear'
  }
})

function update() {
  var data = option.value.series[0].data
  for (var i = 0; i < data.length; ++i) {
    if (Math.random() > 0.9) {
      data[i] += Math.round(Math.random() * 2000)
    } else {
      data[i] += Math.round(Math.random() * 200)
    }
  }
}

setInterval(function () {
  update()
}, 3000)
</script>

<style lang="less">
.pie-echart {
  color: red;
}
</style>
