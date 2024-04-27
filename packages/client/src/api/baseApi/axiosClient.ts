import axios from 'axios'
import { SERVER_URL } from './constants'

export const axiosClient = axios.create({
    baseURL: SERVER_URL,
    withCredentials: true,
    timeout: 5000,
})

export const setCookies = (cookies?: string) => {
    axiosClient.interceptors.request.use(config => {
        config.headers.Cookie = cookies
        return config
    })
}
