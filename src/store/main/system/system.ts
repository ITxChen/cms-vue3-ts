import { defineStore } from 'pinia'
import {
  deleteUserById,
  postUsersListData,
  newUserData,
  editUserData,
  postPageListData,
  deletePageById,
  newPageData,
  editPageData
} from '@/service/main/system/system'

import { linkSync } from 'fs'
import useMainStore from '../main'

interface ISystemState {
  usersList: any[]
  userstotalCount: number
  pageList: any[]
  pageTotalCount: number
  categoryList: any[]
  storeloading: boolean
}
const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    userstotalCount: 0,
    pageList: [],
    pageTotalCount: 0,
    categoryList: [],
    storeloading: true
  }),
  actions: {
    // 1.请求所有用户列表数据
    async postUsersListAction(queryInfo: any) {
      const userslistResult = await postUsersListData(queryInfo)
      const { totalCount, list } = userslistResult.data.data

      this.userstotalCount = totalCount
      this.usersList = list
      // console.log(this.userstotalCount)
    },
    // 2.删除数据
    async deleteUserByIdAction(id: number) {
      // 发送请求删除数据
      const deleteResult = await deleteUserById(id)
      // 重新请求数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    // 3.新建用户
    async newUserDataAction(userInfo: any) {
      // 创建新用户
      const newResult = await newUserData(userInfo)
      // 重新请求数据
      this.postUsersListAction({ offset: 0, size: 10 })
      // 重新获取数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    // 4.编辑数据
    async editUserDataAction(id: number, userInfo: any) {
      // 更新数据
      const editResult = await editUserData(id, userInfo)
      console.log(editResult)
      //重新请求数据
      this.postUsersListAction({ offset: 0, size: 10 })
      // 重新获取数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },

    // 针对页面的数据，进行增删改查

    // 查
    async postPageListAction(pagename: string, queryInfo: any) {
      const pageListResult = await postPageListData(pagename, queryInfo)
      const { totalCount, list } = pageListResult.data.data

      this.pageList = list
      this.pageTotalCount = totalCount
      // console.log(totalCount, list)
    },
    // 删
    async deletePageByIdAction(pagename: string, id: number) {
      const deleteResult = await deletePageById(pagename, id)
      // console.log(id)
      this.postPageListAction(pagename, { offset: 0, size: 10 })
      // 重新获取数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    // 增
    async newPageDataAction(pagename: string, pageInfo: any) {
      const newResult = await newPageData(pagename, pageInfo)
      this.postPageListAction(pagename, { offset: 0, size: 10 })
      // 重新获取数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    // 改
    async editPageDataAction(pagename: string, id: number, pageInfo: any) {
      const editResult = await editPageData(pagename, id, pageInfo)
      this.postPageListAction(pagename, { offset: 0, size: 10 })
      // 重新获取数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    }
  }
})

export default useSystemStore
