import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const serverURL: string | undefined = "http://localhost/"


export const axiosLogin = axios.create({
  baseURL: serverURL,
  timeout: 30000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true
})

export const axiosTemplate = axios.create({
  baseURL: serverURL,
  timeout: 30000,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'multipart/form-data'
    // 'Content-Type': 'application/json'
  },
  withCredentials: true
})
axiosTemplate.defaults.headers.put['Content-Type'] = 'application/json';

axiosTemplate.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    const navigate = useNavigate()
    if (axios.isAxiosError(error)) {
      const status = error.response?.status
      if (status == 401) {
        navigate('/login')
      }
    }
    return Promise.reject(error)
  }
)
