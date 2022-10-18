import { IAccessibilityProps } from '../types'

export enum IconId {
    IronMan = 'iron-man',
    Edit = 'edit-icon',
    Delete = 'delete-icon',
}

export interface ISvgIconProps extends IAccessibilityProps {
    iconId: IconId
    className?: string
    hidden?: boolean
}
