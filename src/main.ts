import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'
import App from './App.vue'
import router from './router'
import pinia from './store'
import registerIcons from '../src/global/register-icons'

//0.为ElMessage和Elloading等组件引入样式
import 'element-plus/theme-chalk/el-message.css'
import useLoginStore from './store/login/login'

// 1.全局注册element
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

// 图标的全局注册：

const app = createApp(App)

// app.use(ElementPlus)
app.use(registerIcons)

app.use(pinia)
const loginStore = useLoginStore()
loginStore.loadLocalCacheAction()
app.use(router)
app.mount('#app')
