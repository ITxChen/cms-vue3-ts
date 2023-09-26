<template>
  <div class="main-menu">
    <div class="logo">
      <img src="@/assets/img/Mainlogo.ico" alt="" class="img" />
      <h2 class="title" v-show="!isFold">后台管理系统</h2>
    </div>
    <div class="menu">
      <!--
        default-active 用于默认活跃状态的组件
        :collapse="false"  是否是折叠状态
      -->
      <el-menu
        :collapse="isFold"
        :default-active="defaultActive"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
      >
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="String(item.id)">
            <template #title>
              <!-- 动态组件设置图标 -->
              <el-icon>
                <component :is="(item.icon || '').split('-icon-')[1]" />
              </el-icon>
              <span> {{ item.name }}</span>
            </template>

            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="String(subitem.id)"
                @click="handleItemClick(subitem)"
              >
                {{ subitem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import userLoginStore from '@/store/login/login'
import { reactive, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { mapPathToMenu } from '@/utils/map-menus'
// 定义props
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})
// 获取动态菜单
const loginStore = userLoginStore()

const userMenus = loginStore.userMenus

// // 处理点击切换页面
const router = useRouter()
function handleItemClick(subitem: any) {
  const url = subitem.url
  router.push(url)
}
// 菜单切换,防止刷新菜单回到第一个
const route = useRoute() // 拿到当前菜单的路径
const defaultActive = computed(() => {
  const pathMenu = mapPathToMenu(route.path, userMenus)
  return pathMenu.id + ''
})
</script>

<style lang="less" scoped>
.main-menu {
  height: 100%;
  background-color: #001529;
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
    .img {
      height: 100%;
      margin: 0 10px;
    }
    .title {
      font-size: 15px;
    }
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}
.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }
  .el-menu-item:hover {
    color: #fff;
    background-color: #0a60bd;
  }
  .el-menu-item.is-active {
    background-color: #0a60bd !important;
  }
}
</style>
