import { getWindow } from '@utils/document'

export const CanvasWidth = getWindow() ? window.innerWidth - 300 : 500
export const CanvasHeight = getWindow() ? window.innerHeight : CanvasWidth

export const MsInSec = 1000
export const Gravity = 10
export const LeftDirection = 'LeftDirection'
export const RightDirection = 'RightDirection'

export const textColor = 'white'
export const overlayColor = 'rgba(0, 0, 0, 0.3)'
