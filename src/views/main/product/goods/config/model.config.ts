const modalConfig = {
  pageName: 'goods',
  header: {
    newTitle: '新建商品',
    editTitle: '编辑商品'
  },
  formItems: [
    {
      type: 'input',
      label: '商品名称',
      prop: 'name',
      placeholder: '请输入商品名称',
      initialValue: ''
    },
    {
      type: 'input',
      label: '原价格',
      prop: 'oldPrice',
      placeholder: '请输入原价格',
      initialValue: ''
    },
    {
      type: 'input',
      label: '新价格',
      prop: 'newPrice',
      placeholder: '请设置价格',
      initialValue: ''
    },
    {
      type: 'input',
      label: '状态',
      prop: 'status',
      placeholder: '请输入状态',
      initialValue: ''
    },
    {
      type: 'input',
      label: '商品图片',
      prop: 'imgUrl',
      placeholder: '请输入图片地址',
      initialValue: ''
    },
    {
      type: 'input',
      label: '库存数量',
      prop: 'inventoryCount',
      placeholder: '请输入库存数量',
      initialValue: ''
    },
    {
      type: 'input',
      label: '销售数量',
      prop: 'saleCount',
      placeholder: '请输入销售数量',
      initialValue: ''
    },
    {
      type: 'input',
      label: '收藏数量',
      prop: 'favorCount',
      placeholder: '请输入收藏数量',
      initialValue: ''
    },
    {
      type: 'input',
      label: '发货地址',
      prop: 'address',
      placeholder: '请输入商品发货地址',
      initialValue: ''
    }
  ]
}
export default modalConfig
