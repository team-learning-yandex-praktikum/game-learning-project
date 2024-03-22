import { SidebarSectionProps } from '@components/Sidebar/elements/SidebarSection'

export type SidebarMode = 'default' | 'return' | 'hoist'
export type SidebarSectionOptions = SidebarSectionProps

export interface SidebarState {
    mode?: SidebarMode
    defaultMode: SidebarMode
    sectionOptions?: SidebarSectionOptions
}
