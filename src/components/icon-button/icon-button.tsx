import { FC, MouseEventHandler } from 'react'
import { SpinnerDotted } from 'spinners-react'
import * as styles from './icon-button.module.scss'
import { cls } from '../../core/utils'
import { SvgIcon } from '../svg-icon/svg-icon'
import { IconId } from '../svg-icon/svg-icon.types'

export interface IAppIconButtonProps {
    disabled?: boolean
    label: string
    icon: IconId
    loading?: boolean
    className?: string
    onClick: MouseEventHandler
}

export const appIconButtonSpinnerTestId = 'app-icon-button-spinner-test-id'

const spinnerSize = 20

export const AppIconButton: FC<IAppIconButtonProps> = ({ label, loading = false, disabled = false, icon, className, onClick }) => {
    return (
        <button
            title={label}
            className={cls(styles.appIconButton, className)}
            type="button"
            onClick={onClick}
            disabled={disabled || loading}
        >
            <SpinnerDotted
                data-testid={appIconButtonSpinnerTestId}
                className={styles.listFooterSpinner}
                size={spinnerSize}
                enabled={loading}
            />
            {!loading && <SvgIcon iconId={icon} />}
        </button>
    )
}
