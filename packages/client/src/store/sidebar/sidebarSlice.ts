import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { sidebarInitialState } from './initialState'
import { SidebarMode, SidebarSectionOptions, SidebarState } from './types'

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: sidebarInitialState,
    reducers: {
        setDefaultMode: (
            state: SidebarState,
            action: PayloadAction<SidebarMode>
        ) => {
            state.defaultMode = action.payload
        },
        setSectionOptions: (
            state: SidebarState,
            action: PayloadAction<SidebarSectionOptions | undefined>
        ) => {
            state.sectionOptions = action.payload
        },
        setSectionSelected: (
            state: SidebarState,
            action: PayloadAction<SidebarSectionOptions['selected']>
        ) => {
            if (!state.sectionOptions) {
                throw new Error(
                    'Sidebar: You try to set selected section but `sectionsOptions` is undefined'
                )
            }
            state.sectionOptions.selected = action.payload
        },
    },
    selectors: {
        selectState: state => state,
        selectSelectedSection: state => state.sectionOptions?.selected,
    },
})

export const sidebarReducer = sidebarSlice.reducer
export const sidebarSelectors = sidebarSlice.selectors
export const sidebarActions = sidebarSlice.actions
