<template>
  <div class="search">
    <!-- 搜索表单 -->
    <el-form
      label-width="80px"
      :model="searchForm"
      ref="formRef"
      v-if="isQuery"
    >
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                ></el-input>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  range-separator="To"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <!-- 重置和搜索按钮 -->
    <div class="btns">
      <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
      <el-button icon="Search" @click="handleQueryClick">查询</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import permissions from '@/hooks/usePermissons'
// 定义自定义事件/接受的属性
const emit = defineEmits<{
  (e: 'queryClick', data: any)
  (e: 'resetClick')
}>()

interface IProps {
  searchConfig: {
    pageName: string
    formItems: any[]
  }
}
const props = defineProps<IProps>()
const isQuery = permissions(`${props.searchConfig.pageName}:create`)
// 定义form数据
const initialForm: any = {}
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = ''
}
const searchForm = reactive(initialForm)
// 重置操作
const formRef = ref<any>() //拿到表单
function handleResetClick() {
  // 1.form中的数据全部重置
  formRef.value?.resetFields() //重置，需要结点有prop属性
  // 2.将时间传递出去，content内部重新发送请求
  emit('resetClick')
}
// 查询
function handleQueryClick() {
  // 触发自定义事件
  emit('queryClick', searchForm)
  // console.log('searchForm ', searchForm)
}
</script>

<style lang="less">
.search {
  // color: red;
  background-color: #fff;
  padding: 15px;
  .el-form-item {
    padding: 20px;
    margin-bottom: 0;
  }
  .btns {
    text-align: right;
    padding: 0 50px 10px 0;
    .el-button {
      height: 30px;
      width: 70px;
    }
  }
}
</style>
