import {
    Theme,
    ThemeAttributes,
    ThemeCreationAttributes,
} from '../models/theme.model'
import type { GetRequestParams } from './types'

export type ThemeCreateRequest = ThemeCreationAttributes
export type ThemeFindAllRequest = GetRequestParams

class ThemeService {
    private repository = Theme

    public findOrCreate = async (creationData: ThemeCreateRequest) => {
        const [found] = await this.repository.findOrCreate({
            where: { theme: creationData.theme },
            defaults: creationData,
        })

        return found
    }

    public findAll = ({ limit, offset }: ThemeFindAllRequest) =>
        this.repository.findOne({
            limit,
            offset,
        })

    public findById = (id: ThemeAttributes['id']) =>
        this.repository.findByPk(id)
}

export const themeService = new ThemeService()
