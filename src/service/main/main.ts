import hyRequest from '..'
export function getEntireRoles() {
  return hyRequest.post({
    url: '/role/list' // 角色信息
  })
}

export function getEntireDepartments() {
  return hyRequest.post({
    url: '/department/list' //部门信息
  })
}
export function getEntireMenus() {
  return hyRequest.post({
    url: '/menu/list'
  })
}
