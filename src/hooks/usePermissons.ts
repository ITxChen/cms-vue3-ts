import useLoginStore from '@/store/login/login'

function permissions(permissionsID: string) {
  const loginStore = useLoginStore()
  const { permissions } = loginStore
  // 转为boolean类型
  //   console.log(permissions)
  return !!permissions.find((item) => item.includes(permissionsID))
}
export default permissions
