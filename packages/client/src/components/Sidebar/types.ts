import { Dispatch, SetStateAction } from 'react'
import { ThemeMode } from '@styles'
import { SidebarSectionProps } from '@components/Sidebar/elements/SidebarSection'

export type SidebarMode = 'default' | 'return' | 'hoist'

export interface SidebarProps<S extends string = string> {
    themeMode: ThemeMode
    setThemeMode: Dispatch<SetStateAction<ThemeMode>>
    SectionProps?: SidebarSectionProps<S>
    mode?: SidebarMode
    defaultMode?: SidebarMode
    onReturn?: () => void
}
