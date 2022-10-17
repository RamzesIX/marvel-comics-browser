import { FC, useMemo } from 'react'
import { IComicsCardProps } from './comics-card.types'
import * as styles from './comics-card.module.scss'
import { cls, formatDate } from '../../core/utils'
import { defineCreatorsLabel } from './comics-card.utils'

export const ComicsCard: FC<IComicsCardProps> = ({ id, title, uri, creators, thumbnail, releaseDate, description }) => {
    const creatorsToDisplay = useMemo(() => defineCreatorsLabel(creators), [creators])

    return (
        <div key={id} className={styles.comicsCard}>
            <img src={thumbnail} className={styles.thumbnail} alt={`${title} thumbnail`} />
            <a href={uri} target="_blank" className={styles.title} rel="noreferrer">
                {title}
            </a>
            <div className={styles.date}>
                <p className={styles.primaryText}>Published: </p>
                <p data-testid="comics-card-date" className={styles.secondaryText}>
                    {formatDate(releaseDate)}
                </p>
            </div>
            <div className={styles.creators} hidden={!creatorsToDisplay.length}>
                <p className={styles.primaryText}>Creators: </p>
                <p data-testid="comics-card-creators" className={cls('app-text-truncated', styles.secondaryText)}>
                    {creatorsToDisplay}
                </p>
            </div>
            <p className={styles.description}>{description}</p>
        </div>
    )
}
