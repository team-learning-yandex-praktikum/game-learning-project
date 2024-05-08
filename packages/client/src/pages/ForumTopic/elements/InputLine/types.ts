import { TopicComments } from '@store/topic/types'

export type InputLineFieldValues = Record<'comment', string>

export interface InputLineProps {
    id: string
    parentInfo: TopicComments | null
    closeAnswer: () => void
}
