import { ChangeEvent, useCallback, useState } from 'react'
import { debounce } from 'lodash'
import { useAppDispatch } from '@store/hooks'
import { getTopics } from '@store/forum/thunk'

const useSearchInput = () => {
    const dispatch = useAppDispatch()
    const [searchValue, setSearchValue] = useState('')

    const delayedDispatch = useCallback(
        debounce((value: string) => {
            dispatch(getTopics({ limit: 20, search: value }))
        }, 1000),
        [dispatch]
    )

    const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setSearchValue(value)
        delayedDispatch(value)
    }

    return {
        searchValue,
        handleSearchInputChange,
    }
}

export default useSearchInput
