# vue3-ts-cms

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## npm init vue@latest

## 代码规范

### 1.1 集成 EditorConfig 配置

#### EditorConfig 有助于为不同 IDE 编辑器上处理同一项目的多个开发人员维护同一的编码风格，需要安装该插件

```sh
[*] *表示所有文件通用
charset = utf-8 设置文件字符集
indent_style = space 缩进风格（tab/space）
end_of_line = lf 控制换行类型
trim_trailing_whitespace = true 去除行尾的任意空白字符
inset_final_newline = true 始终在文件末尾插入一个新行

[*.md]
max_line_length = off 每行长度不做限制
trim_trailing_whitespace = false
```

### 1.2prettier 工具

#### Prettier 是一款强大的格式化工具，前段能用到的文件格式都可以搞定，可以让代码有很好的风格

```sh
在设置-ed default format 中选择Prettier作为格式化工具
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 80, // 单行最长字符
  "singleQuote": true, //单引号或双引号
  "semi": false  // 尾部要不要加分号
}
```

### 1.3eslint 代码规范检测

### 2 Css 样式重置

#### npm install normalize.css

### 3.vite 提供的环境变量

1.import.meta.env.MODE :
npm run build 生产环境：production
开发环境：development
2.import.meta.env.DEV //是否是开发环境
3.import.meta.env.PROD //是否是生产环境
4.import.meta.env.SSR // 是否是 ssr 服务端渲染

### 4.Element-plus 的使用：

1.全局注册：
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus) 2.按需引入：
首先你需要安装 unplugin-vue-components 和 unplugin-auto-import 这两款插件
npm install -D unplugin-vue-components unplugin-auto-import
然后把下列代码插入到你的 Vite 或 Webpack 的配置文件中
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
plugins: [
// ...
AutoImport({
resolvers: [ElementPlusResolver()],
}),
Components({
resolvers: [ElementPlusResolver()],
}),
], 3.图标的使用：
1.npm install @element-plus/icons-vue 2.将注册图标的代码抽离到了 global 下的 register-icons 中

### 5.知识点：

1.vue 中拿一个组件的实例作为类型：InstanceType `<typeofPaneAccount>`
2.自动化工具生成页面和路由：coderwhy add3page_setup department -d src/views/main/system/department
