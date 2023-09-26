import hyRequest from '../index'

// 用户获取登录后返回的id/token/bame
export function accountLoginRequest(account: any) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}
// 此接口用于获取用户的权限信息，且必须携带token
export function getUserInfoById(id: number) {
  return hyRequest.get({
    url: `/users/${id}`
  })
}

// 此接口用于获取角色的对应菜单
export function getUserMenusByRoleId(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`
  })
}
