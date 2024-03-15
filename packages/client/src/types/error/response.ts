import { AxiosError } from 'axios'

export type ErrorResponse = AxiosError<{ reason: string }>
