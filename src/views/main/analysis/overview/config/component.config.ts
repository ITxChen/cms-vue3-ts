const overComConfig = {
  dataTable: [
    {
      date: '组件的文件',
      version: '统一小写, 多个单词使用-分割'
    },
    {
      date: '组件的目录结构',
      version:
        '例如 button 组件:button/src/index.vue, 统一在button/index.ts导出'
    },
    {
      date: '组件导包顺序',
      version:
        '导vue技术栈的包 , 导第三方的工具函数 , 导本地的组件, 导本地的工具函数'
    },
    {
      date: '组件的名称',
      version: '统一大写开头，驼峰命名'
    },
    {
      date: '组件属性顺序',
      version: 'name, components, props, emits, setup ...'
    },
    {
      date: 'template标签',
      version: '小写加 - ( 例如：<case-panel/> )'
    },
    {
      date: 'template标签属性顺序',
      version: 'v-if , v-for , ref, class, style, ... ,事件'
    },
    {
      date: '组件的props',
      version: '小写开头，驼峰命名，必须编写类型默认值'
    },
    {
      date: '组件的样式',
      version:
        '作用域:scoped, lang = scss / less ; 类名：统一小写, 多个单词使用-分割'
    }
  ]
}
export default overComConfig
