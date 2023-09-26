<template>
  <div class="count-card">
    <div class="header">
      <span class="title">{{ title }}</span>
      <el-tooltip :content="tips" placement="top">
        <el-icon><Aim /></el-icon>
      </el-tooltip>
    </div>
    <div class="content">
      <span class="count" ref="count1Ref">{{ number1 }}</span>
    </div>
    <div class="footer">
      <span>{{ subtitle }}</span>
      <span ref="count2Ref">{{ number2 }} </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { CountUp } from 'countup.js'

interface IProps {
  amount: string
  title?: string
  tips?: string
  number1?: number
  number2?: number
  subtitle?: string
}
// 默认值
const props = withDefaults(defineProps<IProps>(), {
  title: '商品总销量',
  tips: '总销量',
  number1: 1234,
  number2: 1234,
  subtitle: '商品总销量'
})

const count1Ref = ref()
const count2Ref = ref()
// 参数1：执行动画的元素，参数二：数字增加到多大,第三个参数：从多少开始递增，默认为0 / 也可以加前缀：prefix
// 对dom操作时需要在onMounted
const countOption = {
  prefix: props.amount === 'saleroom' ? '￥' : ''
}
onMounted(() => {
  // 执行一个动画需要开启一个实例
  const countup1 = new CountUp(count1Ref.value, props.number1, countOption)
  const countup2 = new CountUp(count2Ref.value, props.number2, countOption)
  countup1.start()
  countup2.start()
})
</script>

<style lang="less">
.count-card {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  height: 130px;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  .header {
    display: flex;
    height: 38px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    justify-content: space-between;
    align-items: flex-end;
  }
  .content {
    display: flex;
    margin-top: 10px;
    margin-left: 0px;
    font-size: 26px;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }
  .footer {
    display: flex;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
    border-top: 1px solid #f0f0f0;
  }
}
</style>
