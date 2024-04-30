import type { Sequelize } from 'sequelize-typescript'
import { Topic } from './topic.model'
import { Comment } from './comment.model'

export const applyModels = (sequelize: Sequelize) => {
    sequelize.addModels([Topic, Comment])
}
