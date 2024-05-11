export interface ReactionDTO {
    id?: number
    topicId: number
    emojiId: number
    userId?: number
}

export interface addReactionParams {
    topicId: number
    userId: number
    emojiId: number
}
