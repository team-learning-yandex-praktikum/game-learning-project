import { URL } from '@utils/url'
import { axiosClient } from './axiosClient'

export class BaseApi {
    constructor(baseURL: string) {
        this.baseUrl = baseURL
    }

    baseUrl: string
    client = axiosClient

    withUrl = (url?: string) => URL.join(this.baseUrl, url)
}

export { axiosClient }
