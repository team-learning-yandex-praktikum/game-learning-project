import { SidebarMode } from '@store/sidebar/types'
import { useEffect } from 'react'
import { sidebarSlice } from '@store/sidebar'
import { useAppDispatch } from '@store/hooks'

export const useSidebarMode = (defaultMode: SidebarMode = 'return') => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(sidebarSlice.actions.setDefaultMode(defaultMode))

        return () => {
            dispatch(sidebarSlice.actions.setDefaultMode('default'))
        }
    }, [defaultMode, dispatch])
}
