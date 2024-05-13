import { TopicComment } from '@store/topic/types'

export type InputLineFieldValues = Record<'comment', string>

export interface InputLineProps {
    id: string
    parentInfo: TopicComment | null
    closeAnswer: () => void
}
