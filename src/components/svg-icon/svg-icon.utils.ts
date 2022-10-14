import { IconId } from './svg-icon.types'

export function getPathToIcon(icon: IconId): string {
    return `/icons/icons.svg#${icon}`
}
