import { exists } from '@game-core/utils/CommonFunc'
import { Nullable } from '@game-core/utils/CommonTypes'
import { isUrlType, UrlProducer, UrlType } from '@utils/url/helpers'
import { getWindow } from '@utils/document'

let activePopup: Nullable<Window> = null
const Height = 700
const Width = 600
const Pos = calcCenter()
const PopupView =
    'toolbar=no,scrollbars=no' + ',location=no,statusbar=no,menubar=no'

function calcCenter(): [number, number] {
    if (!getWindow()) {
        return [0, 0]
    }
    const midW = window.outerWidth / 2
    const midH = window.outerHeight / 2
    const left = midW + window.screenX - Width / 2
    const top = midH + window.screenY - Height / 2
    return [left, top]
}

export function openPopup(url: UrlType) {
    closePopup()

    const size = `height=${Height},width=${Width}`
    const pos = `top=${Pos[1]},left=${Pos[0]}`

    activePopup = window.open(url, 'OAuth', `${PopupView},${size},${pos}`)

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
