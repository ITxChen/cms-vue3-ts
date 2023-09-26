<template>
  <div class="chartCard">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>{{ prop.name }}</span>
        </div>
      </template>
      <div>
        <slot></slot>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
interface IProp {
  name: string
}
const prop = defineProps<IProp>()
console.log(prop)
</script>

<style lang="less">
.chartCard {
  background: white;
  margin-top: 10px;
}
</style>
