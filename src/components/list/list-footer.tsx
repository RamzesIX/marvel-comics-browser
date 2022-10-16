import { FC } from 'react'
import { SpinnerDotted } from 'spinners-react'
import * as styles from './list.module.scss'

const spinnerSize: number = 30

export const appListFooterSpinnerTestId = 'app-list-footer-spinner'

export const AppListFooter: FC<{ loading: boolean }> = ({ loading }) => {
    return (
        <div className={styles.listFooter}>
            <SpinnerDotted
                data-testid={appListFooterSpinnerTestId}
                className={styles.listFooterSpinner}
                size={spinnerSize}
                enabled={loading}
            />
        </div>
    )
}
