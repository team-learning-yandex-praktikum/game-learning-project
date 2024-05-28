import { responseInterceptor } from 'http-proxy-middleware'
import type { Request } from 'express'
import type { CookieCreationAttributes } from '../models/cookie.model'
import { cookieService } from '../services/cookie.service'
import { resolveCookies } from '../utils/formatCookies'

export const proxyResponseInterceptor = responseInterceptor(
    async (buffer, proxyRes, req) => {
        const { cookies, path, method } = req as Request
        const response = buffer.toString('utf8')
        const isAuthUserPath = method === 'GET' && path === '/auth/user'

        if (isAuthUserPath) {
            const contentType = proxyRes.headers['content-type']
            const responseIsJson = contentType?.includes('application/json')
            const parsedResponse = responseIsJson ? JSON.parse(response) : {}
            const cookiesString = resolveCookies(cookies)

            if (parsedResponse?.id && cookiesString) {
                const cookieData: CookieCreationAttributes = {
                    userId: parsedResponse.id,
                    cookie: cookiesString,
                }
                await cookieService.create(cookieData)
            }
        }

        return buffer
    }
)
