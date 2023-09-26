<template>
  <div class="content">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>关于</span>
        </div>
      </template>
      <div class="item">
        该项目是基于 Vue3、VueRouter、Pinia、Vite、 ElementPlus
        、TypeScript、Echart5 等后台系统解决方案。
      </div>
    </el-card>
  </div>
  <div class="content">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>关于</span>
        </div>
      </template>
      <div class="text">
        <ul>
          <li>开发工具 : <span class="spa">Visual Studio Code</span></li>
        </ul>
        <ul>
          <li>编程语言 : <span class="spa">TypeScript 4.x</span></li>
        </ul>
        <ul>
          <li>构建工具 : <span class="spa">Vite 4.x</span></li>
        </ul>
        <ul>
          <li>前端框架 : <span class="spa">Vue 3.x</span></li>
        </ul>
        <ul>
          <li>路由工具 : <span class="spa">Vue Router 4.x</span></li>
        </ul>
        <ul>
          <li>状态管理 : <span class="spa">Pinia 4.x</span></li>
        </ul>
        <ul>
          <li>UI 框架 : <span class="spa"> Element Plus 2.x</span></li>
        </ul>
        <ul>
          <li>可视化 : <span class="spa">Echart5.x</span></li>
        </ul>
        <ul>
          <li>富文本 : <span class="spa">WangEditor</span></li>
        </ul>
        <ul>
          <li>
            工具库 : <span class="spa">@vueuse/core + dayjs + countup.js</span>
          </li>
        </ul>
        <ul>
          <li>CSS 预编译 : <span class="spa">Sass / Less</span></li>
        </ul>
        <ul>
          <li>HTTP 工具 : <span class="spa">Axios</span></li>
        </ul>
        <ul>
          <li>Git Hook 工具 : <span class="spa">husky</span></li>
        </ul>
        <ul>
          <li>
            代码规范 : <span class="spa">EditorConfig + Prettier + ESLint</span>
          </li>
        </ul>
        <ul>
          <li>提交规范 : <span class="spa">Commitizen + Commitlint </span></li>
        </ul>
        <ul>
          <li>自动部署 : <span class="spa">Centos + Jenkins + Nginx</span></li>
        </ul>
      </div>
    </el-card>
  </div>

  <div class="content">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>生产环境依赖</span>
        </div>
      </template>
      <el-table :data="overConfig.dataTable" style="width: 100%">
        <el-table-column prop="date" width="350" class-name="date" />
        <el-table-column prop="version" width="250" class-name="version">
          <template #default="scope">
            <el-button type="primary" class="text">{{
              scope.row.version
            }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="dateT" label="" width="350" class-name="date" />
        <el-table-column prop="versionT" width="250" class-name="version">
          <template #default="scope">
            <el-button type="primary" class="text">{{
              scope.row.version
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>开发环境依赖</span>
        </div>
      </template>
      <el-table :data="overDevConfig.dataTable" style="width: 100%">
        <el-table-column prop="date" width="350" class-name="date" />
        <el-table-column prop="version" width="250" class-name="version">
          <template #default="scope">
            <el-button class="text" type="primary">{{
              scope.row.version
            }}</el-button>
          </template> </el-table-column
        >>
        <el-table-column prop="dateT" label="" width="350" class-name="date" />
        <el-table-column prop="versionT" width="250" class-name="version">
          <template #default="scope">
            <el-button class="text" type="primary">{{
              scope.row.version
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="box-card">
      <pre class="code">
        <code>
├─public
|    └── favicon.ico
└─src
    ├─assets
    │  ├─css
    │  └─img
    ├─base-ui
    ├─components
    │  ├─main-header
    │  │  └─c-cpns
    │  ├─main-menu
    │  ├─page-content
    │  ├─page-echarts
    │  │  ├─data
    │  │  ├─src
    │  │  └─types
    │  ├─page-model
    │  └─page-search
    ├─global
    ├─hooks
    ├─router
    │  ├─login
    │  └─main
    │      ├─analysis
    │      │  ├─dashboard
    │      │  └─overview
    │      ├─product
    │      │  ├─category
    │      │  └─goods
    │      ├─story
    │      │  ├─chat
    │      │  └─list
    │      └─system
    │          ├─department
    │          ├─menu
    │          ├─role
    │          └─user
    ├─service
    │  ├─config
    │  ├─login
    │  ├─main
    │  │  ├─analysis
    │  │  └─system
    │  ├─modules
    │  └─request
    ├─store
    │  ├─login
    │  └─main
    │      ├─analysis
    │      └─system
    ├─types
    ├─utils
    └─views
        ├─login
        │  └─c-cpns
        ├─main
        │  ├─analysis
        │  │  ├─dashboard
        │  │  │  └─c-cpns
        │  │  └─overview
        │  │      └─config
        │  ├─product
        │  │  ├─category
        │  │  │  └─config
        │  │  └─goods
        │  │      └─config
        │  ├─story
        │  │  ├─chat
        │  │  └─list
        │  └─system
        │      ├─department
        │      │  ├─c-cpns
        │      │  └─config
        │      ├─menu
        │      │  └─config
        │      ├─role
        │      │  └─config
        │      └─user
        │          └─c-cpns
        └─not-found
├──.editorConfig
├──.env
├──.eslintrc.cjs
├──.auto-imports.d.ts
├──.components.d.ts
├──.env.d.ts
├──.package-lock.json
├──.package.json
</code>
      </pre>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>项目规范</span>
        </div>
      </template>
      <div>
        文件夹命名规范
        <el-table :data="overNameConfig.dataTable" style="width: 100%">
          <el-table-column prop="date" width="800" class-name="date" />
          <el-table-column prop="version" class-name="version">
            <template #default="scope">
              <el-button type="primary" class="text">{{
                scope.row.version
              }}</el-button>
            </template> </el-table-column
          >>
        </el-table>
      </div>
    </el-card>
    <el-card class="box-card">
      <div>
        组件命名规范
        <el-table :data="componetConfig.dataTable" style="width: 100%">
          <el-table-column prop="date" width="800" class-name="date" />
          <el-table-column prop="version" class-name="version">
            <template #default="scope">
              <el-button type="primary" class="text">{{
                scope.row.version
              }}</el-button>
            </template> </el-table-column
          >>
        </el-table>
      </div>
    </el-card>
    <el-card class="box-card">
      <div>
        git提交规范
        <el-table :data="gitConfig.dataTable" style="width: 100%">
          <el-table-column prop="date" width="800" class-name="date" />
          <el-table-column prop="version" class-name="version">
            <template #default="scope">
              <el-button type="primary" class="text">{{
                scope.row.version
              }}</el-button>
            </template> </el-table-column
          >>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import overConfig from './config/over.config'
import overDevConfig from './config/overdev.config'
import overNameConfig from './config/overName.config'
import componetConfig from './config/component.config'
import gitConfig from './config/git.config'
</script>

<style lang="less">
.content {
  margin-bottom: 20px;
  .box-card {
    margin-bottom: 20px;
  }
  .code {
    background-color: #f0f0f0;
  }
  ul li {
    margin-left: 15px;
    list-style-type: disc;
    margin-bottom: 20px;

    .spa {
      color: rgb(76, 124, 230);
      margin-left: 20px;
    }
  }
  .date {
    background-color: #f5f7fa;
    font-weight: 800;
  }
  .version {
    .text {
      height: 22px;
      background-color: #ecf5ff;
      color: #889eff;
      border-radius: 3px;
      font-size: 12px;
    }
  }
  .el-table tbody tr:hover > td {
    background-color: white !important;
  }
}
</style>
