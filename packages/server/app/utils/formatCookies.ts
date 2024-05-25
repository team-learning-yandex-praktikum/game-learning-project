type CookieType = { authCookie?: string; uuid?: string }

export const resolveCookies = ({ authCookie, uuid }: CookieType = {}):
    | string
    | undefined => {
    if (authCookie && uuid) {
        return [authCookie, uuid].join('; ')
    }

    return undefined
}
