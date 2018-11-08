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
    getUserInfo: (uid) => instance.get(`u/info/${uid}`),
    post: (data) => instance.get(`u/post`, { params: data }),
    fav: (data) => instance.get(`u/fav`, { params: data }),
    addFav: (data) => instance.put(`u/fav`, { params: data }),
    removeFav: (data) => instance.delete(`u/fav`, { params: data }),
    comment: (data) => instance.get(`u/comment}`, { params: data }),
    addComment: (data) => instance.post(`u/comment`, data),
    removeComment: (data) => instance.delete(`u/comment`, { params: data }),
    about: (data) => instance.get(`u/about`, { params: data }),
    aboutUpdate: (data) => instance.put(`u/about`, { params: data }),
    updateAbout: (data) => instance.put(`u/about`, data),
    following: (data) => instance.get(`u/following`, { params: data }),
    addFollowing: (data) => instance.put(`u/following`, { params: data }),
    removeFollowing: (data) => instance.delete(`u/post`, { params: data }),
    follower: (data) => instance.get(`u/follower`, { params: data })
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
    list: (data) => instance.get(`post`, { params: data }),
    detail: (pid) => instance.get(`post/${pid}`),
    download: (pid, data) => instance.post(`post/download/${pid}`, data),
    addTag: (pid, data) => instance.post(`post/tag/${pid}`, data),
    removeTag: (pid, data) => instance.delete(`post/tag/${pid}`, { params: data })
  },
  commnet: {
    get: (pid, data) => instance.get(`comment/${pid}`, { params: data }),
    post: (pid, data) => instance.post(`comment/${pid}`, data)
  },
  publish: {
    edit: (data) => instance.get(`publish`, { params: data }),
    remove: (data) => instance.delete(`publish`, { params: data }),
    publish: (data) => instance.post(`publish`, data),
    update: (data) => instance.put(`publish`, data),
    list: (data) => instance.get(`publish/list`, { params: data })
  },
  fetchData: (data) => instance.get(`${data.type}`, { params: data }),
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
