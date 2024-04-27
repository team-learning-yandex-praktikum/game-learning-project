import { URL } from '@utils/url'
import { axiosClient } from './axiosClient'
import { EXTERNAL_SERVER_PATH } from './constants'

export class BaseApi {
    constructor(baseURL: string, external = true) {
        this.baseUrl = external
            ? URL.join(EXTERNAL_SERVER_PATH, baseURL)
            : baseURL
    }

    baseUrl: string
    client = axiosClient

    withUrl = (url?: string) => URL.join(this.baseUrl, url)
}

export { axiosClient }
