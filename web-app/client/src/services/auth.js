import Api from '@/services/api'

export default {
  login(password) {
    return Api().post('login', { password })
  }
}