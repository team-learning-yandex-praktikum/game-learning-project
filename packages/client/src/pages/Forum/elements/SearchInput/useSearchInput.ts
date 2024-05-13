import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { debounce } from 'lodash'
import { useAppDispatch } from '@store/hooks'
import { getTopics } from '@store/forum/thunk'
import { forumActions } from '@store/forum'

const useSearchInput = () => {
    const dispatch = useAppDispatch()
    const [searchValue, setSearchValue] = useState('')

    const delayedDispatch = useCallback(
        debounce((value: string) => {
            dispatch(getTopics({ limit: 20, title: value }))
        }, 1000),
        [dispatch]
    )

    const handleSearchInputChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target
            setSearchValue(value)
            dispatch(forumActions.startLoading())
            delayedDispatch(value)
        },
        [delayedDispatch, dispatch]
    )

    return useMemo(
        () => ({
            searchValue,
            handleSearchInputChange,
        }),
        [handleSearchInputChange, searchValue]
    )
}

export default useSearchInput
