import axios from 'axios'
import { BASE_API } from '@api/baseApi/constants'

export const axiosClient = axios.create({
    baseURL: BASE_API,
    withCredentials: true,
    timeout: 5000,
})

export const setCookies = (cookies?: string) => {
    axiosClient.interceptors.request.use(config => {
        config.headers.Cookie = cookies
        return config
    })
}
