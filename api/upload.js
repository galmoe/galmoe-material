import axios from 'axios'
import { backEnd } from '../config'

let config = {
  headers: { 'Content-Type': 'multipart/form-data' },
  withCredentials: true
}

const axiosUpload = function (formData) {
  return axios.post(`${backEnd}/api/upload`, formData, config)
}

export default axiosUpload
