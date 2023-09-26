import type { userMenus } from '@/global/constants'
import router from '@/router'
import type { RouteRecordRaw } from 'vue-router'
// 映射函数

// 本地加载
function loadLocalRoutes() {
  //1.动态获取所有的路由对象，放到数组中
  //*.路由对象都在独立的文件中
  //*.从文件中将所有路由对象先读取到数组中

  //*.存放对象的数组
  const localRoutes: RouteRecordRaw[] = []
  //*.读取所有的路由
  const files: Record<string, any> = import.meta.glob(
    '../router/main/**/*.ts',
    {
      eager: true // 马上把结果读取到
    }
  )
  for (const key in files) {
    const module: any = files[key]
    // 保存所有的路由对象
    localRoutes.push(module.default)
  }
  return localRoutes
}

// export let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]) {
  // 1.加载本地路由
  const localRoutes = loadLocalRoutes()

  // 根据菜单去匹配正确的路由
  const routes: RouteRecordRaw[] = []

  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        // 点击跳转到每个的第一个菜单(给route的顶层菜单添加重定向，但只需要添加一次)
        if (!routes.find((item) => item.path === menu.path)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        routes.push(route)
      }
    }
  }
  return routes
}
// 拿对应菜单的id，以便切换菜单
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
}

interface IBreadcrumbs {
  name: string
  path?: string
}
// 面包屑
export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  // 定义面包屑
  const breadcrumbs: any[] = []
  // 遍历获取面包屑层级
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        // 顶层菜单
        breadcrumbs.push({ name: menu.name, path: menu.url })
        // 次级菜单
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}

// 菜单映射到id的列表：给个菜单只把id拿出来
export function mapMenuListToIds(menuList: any[]) {
  //递归
  const ids: number[] = []
  function recurseGetId(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        recurseGetId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }
  recurseGetId(menuList)
  return ids
}

/*
从菜单映射到数组的权限
menuList：菜单的列表
*/
export function mapMenuListToPermissions(menuList: any[]) {
  const permission: string[] = []
  const menuLists = Object.values(menuList)
  function recurseGetPermissions(menus: any[]) {
    for (const item of menus) {
      if (item.type === 3) {
        permission.push(item.permission)
      } else {
        recurseGetPermissions(item.children ?? [])
      }
    }
  }
  recurseGetPermissions(menuLists)
  // console.log('Object.entries', Object.values (menuList))
  return permission
}
