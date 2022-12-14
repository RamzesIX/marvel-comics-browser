import { FC } from 'react'
import { Link } from 'react-router-dom'
import * as styles from './header.module.scss'
import { SvgIcon } from '../../components/svg-icon/svg-icon'
import { IconId } from '../../components/svg-icon/svg-icon.types'

export const AppHeader: FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <Link to="/comics" className={styles.headerLink}>
                    <SvgIcon aria-label="Logo" iconId={IconId.IronMan} className={styles.headerIcon} />
                    <h1 className={styles.headerTitle}>Marvel Comics</h1>
                </Link>
            </div>
        </header>
    )
}
