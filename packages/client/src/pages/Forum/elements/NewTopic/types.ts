import { RegisterOptions } from 'react-hook-form'

type NewTopicFields = 'title' | 'description'
export type NewTopicFieldValues = Record<NewTopicFields, string>
type NewTopicValidationOptions = RegisterOptions<
    NewTopicFieldValues,
    NewTopicFields
>
export type NewTopicValidationConfig = Record<
    NewTopicFields,
    NewTopicValidationOptions
>
