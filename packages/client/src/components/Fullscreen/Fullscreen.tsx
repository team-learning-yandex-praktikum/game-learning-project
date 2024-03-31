import { FC, useEffect, useState } from 'react'
import style from './fullscreen.module.css'
import { OffFullscreenIcon, OnFullscreenIcon } from '@assets/icons'

const Fullscreen: FC = () => {
    const [isFullscreen, setIsFullscreen] = useState(false)

    const toggleFullscreen = () => {
        if (!isFullscreen) {
            document.documentElement.requestFullscreen()
        } else {
            document.exitFullscreen()
        }
    }

    const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            setIsFullscreen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('fullscreenchange', handleFullscreenChange)
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener(
                'fullscreenchange',
                handleFullscreenChange
            )
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    return (
        <div className={style.iconContainer} onClick={toggleFullscreen}>
            {isFullscreen ? <OffFullscreenIcon /> : <OnFullscreenIcon />}
        </div>
    )
}

export default Fullscreen
