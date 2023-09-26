<template>
  <div class="model">
    <el-dialog
      v-model="dialogVisible"
      :title="
        isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle
      "
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px">
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                ></el-input>
              </template>

              <template v-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="items in item.options" :key="item.id">
                    <el-option
                      :label="items.label"
                      :value="items.value"
                    ></el-option>
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
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
// 0.定义prop
interface IProps {
  modalConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
  otherInfo?: any
}
const props = defineProps<IProps>()
const initialData: any = {}
for (const item of props.modalConfig.formItems) {
  initialData[item.prop] = item.initialValue ?? ''
}
// 1.表单数据
const formData = reactive<any>(initialData)
const isNewRef = ref(true)
const editData = ref() // 保存编辑行的数据
// 2.定义设置dialogVisible 的方法
function setModelVisible(isNew: boolean = true, itemData?: any) {
  dialogVisible.value = true // true显示
  isNewRef.value = isNew
  // console.log(itemData)
  if (!isNew && itemData) {
    // 编辑数据
    for (const key in formData) {
      // 当点击编辑时，表单内容需要回显
      formData[key] = itemData[key]
    }
    editData.value = itemData
    // console.log(editData.value)
  } else {
    // 新建数据，不需要回显
    for (const key in formData) {
      const item = props.modalConfig.formItems.find(
        (item: any) => item.prop === key
      )
      formData[key] = item ? item.initialValue : ''
    }
    editData.value = null
  }
}
// 3.获取roles(角色)/deparments（部门）
// const { entireRoles, entireDeparments } = storeToRefs(mainStore)
// 4.新建用户/编辑用户，点击确定
function handleConfirm() {
  dialogVisible.value = false
  // 最终的数据
  let infoData = { ...formData }
  // 判断props中的otherInfo是否有值
  if (props.otherInfo) {
    infoData = { ...infoData, ...props.otherInfo }
    // console.log(infoData)
  }
  // 将表单数据发送给store，进行网络请求
  if (!isNewRef.value && editData.value) {
    // 编辑
    systemStore.editPageDataAction(
      props.modalConfig.pageName,
      editData.value.id,
      infoData
    )
  } else {
    // 新建用户
    systemStore.newPageDataAction(props.modalConfig.pageName, infoData)
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
