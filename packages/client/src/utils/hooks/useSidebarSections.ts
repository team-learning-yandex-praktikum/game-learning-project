import { SidebarSectionOptions } from '@store/sidebar/types'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { useEffect } from 'react'
import { sidebarActions, sidebarSelectors } from '@store/sidebar/sidebarSlice'

export const useSidebarSections = (options: SidebarSectionOptions) => {
    const selected = useAppSelector(sidebarSelectors.selectSelectedSection)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(sidebarActions.setSectionOptions(options))

        return () => {
            dispatch(sidebarActions.setSectionOptions())
        }
    }, [dispatch])

    return selected
}
