import { StatusCodes } from 'http-status-codes'

export const UI_ERRORS: Partial<Record<StatusCodes, string>> = {
    [StatusCodes.NOT_FOUND]: 'Не туда попали',
    [StatusCodes.INTERNAL_SERVER_ERROR]: 'Упс... Что-то пошло не так',
}
