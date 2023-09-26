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

          <el-form-item label="部门领导" prop="name">
            <el-input v-model="formData.leader" placeholder="请输入部门领导">
            </el-input>
          </el-form-item>

          <el-form-item label="上级部门" prop="roleId">
            <el-select
              v-model="formData.parentId"
              placeholder="请选择上级部门"
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
  leader: '',
  parentId: ''
})
const isNewRef = ref(true)
const editData = ref() // 保存编辑行的数据
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
    editData.value = null
    for (const key in formData) {
      formData[key] = ''
    }
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
    systemStore.editPageDataAction('department', editData.value.id, formData)
  } else {
    // 新建用户
    systemStore.newPageDataAction('department', formData)
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
