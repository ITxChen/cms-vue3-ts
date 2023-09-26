<template>
  <div class="search">
    <!-- 搜索表单 -->
    <el-form label-width="80px" :model="searchForm" ref="formRef">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input
              v-model="searchForm.name"
              placeholder="请输入查询的用户名"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input
              placeholder="请输入查询的真实姓名"
              v-model="searchForm.realname"
            >
            </el-input> </el-form-item
        ></el-col>

        <el-col :span="8">
          <el-form-item label="电话号码" prop="cellphone">
            <el-input
              placeholder="请输入查询的手机号码"
              v-model="searchForm.cellphone"
            ></el-input> </el-form-item
        ></el-col>

        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select
              placeholder="请选择查询的状态"
              style="width: 100%"
              v-model="searchForm.enable"
            >
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              v-model="searchForm.createAt"
              type="daterange"
              range-separator="To"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
        </el-col>
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
// import { ElForm } from 'element-plus'
// 定义自定义事件
type searchFormType = {
  name?: string
  realname?: string
  cellphone?: string
  enable?: number
  createAt?: any
}
const emit = defineEmits<{
  (e: 'queryClick', data: searchFormType)
  (e: 'resetClick')
}>()
// 定义form数据
const searchForm = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: 1,
  createAt: ''
})
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
