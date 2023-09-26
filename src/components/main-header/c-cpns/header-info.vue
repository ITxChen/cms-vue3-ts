<template>
  <div class="header-info">
    <div class="operation">
      <span>
        <el-icon><Message /></el-icon>
      </span>
      <span>
        <span class="dot"></span>
        <el-icon><ChatDotRound /></el-icon>
      </span>
      <span>
        <el-icon><Search /></el-icon>
      </span>
    </div>

    <!-- 个人信息 -->
    <div class="info">
      <el-dropdown>
        <span class="user-info">
          <el-avatar :size="30" src="src\assets\img\avater.jpg" />
          <span class="name">{{username}}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-icon><CircleClose /></el-icon>
              <span @click="handleExitClick">退出系统</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><Coin /></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><Unlock /></el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { LOGIN_TOKEN, userMenus } from '@/global/constants'
import { localCache } from '@/utils/cache'
// 获取用户名
const username = localCache.getCache('name')
// 退出系统
const router = useRouter()
function handleExitClick() {
  localCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
}
</script>

<style lang="less" scoped>
.header-info {
  //   color: red;
  display: flex;
  align-items: center;
  .operation {
    display: inline-flex;
    margin-right: 20px;
    span {
      position: relative;
      display: flex;
      align-items: center; //垂直居中
      justify-content: center;
      width: 40px;
      height: 35px;

      &:hover {
        background: #f2f2f2;
      }
      i {
        font-size: 20px;
      }

      .dot {
        position: absolute;
        top: 3px;
        right: 3px;
        z-index: 10;
        width: 6px;
        height: 6px;
        background: red;
        border-radius: 100%;
      }
    }
  }
}
.info {
  .user-info {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  span {
    outline: none;
  }
  .name {
    margin-left: 5px;
  }
}
.info {
  :global(.el-dropdown-menu__item) {
    line-height: 20px !important;
    padding: 6px 22px;
  }
}
</style>
