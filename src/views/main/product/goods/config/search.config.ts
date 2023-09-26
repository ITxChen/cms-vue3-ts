const searchConfig = {
  pageName: 'goods',
  formItems: [
    {
      type: 'input',
      label: '商品名称',
      prop: 'name',
      width: '150px',
      placeholder: '请输入查询的商品名称'
    },
    {
      type: 'input',
      label: '现价格',
      prop: 'newPrice',
      width: '80px',
      placeholder: '请输入查询的现价格'
    },
    {
      type: 'input',
      label: '原价格',
      prop: 'oldPrice',
      width: '80px',
      placeholder: '请输入查询的原价格'
    },
    {
      type: 'date-picker',
      label: '创建时间',
      prop: 'createAt',
      width: '200px'
    }
  ]
}

export default searchConfig
