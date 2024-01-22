import { accountLoginFetch } from '@/service/modules/login'
import { defineStore } from 'pinia'
import type { IAccount } from '@/types/index'
// import { ElMessage } from 'element-plus'
import router from '@/router'

interface IState {
  userInfo: any
  userMenus: any
  token: string
  btnLoading: boolean
  id: any
}

const useLoginStore = defineStore('login', {
  state: (): IState => ({
    userInfo: JSON.parse(localStorage.getItem('userInfo') ?? ''),
    userMenus: JSON.parse(localStorage.getItem('userMenus') ?? ''),
    token: localStorage.getItem('token') ?? '',
    btnLoading: false,
    id: ''
  }),
  actions: {
    async accountLoginAction(account: IAccount) {
      try {
        // 按钮动画
        // this.btnLoading = true
        // 登录请求
        const loginRes = await accountLoginFetch(account)
        // 错误提示
        if (loginRes?.code !== 0) {
          // ElMessage({
          //   message: '账号或密码错误',
          //   type: 'error'
          // })
          // this.btnLoading = false
          return
        }
        this.id = loginRes.data?.id
        this.token = loginRes.data?.token
        // token缓存
        localStorage.setItem('token', this.token)
        // 页面跳转
        router.push('/main')
        // ElMessage({
        //   message: '登录成功，欢迎回来',
        //   type: 'success'
        // })
        // this.btnLoading = false
      } catch (error) {
        // ElMessage({
        //   message: '服务器异常',
        //   type: 'error'
        // })
        // this.btnLoading = false
      }
    }
  }
})

export default useLoginStore
