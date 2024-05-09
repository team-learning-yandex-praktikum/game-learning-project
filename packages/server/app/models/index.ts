import type { Sequelize } from 'sequelize-typescript'
import { Topic } from './topic.model'
import { Comment } from './comment.model'
import { Reaction } from './reaction.model'
import { Emoji } from './emoji.model'

export const applyModels = (sequelize: Sequelize) => {
    sequelize.addModels([Topic, Comment, Reaction, Emoji])
}
