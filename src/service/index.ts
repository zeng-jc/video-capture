import MyRequest from './request'
import { BASE_URL, TIMEOUT } from './request/config'

export const service = new MyRequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  interceptors: {
    requestOnFulfilled(config) {
      config.headers.Authorization = localStorage.getItem('token')
      return config
    },
    requestOnRejected(err) {
      return err
    },
    responseOnFulfilled(config) {
      return config
    },
    responseOnRejected(config) {
      return config
    }
  }
})
