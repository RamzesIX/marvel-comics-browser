import { FC } from 'react'
import * as styles from './footer.module.scss'
import { globalConstants } from '../../core/constants'

export const AppFooter: FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <p aria-label="Marvel Attribution" className={styles.footerAttribution}>
                    Data provided by Marvel &#169; 2014&nbsp;
                    <a href={globalConstants.externalLinks.marvelWebsite} target="_blank" rel="noreferrer">
                        Marvel.
                    </a>
                </p>
            </div>
        </footer>
    )
}
