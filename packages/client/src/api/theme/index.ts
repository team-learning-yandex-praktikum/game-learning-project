import { BaseApi } from '@api'
import { ThemeDTO } from '@api/theme/types'

export class ThemeApi extends BaseApi {
    constructor() {
        super('theme', false)
    }

    getThemes = async () => {
        const { data } = await this.client.get<ThemeDTO[]>(this.withUrl())
        return data
    }
}

export const themeApi = new ThemeApi()
