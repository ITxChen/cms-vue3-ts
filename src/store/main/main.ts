import {
  getEntireDepartments,
  getEntireMenus,
  getEntireRoles
} from '@/service/main/main'
import { defineStore } from 'pinia'
interface IMainState {
  entireRoles: any[]
  entireDeparments: any[]
  entireMenus: any[]
}
const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: [],
    entireDeparments: [],
    entireMenus: []
  }),
  //   获取角色和部门
  actions: {
    async fetchEntireDataAction() {
      const rolesResult = await getEntireRoles()
      const departmentResult = await getEntireDepartments()
      const entireMenus = await getEntireMenus()
      this.entireRoles = rolesResult.data.data.list
      this.entireDeparments = departmentResult.data.data.list
      this.entireMenus = entireMenus.data.data.list
    }
  }
})

export default useMainStore
