<template>
  <div class="base-echarts">
    <div class="echart" ref="echartRef"></div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
import { watchEffect } from 'vue'
import { thumbProps } from 'element-plus'

interface IProps {
  option: EChartsOption
}
const props = defineProps<IProps>()
const echartRef = ref()
onMounted(() => {
  // 初始化实例
  const echartInstance = echarts.init(echartRef.value!, 'light', {
    renderer: 'canvas'
  })
  // 第一次进行setOption  watchEffecct监听option 的变化
  watchEffect(() => {
    echartInstance.setOption(props.option)
  })
  // 监听windows缩放
  window.addEventListener('resize', echartInstance.resize())
})
</script>

<style lang="less">
.base-echarts {
  color: red;
}
</style>
