<template>
  <div class="content">
    <div class="header">
      <h3 class="title">部门列表</h3>
      <el-button type="primary" @click="handleNewUserClick">新建部门</el-button>
    </div>
    <div class="table">
      <ul>
        <el-table :data="pageList" style="width: 100%" border>
          <el-table-column type="selection"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="55px"
            align="center"
          ></el-table-column>
          <el-table-column
            label="部门名称"
            prop="name"
            width="100px"
            align="center"
          ></el-table-column>
          <el-table-column
            label="部门领导"
            prop="leader"
            width="100px"
            align="center"
          ></el-table-column>
          <el-table-column
            label="上级部门"
            prop="parentId"
            width="130px"
            align="center"
          ></el-table-column>
          <el-table-column
            label="创建时间"
            prop="createAt"
            width="250px"
            align="center"
          >
            <template #default="scope">
              {{ formatUTC(scope.row.createAt) }}
            </template>
          </el-table-column>
          <el-table-column
            label="更新时间"
            prop="updateAt"
            width="250px"
            align="center"
          >
            <template #default="scope">
              {{ formatUTC(scope.row.updataAt) }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template #default="scope">
              <!-- 删除操作需要拿到对应数据 的id，因此可以通过作用域插槽拿到id -->
              <!-- scope是在父组件中通过v-slot指令传递给子组件的对象。这个对象包含了父组件中当前渲染的数据行的一些信息，例如scope.row表示当前行的数据。 -->
              <el-button
                type="primary"
                icon="Edit"
                text
                @click="handleEditBtnClick(scope.row)"
                >编辑</el-button
              >
              <el-button
                type="danger"
                icon="Delete"
                text
                @click="handleDeleteBtnClick(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </ul>
    </div>
    <div class="max">
      <el-dialog v-model="dialogVisible" title="Warning" width="30%" center>
        <span class="text">确定删除用户吗？</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="handleNo">取消</el-button>
            <el-button type="primary" @click="handleYes"> 确定 </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        :small="small"
        layout="total, sizes, prev, pager, next, jumper,"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia' // 响应式，防止异步第一次获取不到数据（也可以用computed）
import useSystemStore from '@/store/main/system/system'
import { formatUTC } from '@/utils/format'
// 定义事件
const emit = defineEmits<{
  (e: 'newClick')
  (e: 'editClick', data: any)
}>()

// 1.从Usestore拿到数据
const systemStore = useSystemStore()

// 2.设置分页中页面大小和当前的页数
const currentPage = ref(1) // 当前页数
const pageSize = ref(10) // 当前页大小
const small = ref(true)
fetchPageListData() // 第一次请求数据并分页
// 3.获取pagelist数据
const { pageList, pageTotalCount } = storeToRefs(systemStore)
// 4.处理分页的函数
function handleSizeChange() {
  fetchPageListData()
  console.log('pageSize', pageSize.value)
}
function handleCurrentChange() {
  fetchPageListData()
  console.log('currentPage', currentPage.value)
}
// 5.获取当前页数据的函数，并携带数据发送网络请求
function fetchPageListData(formData: any = {}) {
  // 1.获取offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  // 请求
  const pageInfo = { size, offset }
  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postPageListAction('department', queryInfo)
}
// 6. 删除操作
const dialogVisible = ref(false)
let Did: number
// 弹出框取消删除
function handleNo() {
  dialogVisible.value = false
}
// 弹出框确定删除
function handleYes(id: number) {
  systemStore.deletePageByIdAction('department', Did)
  dialogVisible.value = false
}
function handleDeleteBtnClick(id: number) {
  dialogVisible.value = true
  // console.log(id)
  Did = id
}
//  7. 新建用户
function handleNewUserClick() {
  emit('newClick')
}
// 8.编辑按钮
function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
}
// 将函数暴露出去
defineExpose({ fetchPageListData })
</script>

<style lang="less">
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 10px;
    .title {
      font-size: 18px;
    }
  }
  .table {
    :deep(.el-table_cell) {
      padding: 12px 0;
    }
    .el-button {
      margin-left: 0;
    }
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
  .max {
    // display: flex;
    // justify-content: center;
    .text {
      margin-left: 35%;
    }
  }
}
</style>
