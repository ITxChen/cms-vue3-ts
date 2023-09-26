<template>
  <div class="content">
    <div class="header">
      <h3 class="title">{{ contentConfig?.header?.title ?? '数据列表' }}</h3>
      <el-button v-if="isCreate" type="primary" @click="handleNewUserClick">
        {{ contentConfig?.header?.btnTitle ?? '新建部门' }}
      </el-button>
    </div>
    <div class="table">
      <ul>
        <el-table
          :data="pageList"
          style="width: 100%"
          border
          row-key="id"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
          <template v-for="item in contentConfig.propsList" :key="item.prop">
            <template v-if="item.type === 'timer'">
              <el-table-column v-bind="item">
                <template #default="scope">
                  {{ formatUTC(scope.row[item.prop]) }}
                </template>
              </el-table-column>
            </template>
            <template v-else-if="item.type === 'oper'">
              <el-table-column
                align="center"
                v-bind="item"
                v-if="isUpdate || isDelete"
              >
                <template #default="scope">
                  <!-- 删除操作需要拿到对应数据 的id，因此可以通过作用域插槽拿到id -->
                  <!-- scope是在父组件中通过v-slot指令传递给子组件的对象。这个对象包含了父组件中当前渲染的数据行的一些信息，例如scope.row表示当前行的数据。 -->
                  <el-button
                    v-if="isUpdate"
                    type="primary"
                    icon="Edit"
                    text
                    @click="handleEditBtnClick(scope.row)"
                    >编辑</el-button
                  >
                  <el-button
                    v-if="isDelete"
                    type="danger"
                    icon="Delete"
                    text
                    @click="handleDeleteBtnClick(scope.row.id)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </template>
            <template v-else-if="item.type === 'ceshi'">
              <el-table-column align="center" v-bind="item">
                <template #default="scope">
                  <slot :name="item.slotName" v-bind="scope"></slot>
                </template>
              </el-table-column>
            </template>
            <template v-else-if="item.type === 'selection'">
              <el-table-column align="center" v-bind="item"></el-table-column
            ></template>
            <template v-else-if="item.type === 'index'">
              <el-table-column align="center" v-bind="item"></el-table-column>
            </template>
            <template v-else-if="item.type === 'state'">
              <el-table-column align="center" v-bind="item">
                <template #default="scope">
                  <el-button
                    size="small"
                    :type="scope.row.enable ? 'primary' : 'danger'"
                    plain
                  >
                    {{ scope.row.status ? '启用' : '禁用' }}
                  </el-button>
                </template>
              </el-table-column>
            </template>
            <template v-else-if="item.type === 'img'">
              <el-table-column align="center" v-bind="item">
                <img
                  src="http://s11.mogucdn.com/mlcdn/55cf19/180831_3lccd4912aec0lb8fga9ji7ah6bkd_640x960.jpg_560x999.jpg"
                  style="width: 80px; height: 80px"
                />
              </el-table-column>
            </template>
            <template v-else>
              <el-table-column
                align="center"
                v-bind="item"
                show-overflow-tooltip="true"
              ></el-table-column>
            </template>
          </template>
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
import { ref, nextTick } from 'vue'
import { storeToRefs } from 'pinia' // 响应式，防止异步第一次获取不到数据（也可以用computed）
import { ElLoading } from 'element-plus'
import useSystemStore from '@/store/main/system/system'
import { formatUTC } from '@/utils/format'
import permissions from '@/hooks/usePermissons'
ElLoading.service({})
const loadingInstance = ElLoading.service({})
nextTick(() => {
  // Loading should be closed asynchronously
  loadingInstance.close()
})
interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title: string
      btnTitle: string
    }
    propsList: any[]
  }
}
const props = defineProps<IProps>()

// const props = defineProps<IProps>()
// console.log(props) // 定义事件
const emit = defineEmits<{
  (e: 'newClick')
  (e: 'editClick', data: any)
}>()
//  0. 判断是否有增删改查的权限
const isCreate = permissions(`${props.contentConfig.pageName}:create`)
const isDelete = permissions(`${props.contentConfig.pageName}:delete`)
const isUpdate = permissions(`${props.contentConfig.pageName}:update`)
const isQuery = permissions(`${props.contentConfig.pageName}:query`)
// 1.从Usestore拿到数据
const systemStore = useSystemStore()

// 2.设置分页中页面大小和当前的页数
const currentPage = ref(1) // 当前页数
const pageSize = ref(10) // 当前页大小
const small = ref(true)
fetchPageListData() // 第一次请求数据并分页
// 3.获取pagelist数据
const { pageList, pageTotalCount, storeloading } = storeToRefs(systemStore)
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
  if (!isQuery) return
  // 1.获取offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  // 请求
  const pageInfo = { size, offset }
  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postPageListAction(props.contentConfig.pageName, queryInfo)
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
  systemStore.deletePageByIdAction(props.contentConfig.pageName, Did)
  dialogVisible.value = false
  console.log(props.contentConfig.pageName, Did)
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
  // console.log(itemData)
}

// 9.监听systemStore中的action,在action执行成功之后在执行curr.v = 1的操作
systemStore.$onAction(({ name, after }) => {
  after(() => {
    if (
      name === 'deletePageByIdAction' ||
      'newPageDataAction' ||
      'editPageDataAction'
    ) {
      currentPage.value = 1
    }
  })
})
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
      color: red;
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
