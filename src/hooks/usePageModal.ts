import { ref } from 'vue'
import type PageModal from '@/components/page-model/page-modal.vue'
type EditFnType = (data?: any) => void
function usePageModal(newCallback?: EditFnType, editCallback?: EditFnType) {
  const modalRef = ref<InstanceType<typeof PageModal>>()
  function handleNewClick() {
    modalRef.value?.setModelVisible()
    if (newCallback) newCallback()
  }
  // 编辑
  function handleEditClick(itemData: any) {
    modalRef.value?.setModelVisible(false, itemData)
    if (editCallback) editCallback(itemData)
  }

  return {
    modalRef,
    handleNewClick,
    handleEditClick
  }
}
export default usePageModal
