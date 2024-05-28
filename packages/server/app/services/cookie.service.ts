import {
    Cookie,
    type CookieAttributes,
    CookieCreationAttributes,
} from '../models/cookie.model'
import type { BaseService } from './base.service'

export type CookieCreateRequest = CookieCreationAttributes

class CookieService implements BaseService {
    private repository = Cookie

    public create = async (creationData: CookieCreateRequest) => {
        const [found, isCreated] = await this.repository.findOrCreate({
            where: {
                userId: creationData.userId,
            },
            defaults: creationData,
        })

        if (!isCreated && found.cookie !== creationData.cookie) {
            found.cookie = creationData.cookie
            await found.save()
        }

        return found
    }

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
