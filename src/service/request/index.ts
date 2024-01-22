import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'

interface myAxiosRequestConfig extends AxiosRequestConfig {
  interceptors?: {
    requestOnFulfilled?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
    requestOnRejected?: (err: any) => any
    responseOnFulfilled?: (config: AxiosResponse) => AxiosResponse
    responseOnRejected?: (err: any) => any
  }
}
class MyRequest {
  instance: AxiosInstance
  constructor(config: myAxiosRequestConfig) {
    this.instance = axios.create(config)
    // 每个实例都添加拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('全局请求成功的拦截')
        return config
      },
      (err) => {
        console.log('全局请求失败的拦截')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (config) => {
        console.log('全局响应成功的拦截')
        return config
      },
      (err) => {
        console.log('全局响应失败的拦截')
        return err
      }
    )

    // 给指定的实例添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestOnFulfilled,
      config.interceptors?.requestOnRejected
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseOnFulfilled,
      config.interceptors?.responseOnRejected
    )
  }
  request(config: AxiosRequestConfig) {
    return new Promise<any>((resolve, rejects) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          rejects(err)
        })
    })
  }
  get() {}
  post() {}
}

export default MyRequest
