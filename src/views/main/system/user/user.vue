<template>
  <div class="user">
    <UserSearch
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <UserContent
      ref="contentRef"
      @new-click="handleNewBtnClick"
      @edit-click="handleEditBtnClick"
    />
    <UserModel ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UserSearch from './c-cpns/user-search.vue'
import UserContent from './c-cpns/user-content.vue'
import UserModel from './c-cpns/user-modal.vue'
import UserModal from './c-cpns/user-modal.vue'

// 1.对content组件的操作
const contentRef = ref<InstanceType<typeof UserContent>>()
// 查询
function handleQueryClick(formData: any) {
  // console.log('formData:', formData)
  // 父组件中直接调用子组件的函数
  contentRef.value?.fetchUserListData(formData)
}
// 重置
function handleResetClick() {
  contentRef.value?.fetchUserListData()
}

// 2.对model组件的操作
const modalRef = ref<InstanceType<typeof UserModal>>()
// 新增用户
function handleNewBtnClick() {
  modalRef.value?.setModelVisible()
}
// 编辑
function handleEditBtnClick(itemData: any) {
  // 将model组件显示出来,并接受数据
  modalRef.value?.setModelVisible(false, itemData)
}
</script>

<style lang="less">
.user {
  color: red;
}
</style>
