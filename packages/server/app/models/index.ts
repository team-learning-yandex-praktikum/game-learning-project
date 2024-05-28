import type { Sequelize } from 'sequelize-typescript'
import { Topic } from './topic.model'
import { Comment } from './comment.model'
import { Reaction } from './reaction.model'
import { Emoji } from './emoji.model'
import { Theme } from './theme.model'
import { UserTheme } from './userTheme.model'
import { Cookie } from './cookie.model'

export const applyModels = (sequelize: Sequelize) => {
    sequelize.addModels([
        Topic,
        Comment,
        Reaction,
        Emoji,
        Theme,
        UserTheme,
        Cookie,
    ])
}
