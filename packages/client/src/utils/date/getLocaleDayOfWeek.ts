import { WEEK_DAYS } from './constants'

export const getLocaleDayOfWeek = (date: Date) => {
    const firstWord = date.toUTCString().split(',')[0].toLowerCase()
    return WEEK_DAYS[firstWord]
}
