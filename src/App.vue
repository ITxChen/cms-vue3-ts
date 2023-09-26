<template>
  <div class="app">
    <!-- 中文化 -->
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>
<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<style scoped="less">
.app {
  height: 100vh;
  width: 100vw;
  /* background-color:aqua; */
}
</style>
