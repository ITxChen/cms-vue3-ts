const contentConfig = {
  pageName: 'story',
  propsList: [
    { type: 'index', label: '序号', width: '150px' },
    { type: 'normal', label: '故事标题', prop: 'title', width: '200px' },
    { type: 'normal', label: '我的故事', prop: 'content', width: '436px' },
    { type: 'timer', label: '创建时间', prop: 'createAt', width: '230px' },
    { type: 'timer', label: '更新时间', prop: 'updateAt', width: '230px' }
  ]
}
export default contentConfig
