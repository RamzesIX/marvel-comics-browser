import { FC, MouseEventHandler } from 'react'
import { SpinnerDotted } from 'spinners-react'
import * as styles from './button.module.scss'
import { cls } from '../../core/utils'

export interface IAppButtonProps {
    disabled?: boolean
    label: string
    type?: 'button' | 'submit'
    loading?: boolean
    className?: string
    onClick?: MouseEventHandler
}

export const appButtonSpinnerTestId = 'app-button-spinner-test-id'
const spinnerSize = 20

export const AppButton: FC<IAppButtonProps> = ({ label, disabled = false, loading = false, type = 'button', className, onClick }) => {
    return (
        <button className={cls(styles.appButton, className)} type={type} onClick={onClick} disabled={disabled || loading}>
            <SpinnerDotted data-testid={appButtonSpinnerTestId} className={styles.spinner} size={spinnerSize} enabled={loading} />
            <span className={cls(styles.label, loading ? styles.labelHidden : '')}>{label}</span>
        </button>
    )
}
