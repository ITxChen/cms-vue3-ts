const modalConfig = {
  pageName: 'menu',
  header: {
    newTitle: '新建角色',
    editTitle: '编辑角色'
  },
  formItems: [
    {
      type: 'input',
      label: '菜单名称',
      prop: 'name',
      placeholder: '请输入菜单名称'
    },
    { type: 'input', label: '级别', prop: 'type', placeholder: '请输入级别' },
    {
      type: 'input',
      label: '菜单url',
      prop: 'url',
      placeholder: '请输入菜单url'
    },
    {
      type: 'input',
      label: '菜单icon',
      prop: 'icon',
      placeholder: '请输入图标'
    },
    { type: 'input', label: '排序', prop: 'sort', placeholder: '请输入排序' },
    {
      type: 'input',
      label: '权限',
      prop: 'permission',
      placeholder: '请输入权限'
    }
  ]
}
export default modalConfig
