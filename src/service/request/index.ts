import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

// 针对AxiosRequestConfig配置进行扩展,每个实例对象可以单独创建自己的拦截器
interface HYinterceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: AxiosRequestConfig) => any // AxiosRequestConfig使用这个类型报错
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}
interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HYinterceptors<T>
}

class HYRequest {
  //每个 request 实例 =>axios 实例 （希望创建多个实例，每个实例的配置就可以不一样）
  instance: AxiosInstance

  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config) //创建实例bn
    // 拦截器：蒙版loading/token 全局拦截器

    this.instance.interceptors.request.use(
      (config) => {
        // loading/token
        // console.log('全局请求成功的拦截')
        return config
      },
      (err) => {
        // console.log('全局请求失败的拦截')
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // console.log('全局响应成功的拦截')
        return res
      },
      (err) => {
        // console.log('全局响应失败的拦截')
        return err
      }
    )

    // 针对特定的HYrequest实例对象添加拦截器
    if (config.interceptors) {
      this.instance.interceptors.request.use(
        config.interceptors.requestSuccessFn,
        config.interceptors.requestFailureFn
      )
      this.instance.interceptors.response.use(
        config.interceptors.responseFailureFn,
        config.interceptors.responseSuccessFn
      )
    }
  }
  //  封装网络请求方法
  request<T = any>(config: HYRequestConfig<T>) {
    // 判断实例网络请求时的参数是否有拦截器。
    // 单次请求的成功拦截处理
    if (config.interceptors?.requestSuccessFn) {
      // 自己回调
      config.interceptors.requestSuccessFn(config)
    }
    // 返回promise 在promise内部发送请求
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单次响应成功的拦截处理
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  /* 单次请求拦截/全局拦截/实例拦截*/
  get<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: HYRequestConfig) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: HYRequestConfig) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: HYRequestConfig) {
    return this.request({ ...config, method: 'PATCH' })
  }
  options<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'OPTIONS' })
  }
}

export default HYRequest
