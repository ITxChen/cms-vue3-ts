const contentConfig = {
  pageName: 'department',
  header: {
    title: '数据列表',
    btnTitle: '新建部门'
  },
  propsList: [
    { type: 'selection', label: '选择', width: '55px' },
    { type: 'index', label: '序号', width: '150px' },

    { type: 'normal', label: '部门名称', prop: 'name', width: '100px' },
    { type: 'normal', label: '部门领导', prop: 'leader', width: '100px' },
    { type: 'normal', label: '上级部门', prop: 'parentId', width: '130px' },

    { type: 'timer', label: '创建时间', prop: 'createAt', width: '230px' },
    { type: 'timer', label: '更新时间', prop: 'updateAt', width: '230px' },

    { type: 'oper', label: '操作', width: '250px' },
    { type: 'ceshi', label: '测试', slotName: 'ceshi' }
  ]
}

export default contentConfig
