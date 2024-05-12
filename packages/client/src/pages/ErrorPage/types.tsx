import { StatusCodes } from 'http-status-codes'

export interface ErrorPageProps {
    code?: string | number | StatusCodes
    message?: string
}
