import { IAccessibilityProps } from '../types'

export enum IconId {
    IronMan = 'iron-man',
}

export interface ISvgIconProps extends IAccessibilityProps {
    iconId: IconId
    className?: string
    hidden?: boolean
}
