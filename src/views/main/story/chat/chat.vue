<template>
  <div class="content">
    <div class="el-btn">
      <el-button type="primary" @click="handleEditClick"> 提交</el-button>
      <el-button type="primary " @click="handleResetClick">重置</el-button>>
    </div>
    <div class="el-text">
      <el-input
        placeholder="请输入标题"
        v-model="title"
        ref="titleRef"
      ></el-input>
    </div>
    <div style="border: 1px solid #ccc" class="edit">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { reactive, computed } from 'vue'
import useStoryStore from '@/store/main/story/story'
import { h } from 'vue'
import { ElMessage } from 'element-plus'
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const mode = ref()
// 内容 HTML
const valueHtml = ref('')

// 模拟 ajax 异步获取内容
// onMounted(() => {
//   setTimeout(() => {
//     valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
//   }, 1500)
// })

const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }
// 重置
const title = ref('')
const titleRef = ref()

function handleResetClick() {
  title.value = ''
  valueHtml.value = ''
}
// 发送内容
const storyStore = useStoryStore()
const allData = computed(() => {
  return {
    title: title.value,
    content: valueHtml.value.replace(/<[^>]+>/g, '')
  }
})

function handleEditClick() {
  // 内容不为空 才允许发送

  if (allData.value.title != '' && allData.value.content != '') {
    storyStore.postStoryDateAction(allData.value)
    if (storyStore.code === 0) {
      // 清空
      handleResetClick()
      ElMessage({
        message: h('p', null, [
          h('span', null, '提交成功 '),
          h('i', { style: 'color: teal' })
        ])
      })
    }
  } else {
    ElMessage('提交失败，请注意是否有非法字符或内容为空')
  }

  // if (code.data.code = 0) {
  // }
}
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
</script>

<style less scoped>
.content {
  background-color: white;
  width: 100%;
  height: 100%;
  padding: 10px;
  .el-btn {
    margin: 10px;
  }
  .el-text {
    margin-bottom: 10px;
    margin-left: 10px;
  }
  .edit {
    margin-bottom: 10px;
    margin-left: 10px;
  }
}
</style>
