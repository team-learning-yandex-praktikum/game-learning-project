import {
    LoaderFunctionContext,
    LoaderFunctionContextOptions,
} from '@routes/types'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { useEffect } from 'react'
import { store } from '@store'
import { ssrActions, ssrSelectors } from '@store/ssr'

type PageProps = {
    initPage: (data: LoaderFunctionContext) => Promise<unknown>
}

const getCookie = (name: string) => {
    const matches = document.cookie.match(
        new RegExp(
            '(?:^|; )' +
                // eslint-disable-next-line
                name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
                '=([^;]*)'
        )
    )
    return matches ? decodeURIComponent(matches[1]) : undefined
}

const createContext = (): LoaderFunctionContextOptions => ({
    clientToken: getCookie('token'),
})

export const usePage = ({ initPage }: PageProps) => {
    const dispatch = useAppDispatch()
    const pageHasBeenInitializedOnServer = useAppSelector(
        ssrSelectors.selectPageHasBeenInitializedOnServer
    )

    useEffect(() => {
        if (pageHasBeenInitializedOnServer) {
            dispatch(ssrActions.setPageHasBeenInitializedOnServer(false))
            return
        }

        initPage({
            dispatch,
            state: store.getState(),
            options: createContext(),
        })
    }, [])
}
