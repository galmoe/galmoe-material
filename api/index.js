import axios from 'axios'
// import urlJoin from 'url-join'
import store from '../src/store'
import { backEnd } from '../config'

axios.defaults.baseURL = `${backEnd}/api/`
// 跨域
axios.defaults.withCredentials = true
axios.defaults.timeout = 100000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

const instance = {}

;['get', 'post', 'put', 'delete'].forEach((key) => {
  instance[key] = function (...args) {
    console.log([key], axios.defaults.baseURL, ...args)
    return axios[key](...args)
      .then((res) => {
        console.log(res.data)
        if (res.data.session) {
          store.commit('session/GETSESSIONINFO', res.data.session)
        }
        // 全局信息提示
        if (res.data.type && res.data.msg) {
          store.commit('message/SHOWMSG', res.data)
        }
        return res.data
      })
      .catch((err) => {
        console.log(err)
      })
  }
})

const api = {
  user: {
    getUserInfo: (uid) => instance.get(`u/${uid}`),
    getMessage: () => instance.get(`u/message`),
    getErrMessage: () => instance.get(`u/errmessage`)
  },
  check: {
    uname: (data) => instance.post(`u/check/uname`, data),
    email: (data) => instance.post(`u/check/email`, data)
  },
  session: {
    getInfo: () => instance.get(`s`),
    privateInfo: () => instance.get(`s/p`),
    login: (data) => instance.post(`s/login`, data),
    logout: () => instance.post(`s/logout`),
    register: (data) => instance.post(`s/register`, data),
    update: (data) => instance.put(`s/update`, data),
    safety: (data) => instance.put(`s/safety`, data)
  },
  post: {
    list: (data) => instance.get(`post`, { params: data })
  },
  upload: (data) => instance.post(`upload`, data)
}

export default api

// export function semiRestful () {
//   instance.put = function (url, ...args) {
//     return instance.post(urlJoin(url, '/update'), ...args)
//   }
//   instance.delete = function (url, ...args) {
//     return instance.post(urlJoin(url, '/delete'), ...args)
//   }
// }
