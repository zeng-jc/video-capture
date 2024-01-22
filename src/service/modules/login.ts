import { service } from '..'
import type { IAccount } from '@/types'

export function accountLoginFetch(account: IAccount) {
  return service.request({
    url: '/login',
    method: 'post',
    data: {
      name: account.username,
      password: account.password
    }
  })
}
