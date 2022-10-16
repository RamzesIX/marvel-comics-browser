import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { AppHeader } from '../header/header'
import * as styles from './main.module.scss'
import { AppFooter } from '../footer/footer'

export const AppMain: FC = () => {
    return (
        <div className={styles.main}>
            <AppHeader />
            <main className={styles.content}>
                <Outlet />
            </main>
            <AppFooter />
        </div>
    )
}
