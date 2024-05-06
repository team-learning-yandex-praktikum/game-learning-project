import {
    UserTheme,
    type UserThemeAttributes,
    UserThemeCreationAttributes,
} from '../models/userTheme.model'

export type UserThemeCreateRequest = UserThemeCreationAttributes
export type UserThemeFindRequest = Pick<UserThemeAttributes, 'ownerId'>

class UserThemeService {
    private repository = UserTheme

    public findOrCreate = async (creationData: UserThemeCreateRequest) => {
        const [found, created] = await this.repository.findOrCreate({
            where: { ownerId: creationData.ownerId },
            defaults: creationData,
        })

        if (!created && found.themeId !== creationData.themeId) {
            found.themeId = creationData.themeId
            await found.save()
        }

        return found
    }

    public findByParams = ({ ownerId }: UserThemeFindRequest) =>
        this.repository.findOne({
            where: { ownerId },
        })
}

export const userThemeService = new UserThemeService()
