import {
    Cookie,
    type CookieAttributes,
    CookieCreationAttributes,
} from '../models/cookie.model'
import type { BaseService } from './base.service'

export type CookieCreateRequest = CookieCreationAttributes

class CookieService implements BaseService {
    private repository = Cookie

    public create = (creationData: CookieCreateRequest) =>
        this.repository.create(creationData)

    public findByCookie = (cookie: CookieAttributes['cookie']) =>
        this.repository.findOne({
            where: { cookie },
        })

    public findByUserId = (userId: CookieAttributes['userId']) =>
        this.repository.findOne({
            where: { userId },
        })
}

export const cookieService = new CookieService()
