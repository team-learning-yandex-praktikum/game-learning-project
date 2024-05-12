import { Theme } from '../../models/theme.model'
import { type Error, Op } from 'sequelize'

export async function uploadThemesToDB() {
    try {
        const found = await Theme.findAll({
            where: {
                [Op.or]: [{ theme: 'light' }, { theme: 'dark' }],
            },
        })

        if (found.length > 0) {
            return
        }

        await Theme.bulkCreate([{ theme: 'light' }, { theme: 'dark' }])
    } catch (e) {
        const error = e as Error
        console.error(error.message ?? error)
    }
}
