import { MouseEvent } from 'react'

export interface SidebarSectionProps<S extends string = string> {
    selected?: S
    sections?: S[]
    onSelect?: (section: S, event: MouseEvent) => void
}
