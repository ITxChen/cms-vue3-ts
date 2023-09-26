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
    <PageModal
      :modal-config="modalConfig"
      :other-info="otherInfo"
      ref="modalRef"
    >
      <template #subtree>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          node-key="id"
          show-checkbox
          highlight-current
          :props="{ children: 'children', label: 'name' }"
          @check="handleELTreeCheck"
        />
      </template>
    </PageModal>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-model/page-modal.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
import useMainStore from '@/store/main/main'
import { storeToRefs } from 'pinia'
import { ElTree } from 'element-plus'
import { mapMenuListToIds } from '@/utils/map-menus'
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleEditClick, handleNewClick } = usePageModal(
  newCallback,
  editCallback
)

const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)
const otherInfo = ref({})
function handleELTreeCheck(data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  console.log(data2.halfCheckedKeys)
  otherInfo.value = { menuList }
}

const treeRef = ref<InstanceType<typeof ElTree>>()
function newCallback() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}
function editCallback(itemData: any) {
  // menuList 中存在着对应节点的id
  // console.log('点击的编辑：', { ...itemData.menuList })
  // setCheckKeys 为elp中tree组件的一个函数，用于设置节点
  nextTick(() => {
    const menuId = mapMenuListToIds(itemData.menuList)
    // console.log(menuId)
    treeRef.value?.setCheckedKeys(menuId)
  })
}
</script>

<style lang="less">
.role {
  color: red;
}
</style>
