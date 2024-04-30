export type OauthSignInRequest = {
    // User code from Yandex
    code: string

    // Redirect uri that you are using for oauth
    redirect_uri: string
}

export type ClientIdDTO = {
    service_id: string
}
