import axios, { Axios, AxiosRequestConfig } from 'axios'
import { BASE_API } from './constants'
import { URL } from '@utils'

export class BaseApi {
    constructor(
        baseURL?: string,
        options: Omit<AxiosRequestConfig, 'method'> = {}
    ) {
        const baseConfig: AxiosRequestConfig = {
            baseURL: URL.join(BASE_API, baseURL),
            withCredentials: true,
            timeout: 5000,
            ...options,
        }
        this.client = axios.create(baseConfig)
    }

    client: Axios
}
