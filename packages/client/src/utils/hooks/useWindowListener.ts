import { useEffect } from 'react'
import { getWindow } from '../document'

export const useWindowListener = <K extends keyof WindowEventMap>(
    event: K,
    listener: (this: Window, ev: WindowEventMap[K]) => unknown,
    deps: unknown[] = []
) => {
    useEffect(() => {
        if (!getWindow()) {
            return undefined
        }

        window.addEventListener(event, listener)

        return () => {
            window.removeEventListener(event, listener)
        }
    }, deps)
}
