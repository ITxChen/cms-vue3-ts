const contentConfig = {
  pageName: 'menu',
  header: {
    title: '菜单列表',
    btnTitle: '新建菜单'
  },
  propsList: [
    { label: '菜单名称', prop: 'name', width: '150px' },
    { label: '级别', prop: 'type', width: '60px' },
    { label: '菜单url', prop: 'url', width: '130px' },
    { label: '菜单icon', prop: 'icon', width: '130px' },
    { label: '排序', prop: 'sort', width: '80px' },
    { label: '权限', prop: 'permission', width: '80px' },

    { type: 'timer', label: '创建时间', prop: 'createAt', width: '180px' },
    { type: 'timer', label: '更新时间', prop: 'updateAt', width: '180px' },

    { type: 'oper', label: '操作' }
  ]
}
export default contentConfig
