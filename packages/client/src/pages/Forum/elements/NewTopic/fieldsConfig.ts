import { NewTopicValidationConfig } from '@pages/Forum/elements/NewTopic/types'
import { ERRORS } from '@utils/validation/errors'

export const NEW_TOPIC_FIELDS_CONFIG: NewTopicValidationConfig = {
    title: {
        required: ERRORS.required,
    },
    description: {},
}
