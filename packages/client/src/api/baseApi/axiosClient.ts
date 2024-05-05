import axios, { CreateAxiosDefaults } from 'axios'
import { SERVER_URL } from './constants'

export const defaultAxiosConfig: CreateAxiosDefaults = {
    baseURL: SERVER_URL,
    withCredentials: true,
    timeout: 10000,
}

export const axiosClient = axios.create(defaultAxiosConfig)

export const setCookies = (cookies?: string) => {
    axiosClient.interceptors.request.use(config => {
        config.headers.Cookie = cookies
        return config
    })
}
