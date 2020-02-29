import { apiHelper } from '../utils/helpers'

export default {
  signIn({ email, password }) {
    // 帶入需要的參數
    // 這裡 return 的會是一個 Promise
    return apiHelper.post('/signin', {
      email,
      password
    })
  }
}