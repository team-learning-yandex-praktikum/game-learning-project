import { FC, MouseEventHandler, useState } from 'react'
import { clsx } from 'clsx'
import styles from './sidebarItem.module.css'
import { unbrokenLine } from './helpers'
import { SidebarItemProps } from './types'
import { NavLink } from 'react-router-dom'

const SidebarItem: FC<SidebarItemProps> = ({ title, icon, link, onClick }) => {
  const [hovered, setHovered] = useState(false)

  const hoverSidebar = () => {
    setHovered(true)
  }

  const leaveSidebar = () => {
    setHovered(false)
  }

  const clickHandler: MouseEventHandler = e => {
    if (!link) {
      e.preventDefault()
    }

    if (onClick) {
      leaveSidebar()
      onClick(e)
    }
  }

  const props = {
    onMouseEnter: hoverSidebar,
    onMouseLeave: leaveSidebar,
    onClick: clickHandler,
  }

  const children = (
    <>
      {icon}
      <div className={styles.prompt}>
        <span>{unbrokenLine(title)}</span>
      </div>
    </>
  )

  if (link) {
    return (
      <NavLink
        to={link}
        className={({ isActive }) =>
          clsx(styles.sidebarItem, {
            [styles.promptActive]: hovered,
            [styles.active]: isActive && link,
          })
        }
        {...props}>
        {children}
      </NavLink>
    )
  }

  return (
    <div
      className={clsx(styles.sidebarItem, hovered && styles.promptActive)}
      {...props}>
      {children}
    </div>
  )
}

export default SidebarItem
