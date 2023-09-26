<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <div class="label">
      <el-tabs type="border-card" v-model="activeName" stretch>
        <el-tab-pane label="账号登录" name="account">
          <!-- 插槽实现插入图标 -->
          <template #label>
            <el-icon><User /></el-icon>
            <span class="text">账号登录</span>
          </template>
          <PaneAccount ref="accountRef" />
        </el-tab-pane>

        <el-tab-pane label="手机登录" name="phone">
          <template #label>
            <el-icon><Iphone /></el-icon>
            <span class="text">手机登录</span>
          </template>
          <PanePhone />
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link href="" type="primary">忘记密码</el-link>
    </div>

    <el-button
      class="login-btn"
      type="primary"
      size="large"
      @click="handleLoginBtnClick()"
      >立即登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { localCache } from '@/utils/cache'
import PaneAccount from './pane-account.vue'
import PanePhone from './pane-phone.vue'

import { ref, watch } from 'vue'

// 用于获取登录方式
const activeName = ref<string>('account')

// 获取PaneAccount的实例，作为类型 type PaneAccount =  InstanceType<typeof PaneAccount>，但是PaneAccount不能直接作为类型
const accountRef = ref<InstanceType<typeof PaneAccount>>()
// console.log(isRemPwd.value)


// 是否记住密码
const isRemPwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false)
watch(isRemPwd, (newValue) => {
  localCache.setCache('isRemPwd', newValue)
  // console.log(typeof localCache.getCache('isRemPwd'))  // boolean
})
function handleLoginBtnClick() {
  if (activeName.value === 'account') {
    console.log('账号登录')
    accountRef.value?.loginAction(isRemPwd.value)
  } else {
    console.log('手机登录')
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  // border: 1px solid black;
  width: 330px;
  margin-bottom: 150px;
  .title {
    text-align: center;
    margin-bottom: 15px;
  }
  .label {
    // display: flex;
    // align-items: center;
    // justify-content: center;
    .text {
      margin-left: 10px;
    }
  }
  .controls {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    margin-top: 10px;
    width: 100%;
    --el-button-size: 42px;
  }
}
</style>
