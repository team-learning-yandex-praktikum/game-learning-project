export type UrlType = string | URL
export type UrlProducer = () => Promise<UrlType>

export function isUrlType(url: UrlType | UrlProducer): url is UrlType {
    return typeof url === 'string' || url instanceof URL
}

export function queryToObject(query: string): Record<string, string> {
    const params = new URLSearchParams(query)
    const e = params.entries()
    return Object.fromEntries(e)
}

export function objectToQuery(object: Record<string, string>) {
    const params = new URLSearchParams(object)
    return params.toString()
}

export function getUrlQuery() {
    const s = window.location.search
    const sub = s.split('?')
    return sub[1]
}

export function getUrlQueryObj() {
    const q = getUrlQuery()
    return queryToObject(q)
}
