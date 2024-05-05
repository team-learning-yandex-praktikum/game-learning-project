import { BaseApi } from '@api/baseApi'
import { ClientIdDTO, OauthSignInRequest } from './types'

export class OAuthApi extends BaseApi {
    constructor() {
        super('oauth')
    }

    getServiceId = async (redirectUri: string) => {
        const { data } = await this.client.get<ClientIdDTO>(
            this.withUrl('yandex/service-id'),
            {
                params: { redirect_uri: redirectUri },
            }
        )

        return data
    }

    getToken = async (oAuthRequestData: OauthSignInRequest) => {
        const { data } = await this.client.post<string>(
            this.withUrl('yandex'),
            oAuthRequestData
        )
        return data
    }
}

export const oAuthApi = new OAuthApi()
