import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { throttle } from 'lodash'
import { ArrowLeftIcon, ArrowTopIcon, MoonIcon, SunIcon } from '@assets/icons'
import { useWindowListener } from '@utils'
import SidebarItem from './elements/SidebarItem'
import SidebarSection from './elements/SidebarSection'
import styles from './sidebar.module.css'
import { changeVisibilityLinkContainer } from './helpers'
import { sidebarConfig } from './config'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { settingsSelectors } from '@store/settings'
import { SidebarMode } from '@store/sidebar/types'
import { sidebarSelectors } from '@store/sidebar'
import { toggleUserTheme } from '@store/settings/thunks'

const Sidebar: FC = () => {
    const themeMode = useAppSelector(settingsSelectors.selectThemeMode)
    const {
        defaultMode,
        mode: externalMode,
        sectionOptions,
    } = useAppSelector(sidebarSelectors.selectState)

    const dispatch = useAppDispatch()

    const handleChangeTheme = useCallback(() => {
        dispatch(toggleUserTheme())
    }, [dispatch])

    const [innerSidebarMode, setSidebarMode] =
        useState<SidebarMode>(defaultMode)
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

    const scrollHandler: EventListenerOrEventListenerObject = useMemo(
        () =>
            throttle(
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
            ),
        [sidebarMode]
    )

    useWindowListener('scroll', scrollHandler, [scrollHandler])

    const hoistHandler = useCallback(() => {
        if (typeof window !== 'undefined') {
            window.scrollTo({ behavior: 'smooth', top: 0 })
        }
    }, [])

    const returnHandler = useCallback(() => {
        // todo Добавить в стор инфу для данного перехода
        history.back()
    }, [])

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
            onClick={clickHandler}
        >
            <div className={styles.linkContainer} ref={linkContainerRef}>
                {sidebarConfig.map(config => (
                    <SidebarItem key={config.link} {...config} />
                ))}
                <SidebarItem
                    title="Сменить тему"
                    onClick={handleChangeTheme}
                    icon={isLightTheme ? <MoonIcon /> : <SunIcon />}
                />
                {sectionOptions?.sections && (
                    <SidebarSection {...sectionOptions} />
                )}
            </div>
            <div className={styles.arrow}>
                {isReturnMode && <ArrowLeftIcon />}
                {isHoistMode && <ArrowTopIcon />}
            </div>
        </div>
    )
}

export default Sidebar
