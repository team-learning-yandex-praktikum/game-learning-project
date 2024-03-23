import { JsxElementAttributes } from '@types'

export type TitleColor = 'main' | 'secondary'

export interface TitleProps extends Pick<JsxElementAttributes, 'className'> {
    children: string
    color?: TitleColor
}
