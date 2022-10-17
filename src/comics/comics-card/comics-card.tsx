import { FC, useMemo, useState } from 'react'
import { SpinnerDotted } from 'spinners-react'
import { IComicsCardProps } from './comics-card.types'
import * as styles from './comics-card.module.scss'
import { cls, formatDate } from '../../core/utils'
import { defineCreatorsLabel } from './comics-card.utils'
import { AppIconButton } from '../../components/icon-button/icon-button'
import { IconId } from '../../components/svg-icon/svg-icon.types'
import { ErrorHandler } from '../../core/services/error-handler'

export const comicsCardSpinnerTestId = 'comics-card-spinner-test-id'

const spinnerSize: number = 30

export const ComicsCard: FC<IComicsCardProps> = ({ id, title, uri, creators, thumbnail, releaseDate, description, onDelete, onUpdate }) => {
    const [loading, setLoading] = useState<boolean>(false)

    const creatorsToDisplay = useMemo(() => defineCreatorsLabel(creators), [creators])

    const handleDelete = async () => {
        try {
            setLoading(true)
            await onDelete(id)
        } catch (e) {
            ErrorHandler.handleError(e)
        } finally {
            setLoading(false)
        }
    }

    const handleUpdate = async () => {
        try {
            setLoading(true)
            await onUpdate(id)
        } catch (e) {
            ErrorHandler.handleError(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div key={id} className={styles.comicsCard}>
            <img src={thumbnail} className={styles.thumbnail} alt={`${title} thumbnail`} />
            <a href={uri} target="_blank" className={styles.title} rel="noreferrer">
                {title}
            </a>
            <section className={styles.actions}>
                <SpinnerDotted
                    size={spinnerSize}
                    data-testid={comicsCardSpinnerTestId}
                    className={styles.listFooterSpinner}
                    enabled={loading}
                />
                {!loading && (
                    <>
                        <AppIconButton label="Update comic" icon={IconId.Edit} onClick={handleUpdate} />
                        <AppIconButton label="Delete comic" icon={IconId.Delete} onClick={handleDelete} />
                    </>
                )}
            </section>
            <section className={styles.date}>
                <p className={styles.primaryText}>Published: </p>
                <p data-testid="comics-card-date" className={styles.secondaryText}>
                    {formatDate(releaseDate)}
                </p>
            </section>
            <section className={styles.creators} hidden={!creatorsToDisplay.length}>
                <p className={styles.primaryText}>Creators: </p>
                <p data-testid="comics-card-creators" className={cls('app-text-truncated', styles.secondaryText)}>
                    {creatorsToDisplay}
                </p>
            </section>
            <p className={styles.description}>{description}</p>
        </div>
    )
}
