import { defineStore } from 'pinia'
import router from '@/router'
import { accountLoginRequest } from '../../service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { mapMenuListToPermissions, mapMenusToRoutes } from '@/utils/map-menus'
import { LOGIN_TOKEN } from '@/global/constants'
import { getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import useMainStore from '../main/main'
import useAnalysisStore from '../main/analysis/analysis'
interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
  permissions: string[]
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    // 保存token
    token: '',
    // 保存用户信息
    userInfo: {},
    userMenus: [],
    permissions: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.获取输入账号密码后返回的信息
      const loginRes = await accountLoginRequest(account)
      const loginResData = loginRes.data

      //1.存放在pinia中
      const id = loginResData.data.id
      this.token = loginResData.data.token
      const name = loginResData.data.name
      // console.log(this.token)
      localCache.setCache(LOGIN_TOKEN, this.token)
      // 2.获取用户登录的详细信息
      const userInfoResult = await getUserInfoById(id)
      this.userInfo = userInfoResult.data

      // 3.根据角色请求用户的权限,用于展示不同菜单
      const userMenusResult = await getUserMenusByRoleId(
        this.userInfo.data.role.id
      )
      this.userMenus = userMenusResult.data

      // 4.进行本地缓存
      localCache.setCache('userInfo', this.userInfo)
      localCache.setCache('userMenus', this.userMenus.data)

      //请求所有的roles、deparments数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      //重要 ：获取登录用户的所有按钮的权限
      const permissions = mapMenuListToPermissions(this.userMenus)
      this.permissions = permissions

      // 5. 重要动态 添加路由
      const routes = mapMenusToRoutes(Object.values(this.userMenus.data))
      routes.forEach((route) => router.addRoute('main', route))

      // 6.页面跳转（首页面）
      await router.replace('/main/analysis/overview')
      // 刷新页面,存在bug，不刷新一次页面，组件无法渲染
      location.reload()
    },
    loadLocalCacheAction() {
      // 用户刷新时
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus
        //请求所有的roles、deparments数据
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()
        //重要 ：获取登录用户的所有按钮的权限
        const permissions = mapMenuListToPermissions(this.userMenus)
        this.permissions = permissions
        // 动态添加路由
        const routes = mapMenusToRoutes(this.userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
