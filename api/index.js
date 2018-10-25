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
          console.log('res.data.profile', res.data.session)
          store.commit('session/GETSESSIONINFO', res.data.session)
        }
        // 全局信息提示
        if (res.data.type && res.data.msg) {
          store.commit('message/CHANGEMSG', res.data)
        }
        return res.data
      })
      .catch((err) => {
        console.log(err)
        // if (err.response && err.response.status >= 500) {
        //   Vue.prototype.$Message.error({
        //     content: `Σ(;ﾟдﾟ)  服务器崩坏，需要联系管理员维修`,
        //     duration: 6.5
        //   })
        // } else if (err.response && err.response.status === 403) {
        //   Vue.prototype.$Message.error({
        //     content: `╮(╯_╰)╭ 你没有相关权限进行此操作`,
        //     duration: 6.5
        //   })
        // } else if (err.response && err.response.status === 401) {
        //   Vue.prototype.$Message.error({
        //     content: `(〃∀〃) 请先登录`,
        //     duration: 6.5
        //   })
        // } else if (err.response && err.response.status === 400) {
        //   Vue.prototype.$Message.error({
        //     content: `${err.response.data.error}`,
        //     duration: 6.5
        //   })
        // } else if (!err.response) {
        //   Vue.prototype.$Message.error({
        //     content: `_(:з」∠)_  网络异常，检查你的网线`,
        //     duration: 6.5
        //   })
        // } else {
        //   Vue.prototype.$Message.error({
        //     content: err.message,
        //     duration: 6.5
        //   })
        // }
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
    email: (data) => instance.post(`u/check/email`, data),
  },
  session: {
    getInfo: () => instance.get(`s`),
    login: (data) => instance.post(`s/login`, data),
    logout: () => instance.post(`s/logout`),
    register: (data) => instance.post(`s/register`, data)
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
