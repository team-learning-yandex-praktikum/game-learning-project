import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { throttle } from 'lodash'
import { ArrowLeftIcon, ArrowTopIcon, MoonIcon, SunIcon } from '@assets/icons'
import { ThemeMode } from '@styles'
import { useWindowListener } from '@utils'
import SidebarItem from './elements/SidebarItem'
import SidebarSection from './elements/SidebarSection'
import styles from './sidebar.module.css'
import { SidebarMode, SidebarProps } from './types'
import { changeVisibilityLinkContainer } from './helpers'
import { sidebarConfig } from './config'

const Sidebar = <S extends string = string>({
  themeMode,
  setThemeMode,
  mode: externalMode,
  defaultMode = 'default',
  onReturn,
  SectionProps,
}: SidebarProps<S>) => {
  const handleChangeTheme = useCallback(() => {
    setThemeMode(prevState =>
      prevState === ThemeMode.light ? ThemeMode.dark : ThemeMode.light
    )
  }, [setThemeMode])

  const [innerSidebarMode, setSidebarMode] = useState<SidebarMode>(defaultMode)
  const sidebarMode = externalMode ?? innerSidebarMode
  const isLightTheme = themeMode === 'light'
  const isReturnMode = sidebarMode === 'return'
  const isHoistMode = sidebarMode === 'hoist'

  const linkContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Если извне поменялся defaultMode меняем sidebarMode, только если нет скролла
    if (defaultMode !== sidebarMode && sidebarMode !== 'hoist') {
      setSidebarMode(defaultMode)
    }
  }, [defaultMode])

  useEffect(() => {
    changeVisibilityLinkContainer(sidebarMode, linkContainerRef.current)
  }, [sidebarMode])

  const scrollHandler: EventListenerOrEventListenerObject = useMemo(() => {
    return throttle(
      e => {
        const currentScroll = e.currentTarget.scrollY

        if (currentScroll >= 800) {
          setSidebarMode('hoist')
          return
        }

        setSidebarMode(externalMode ? sidebarMode : defaultMode)
      },
      200,
      { trailing: false }
    )
  }, [sidebarMode])

  useWindowListener('scroll', scrollHandler, [scrollHandler])

  const hoistHandler = useCallback(() => {
    window.scrollTo({ behavior: 'smooth', top: 0 })
  }, [])

  const returnHandler = useCallback(() => {
    if (onReturn) {
      onReturn()
    } else {
      history.back()
    }
  }, [onReturn])

  const clickHandler = useCallback(() => {
    switch (sidebarMode) {
      case 'hoist':
        hoistHandler()
        return
      case 'return':
        returnHandler()
        return
      default:
        return
    }
  }, [sidebarMode, hoistHandler, returnHandler])

  return (
    <div
      className={styles.sidebar}
      data-mode={sidebarMode}
      onClick={clickHandler}>
      <div className={styles.linkContainer} ref={linkContainerRef}>
        {sidebarConfig.map(config => (
          <SidebarItem key={config.link} {...config} />
        ))}
        <SidebarItem
          title="Сменить тему"
          onClick={handleChangeTheme}
          icon={isLightTheme ? <MoonIcon /> : <SunIcon />}
        />
        {SectionProps?.sections && <SidebarSection {...SectionProps} />}
      </div>
      <div className={styles.arrow}>
        {isReturnMode && <ArrowLeftIcon />}
        {isHoistMode && <ArrowTopIcon />}
      </div>
    </div>
  )
}

export default Sidebar
