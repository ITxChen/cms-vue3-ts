<template>
  <div class="department">
    <PageSearch
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <PageContent
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    />
    <PageModal ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import { ref } from 'vue'
import PageSearch from './c-cpns/page-search.vue'
import PageContent from './c-cpns/page-content.vue'
import PageModal from './c-cpns/page-modal.vue'
// 点击search后，content操作
const contentRef = ref<InstanceType<typeof PageContent>>()
// 查询
function handleQueryClick(queryInfo: any) {
  contentRef.value?.fetchPageListData(queryInfo)
  // console.log(queryInfo)
}
// 重置
function handleResetClick() {
  contentRef.value?.fetchPageListData()
}
// 新建
const modalRef = ref<InstanceType<typeof PageModal>>()
function handleNewClick() {
  modalRef.value?.setModelVisible()
}
// 编辑
function handleEditClick(itemData: any) {
  modalRef.value?.setModelVisible(false, itemData)
}
</script>

<style scoped></style>
