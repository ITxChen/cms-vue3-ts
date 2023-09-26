<template>
  <div class="role">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <PageContent
      :content-config="contentConfig"
      ref="contentRef"
      @edit-click="handleEditClick"
      @new-click="handleNewClick"
    >
      <template #ceshi="scope">
        <span class="cop"> 高阶测试2 </span>
      </template>
    </PageContent>
    <PageModal :modal-config="modalConfig" ref="modalRef"> </PageModal>
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-model/page-modal.vue'
import modalConfig from './config/model.config'
import contentConfig from './config/content.config'
import searchConfig from './config/search.config'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
// 点击search后，content操作
// 查询/重置
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
// 新建/编辑
const { modalRef, handleEditClick, handleNewClick } = usePageModal()
</script>

<style lang="less">
.role {
  color: red;
}
</style>
