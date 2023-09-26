<template>
  <div class="dashboard">
    <!-- 顶部数字的数据展示 -->
    <el-row :gutter="10">
      <template v-for="item in amountList" :key="item.amount">
        <el-col :span="6" :xs="24" :ms="12">
          <CountCard v-bind="item" />
        </el-col>
      </template>
    </el-row>
  </div>
  <div class="echart">
    <!-- 中间部分的图表 -->
    <el-row :gutter="10">
      <el-col :span="7">
        <chart-card :name="arr[0].name">
          <PieEchart :pie-data="showGoodsCategoryCount" />
        </chart-card>
      </el-col>
      <el-col :span="10">
        <chart-card :name="arr[1].name">
          <mapEchart :map-data="goodsAdressSale" />
        </chart-card>
      </el-col>
      <el-col :span="7">
        <chart-card :name="arr[2].name">
          <RoleEchart :rose-data="showGoodsCategorySale" />
        </chart-card>
      </el-col>
    </el-row>
    <!-- 底部的图表 -->
    <el-row :gutter="10">
      <el-col :span="12">
        <chart-card :name="arr[3].name">
          <LineEchart
            :labels="showGoodsCategorySaleSome.labels"
            :values="showGoodsCategorySaleSome.values"
        /></chart-card>
      </el-col>
      <el-col :span="12">
        <chart-card :name="arr[4].name">
          <PoleEchart
            :labels="showGoodsCategoryFavor.labels"
            :values="showGoodsCategoryFavor.values"
          ></PoleEchart
        ></chart-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import CountCard from './c-cpns/count-card.vue'
import chartCard from './c-cpns/chart-card.vue'
import useAnalysisStore from '@/store/main/analysis/analysis'
import PieEchart from '@/components/page-echarts/src/pie-echart.vue'
import LineEchart from '@/components/page-echarts/src/line-echart.vue'
import PoleEchart from '@/components/page-echarts/src/pole-echart.vue'
import RoleEchart from '@/components/page-echarts/src/role-echart.vue'
import mapEchart from '@/components/page-echarts/src/map-echart.vue'
import { ItemProps } from 'element-plus'
//  0. 头部标签
const arr = [
  { name: '分类商品数量(饼图)' },
  { name: '不同城市商品销量(地图)' },
  { name: '分类商品数量(玫瑰图)' },
  { name: '分类商品的销量(折线图)' },
  { name: '分类商品的收藏(柱状图)' }
]

// 1.发起数据请求
const analysisStore = useAnalysisStore()
analysisStore.fetchAnalysisDataAction()
// 2. 从store中拿数据
const {
  amountList,
  goodsCategoryCount,
  goodsCategorySale,
  goodsCategoryFavor,
  goodsAdressSale
} = storeToRefs(analysisStore)
//  3.获取数据
const showGoodsCategoryCount = computed(() => {
  return goodsCategoryCount.value.map((item) => ({
    name: item.name,
    value: item.goodsCount
  }))
})

const showGoodsCategorySale = computed(() => {
  return goodsCategorySale.value.map((item) => ({
    name: item.name,
    value: item.goodsCount
  }))
})
const showGoodsCategorySaleSome = computed(() => {
  const labels = goodsCategorySale.value.map((item) => {
    return item.name
  })
  const values = goodsCategorySale.value.map((item) => {
    return item.goodsCount
  })
  return { labels, values }
})
const showGoodsCategoryFavor = computed(() => {
  const labels = goodsCategoryFavor.value.map((item) => {
    return item.name
  })
  const values = goodsCategoryFavor.value.map((item) => {
    return item.goodsFavor
  })
  return { labels, values }
})
const showGoodsAdressSale = computed(() => {
  return goodsAdressSale.value.map((item) => ({
    name: item.address,
    value: item.count
  }))
})
</script>

<style lang="less">
.dashboard {
  color: black;
}
.echart {
  height: 350px;
}
</style>
