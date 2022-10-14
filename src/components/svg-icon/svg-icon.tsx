import { FC } from 'react'
import { ISvgIconProps } from './svg-icon.types'

import * as styles from './svg-icon.module.scss'
import { cls } from '../../core/utils'
import { getPathToIcon } from './svg-icon.utils'

export const SvgIcon: FC<ISvgIconProps> = ({ iconId, className, ['aria-label']: ariaLabel, hidden = false }) => (
    <svg
        data-testid="svg-icon"
        aria-label={ariaLabel ?? `SVG icon ${iconId}`}
        className={cls(styles.svgIcon, className, hidden ? styles.svgIconHidden : '')}
    >
        <use data-testid="svg-icon-use" xlinkHref={getPathToIcon(iconId)} />
    </svg>
)
