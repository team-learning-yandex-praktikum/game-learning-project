import { AppDispatch, RootState } from '@store'
import { LoaderFunctionArgs as RouterLoaderFunctionArgs } from '@remix-run/router/dist/utils'

export type LoaderFunctionContextOptions = {
    clientToken?: string
}

export interface LoaderFunctionContext {
    dispatch: AppDispatch
    state: RootState
    options?: LoaderFunctionContextOptions
}

export type LoaderFunctionArgs = RouterLoaderFunctionArgs<LoaderFunctionContext>
