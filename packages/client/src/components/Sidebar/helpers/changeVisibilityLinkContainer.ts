import { SidebarMode } from '@components/Sidebar/types'

export const hideLinkContainer = (node: HTMLDivElement | null) => {
  if (!node) {
    return
  }
  const height = node.clientHeight
  node.style.marginTop = `${-height}px`
}

export const showLinkContainer = (node: HTMLDivElement | null) => {
  if (!node) {
    return
  }

  node.style.removeProperty('margin-top')
}

export const changeVisibilityLinkContainer = (
  mode: SidebarMode,
  node: HTMLDivElement | null
) => {
  if (mode !== 'default') {
    hideLinkContainer(node)
  } else {
    showLinkContainer(node)
  }
}
