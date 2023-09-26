const contentConfig = {
  pageName: 'goods',
  header: {
    title: '数据列表',
    btnTitle: '新建类别'
  },
  propsList: [
    { type: 'selection', label: '选择', width: '55px' },
    { type: 'index', label: '序号', width: '60px' },

    {
      type: 'normal',
      label: '商品名称',
      prop: 'desc',
      width: '150px'
    },
    {
      type: 'normal',
      label: '原价格',
      prop: 'oldPrice',
      width: '80px'
    },
    {
      type: 'normal',
      label: '现价格',
      prop: 'newPrice',
      width: '80px'
    },
    {
      type: 'img',
      label: '商品图片',
      prop: 'imgUrl',
      width: '100px'
    },
    {
      type: 'state',
      label: '状态',
      prop: 'status',
      width: '110px'
    },
    {
      type: 'timer',
      label: '创建时间',
      prop: 'createAt',
      width: '200px'
    },
    { type: 'timer', label: '更新时间', prop: 'updateAt', width: '200px' },

    { type: 'oper', label: '操作' }
  ]
}

export default contentConfig
