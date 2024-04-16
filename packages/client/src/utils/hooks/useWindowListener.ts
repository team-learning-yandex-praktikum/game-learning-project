import { useEffect } from 'react'

export const useWindowListener = <K extends keyof WindowEventMap>(
    event: K,
    listener: (this: Window, ev: WindowEventMap[K]) => unknown,
    deps: unknown[] = []
) => {
    useEffect(() => {
        if (typeof window === 'undefined') {
            return undefined
        }
        window.addEventListener(event, listener)

        return () => {
            window.removeEventListener(event, listener)
        }
    }, deps)
}
