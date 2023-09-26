<template>
  <div class="model">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? ' 新建用户' : '更新用户'"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入用户名">
            </el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="formData.realname" placeholder="请输入真实姓名">
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" v-if="isNewRef">
            <el-input
              v-model="formData.password"
              placeholder="请输入密码"
              show-password
            >
            </el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="cellphone">
            <el-input
              v-model="formData.cellphone"
              placeholder="请输入手机号"
              show-password
            >
            </el-input>
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId">
            <el-select
              v-model="formData.roleId"
              placeholder="请选择角色"
              style="width: 100%"
            >
              <template v-for="item in entireRoles" :key="item.id">
                <el-option :label="item.name" :value="item.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门" prop="departmentId">
            <el-select
              v-model="formData.departmentId"
              placeholder="请选择部门"
              style="width: 100%"
            >
              <template v-for="item in entireDeparments" :key="item.id">
                <el-option :label="item.name" :value="item.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'

const dialogVisible = ref(false)
const mainStore = useMainStore()
const systemStore = useSystemStore()
// 1.表单数据
const formData = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})
const isNewRef = ref(true)
const editData = ref() // 保存编辑行的id
// 2.定义设置dialogVisible 的方法
function setModelVisible(isNew: boolean = true, itemData?: any) {
  dialogVisible.value = true // true显示
  isNewRef.value = isNew
  if (!isNew && itemData) {
    // 编辑数据
    for (const key in formData) {
      // 当点击编辑时，表单内容需要回显
      formData[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    // 新建数据，不需要回显
    for (const key in formData) {
      formData[key] = ''
    }
    editData.value = null
  }
}
// 3.获取roles(角色)/deparments（部门）
const { entireRoles, entireDeparments } = storeToRefs(mainStore)
// 4.新建用户/编辑用户，点击确定
function handleConfirm() {
  dialogVisible.value = false
  // 将表单数据发送给store，进行网络请求
  if (!isNewRef.value && editData.value) {
    // 编辑
    systemStore.editUserDataAction(editData.value.id, formData)
    // console.log(editData.value)
  } else {
    // 新建用户
    systemStore.newUserDataAction(formData)
    console.log(formData)
  }
}
// 暴露的属性和方法
defineExpose({ setModelVisible })
</script>

<style lang="less">
.form {
  padding: 0 20px;
}
</style>
