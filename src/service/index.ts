import HYRequest from './request/index'
import { BASE_URL } from './config'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: 10000,
  interceptors: {
    requestSuccessFn: (config) => {
      // 请求成功的拦截器，给每个请求都携带token
      const token = localCache.getCache(LOGIN_TOKEN)
      if (config.headers && token) {
        // 确保headers 和 token 都存在 （类型缩小）

        // 注意：拼接字符时，需要在字符后边加一个空格
        // config.headers.Authorization = 'Bearer' + token
        config.headers.Authorization = 'Bearer ' + token
      }
      // console.log(token)
      return config
    }
  }
})

export default hyRequest
