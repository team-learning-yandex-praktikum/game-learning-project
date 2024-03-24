import { MouseEvent } from 'react'

export interface SidebarSectionProps<S extends string = string> {
    selected?: S
    sections?: S[]
    mapKeysToSections?: Record<S, string>
    onSelect?: (section: S, event: MouseEvent) => void
}
