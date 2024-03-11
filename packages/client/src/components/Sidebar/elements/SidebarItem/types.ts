import { MouseEventHandler, ReactNode } from 'react'

export interface SidebarItemProps {
  title: string
  link?: string
  icon?: ReactNode
  onClick?: MouseEventHandler
}
