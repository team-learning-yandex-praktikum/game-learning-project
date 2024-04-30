import { BaseApi } from '@api/baseApi'
import { ClientIdDTO, OauthSignInRequest } from './types'
import { Routes } from '@routes/constants'
import {
    generateRandomStateStr,
    removeState,
    saveState,
} from '@utils/authentication/oauth'
import { closePopup } from '@utils/ui/popup'

const BASE_URL = 'oauth'
const OAUTH_URL = 'https://oauth.yandex.ru/authorize'

const PORT = '3000'
const TEST_URL = `http://localhost:${PORT}`

export const ERRCODE_PARAM = 'error'
export const ERRDESC_PARAM = 'error_description'
export const STATE_PARAM = 'state'
export const ERROR_NOSTATE = `параметр ${STATE_PARAM} отсутствует`
export const ERROR_STATE = `параметр ${STATE_PARAM} не совпадает с переданным на сервер авторизации`

export class OAuthApi extends BaseApi {
    static readonly redirectUri = `${TEST_URL}${Routes.OAuth}`
    private clientID = 'dc45f725fcd94bb2a11472239798fc42'

    constructor() {
        super(BASE_URL)
    }

    cleanup() {
        closePopup()
        removeState()
    }

    async getServiceId(abort?: AbortSignal) {
        const params = {
            redirect_uri: OAuthApi.redirectUri,
        }

        const config = abort ? { signal: abort, params } : { params }

        const { data } = await this.client.get<ClientIdDTO>(
            'yandex/service-id',
            config
        )

        return data
    }

    async exchangeCodeForToken(codeForToken: string) {
        const req: OauthSignInRequest = {
            code: codeForToken,
            redirect_uri: OAuthApi.redirectUri,
        }
        const { data } = await this.client.post<string>('yandex', req)
        return data
    }

    async urlYandex(abort: AbortSignal) {
        // const id = await this.getServiceId(abort)
        const id = {
            service_id: this.clientID,
        }

        const param = this.urlParams(id)
        const url = `${OAUTH_URL}?${param}`

        return url
    }

    private urlParams(clientId: ClientIdDTO) {
        const responseType = 'code'

        const state = generateRandomStateStr()
        saveState(state)

        const params = {
            response_type: responseType,
            client_id: clientId.service_id,
            redirect_uri: OAuthApi.redirectUri,
            state: state,
        }

        return params.toString()
    }
}

export const oAuthApi = new OAuthApi()
