<template>
  <div class="department">
    <PageSearch
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <PageContent
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    >
      <template #ceshi="scope">
        <span class="cop"> 高阶测试 </span>
      </template>
    </PageContent>
    <!-- <PageContent
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    /> -->
    <PageModal ref="modalRef" :modal-config="modalConfigRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import { ref, computed } from 'vue'
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
// import PageContent from './c-cpns/page-content.vue'
import PageModal from '@/components/page-model/page-modal.vue'

// import PageModal from './c-cpns/page-modal.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/model.config'
import useMainStore from '@/store/main/main'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
// 对modalConfig操作：
const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const departments = mainStore.entireDeparments.map((item) => {
    return { label: item.name, value: item.id }
  })
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options?.push(...departments)
      // console.log(departments)
    }
  })
  return modalConfig
})
// console.log(modalConfig)
// 点击search后，content操作
// 查询/重置
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
// 新建/编辑
const { modalRef, handleEditClick, handleNewClick } = usePageModal()
</script>

<style scoped>
.cop {
  color: aqua;
}
</style>
