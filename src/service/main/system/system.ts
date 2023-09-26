import hyRequest from '@/service'

// 用户的网络请求
// 查询
export function postUsersListData(queryInfo: any) {
  return hyRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}
// 删除
export function deleteUserById(id: number) {
  return hyRequest.delete({
    url: `/users/${id}`
  })
}
// 创建用户

export function newUserData(userInfo: any) {
  return hyRequest.post({
    url: '/users',
    data: userInfo
  })
}

// 编辑
export function editUserData(id: number, userInfo: any) {
  return hyRequest.patch({
    url: `/users/${id}`,
    data: userInfo
  })
}

// 针对页面的动态网络请求：增删改查
export function postPageListData(pagename: string, queryInfo: any) {
  return hyRequest.post({
    url: `/${pagename}/list`,
    data: queryInfo
  })
}

export function deletePageById(pagename: string, id: number) {
  return hyRequest.delete({
    url: `/${pagename}/${id}`
  })
}

export function newPageData(pagename: string, pageInfo: any) {
  return hyRequest.post({
    url: `/${pagename}`,
    data: pageInfo
  })
}

export function editPageData(pagename: string, id: number, userInfo: any) {
  return hyRequest.patch({
    url: `/${pagename}/${id}`,
    data: userInfo
  })
}
