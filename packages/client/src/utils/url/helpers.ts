import { getWindow } from '@utils/document'

export type UrlType = string | URL
export type UrlProducer = () => Promise<UrlType>

export function isUrlType(url: UrlType | UrlProducer): url is UrlType {
    return typeof url === 'string' || url instanceof URL
}

export function queryToObject(query: string): Record<string, string> {
    const params = new URLSearchParams(query)
    return Object.fromEntries(params.entries())
}

export function objectToQuery(object: Record<string, string>) {
    const params = new URLSearchParams(object)
    return params.toString()
}

export function getUrlQuery() {
    const s = getWindow()?.location.search ?? ''
    const sub = s.split('?')
    return sub[1]
}

export function getUrlQueryObj() {
    const urlQuery = getUrlQuery()
    return queryToObject(urlQuery)
}
