export type OauthSignInRequest = {
    // User code from Yandex
    code: string

    // Redirect uri that you are using for oauth
    redirect_uri: string
}

export type ClientID = {
    service_id: string
}
