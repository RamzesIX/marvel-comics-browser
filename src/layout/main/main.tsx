import { FC } from 'react'
import { AppHeader } from '../header/header'
import * as styles from './main.module.scss'
import { AppFooter } from '../footer/footer'

export const AppMain: FC = () => {
    return (
        <div className={styles.main}>
            <AppHeader />
            <main className={styles.content}>
                <div>Some Content</div>
            </main>
            <AppFooter />
        </div>
    )
}
