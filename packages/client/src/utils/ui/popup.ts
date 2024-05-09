import { exists } from '@game-core/utils/CommonFunc'
import { Nullable } from '@game-core/utils/CommonTypes'
import { isUrlType, UrlProducer, UrlType } from '@utils/url/helpers'
import { getWindow } from '@utils/document'

let activePopup: Nullable<Window> = null
const HEIGHT = 700
const WIDTH = 600
const POS = calcCenter()
const POPUP_VIEW =
    'toolbar=no,scrollbars=no' + ',location=no,statusbar=no,menubar=no'

function calcCenter(): [number, number] {
    if (!getWindow()) {
        return [0, 0]
    }
    const midW = window.outerWidth / 2
    const midH = window.outerHeight / 2
    const left = midW + window.screenX - WIDTH / 2
    const top = midH + window.screenY - HEIGHT / 2
    return [left, top]
}

export function openPopup(url: UrlType) {
    closePopup()

    const size = `height=${HEIGHT},width=${WIDTH}`
    const pos = `top=${POS[1]},left=${POS[0]}`

    activePopup = window.open(url, 'OAuth', `${POPUP_VIEW},${size},${pos}`)

    activePopup?.focus()
}

export function closePopup() {
    if (exists(activePopup)) {
        activePopup.close()
        activePopup = null
    }
}

export function openInCurrent(url: UrlType | UrlProducer) {
    openUrl(url, navTo)
}

export function openInPopup(url: UrlType | UrlProducer) {
    openUrl(url, openPopup)
}

function navTo(url: UrlType) {
    window.location.replace(url)
}

function openUrl(url: UrlType | UrlProducer, method: (url: UrlType) => void) {
    if (isUrlType(url)) {
        method(url)
        return
    }

    url().then(res => {
        method(res)
    })
}
