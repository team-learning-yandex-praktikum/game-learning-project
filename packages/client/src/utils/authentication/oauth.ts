import { oAuthApi } from '@api/oAuth'
import { ClientIdDTO, OauthSignInRequest } from '@api/oAuth/types'
import { getWindow } from '@utils/document'
import { hasKey } from '@utils/common/checks'

const ALPHA_U = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const ALPHA_L = 'abcdefghijklmnopqrstuvwxyz'
const DIGITS = '0123456789'
const VALID_CHARS = ALPHA_U + ALPHA_L + DIGITS

export const ERRCODE_PARAM = 'error'
export const ERRDESC_PARAM = 'error_description'
export const STATE_PARAM = 'state'
export const ERROR_NOSTATE = `параметр ${STATE_PARAM} отсутствует`
export const ERROR_STATE = `параметр ${STATE_PARAM} не совпадает с переданным на сервер авторизации`

function toStringFromUint8(arr: Uint8Array) {
    const arrayNumbers = Array.from<number>(arr)
    return String.fromCharCode.apply(null, arrayNumbers)
}

function numToCodepoint(n: number) {
    const pos = n % VALID_CHARS.length
    return VALID_CHARS.codePointAt(pos) ?? 0
}

class OAuthManager {
    private api = oAuthApi
    private oAuthUrl = __OUTH_YANDEX_URL__
    private stateKey = 'oauth2-state-key'
    public redirectUri = __CLIENT_URL__

    public cleanup = () => {
        this.removeState()
    }

    saveState = (state: string) => {
        sessionStorage.setItem(this.stateKey, state)
    }

    removeState = () => {
        sessionStorage.removeItem(this.stateKey)
    }

    getState = () => sessionStorage.getItem(this.stateKey)

    checkState = (receivedState: string) => {
        const state = sessionStorage.getItem(this.stateKey)
        return state === receivedState
    }

    checkError = (queryObj: Record<string, string>) => {
        if (hasKey(ERRCODE_PARAM, queryObj)) {
            const errCode = queryObj[ERRCODE_PARAM]
            const errDesc = queryObj[ERRDESC_PARAM]
            return `Ошибка авторизации: ${errDesc} (код ошибки - ${errCode})`
        }

        if (!hasKey(STATE_PARAM, queryObj)) {
            return `Ошибка авторизации: ${ERROR_NOSTATE}`
        }

        const state = queryObj[STATE_PARAM]
        if (!this.checkState(state)) {
            return `Ошибка авторизации: ${ERROR_STATE}`
        }

        return null
    }

    generateRandomStateStr = () => {
        const arr = new Uint8Array(40)
        getWindow()?.crypto.getRandomValues(arr)

        const codePoints = arr.map(numToCodepoint)
        return toStringFromUint8(codePoints)
    }

    private createUrlParams = (clientId: ClientIdDTO) => {
        const responseType = 'code'

        const state = this.generateRandomStateStr()
        this.saveState(state)

        const params = {
            response_type: responseType,
            client_id: clientId.service_id,
            redirect_uri: this.redirectUri,
            state: state,
        }

        return new URLSearchParams(params).toString()
    }

    public createRedirectUrl = async () => {
        try {
            const serviceId = await this.api.getServiceId(this.redirectUri)

            const param = this.createUrlParams(serviceId)
            return `${this.oAuthUrl}?${param}`
        } catch (e) {
            console.error('[OAUTH_ERROR]: Error of generation URL. ', e)
            return null
        }
    }

    public getTokenByCode = async (code: string) => {
        const requestData: OauthSignInRequest = {
            code,
            redirect_uri: this.redirectUri,
        }

        return await this.api.getToken(requestData)
    }
}

export const oAuthManager = new OAuthManager()
