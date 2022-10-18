import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { Controller } from 'react-hook-form'
import { useComicDetails } from './comic-details.hook'
import * as styles from './comic-details.module.scss'
import { ComicDetailsFormField, IComicDetailsForm } from './comic-details.types'
import { AppInput } from '../../components/input/input'
import { AppButton } from '../../components/button/button'
import { AppDatepicker } from '../../components/datepicker/datepicker'
import { AppTextarea } from '../../components/textarea/textarea'
import { comicDetailsCreateTitle, comicDetailsUpdateTitle } from './comic-details.constants'

export const ComicDetails: FC = () => {
    const { id } = useParams()
    const comicId = id ? Number(id) : null
    const { form, loading, goBack, updateComic, createComic } = useComicDetails(comicId)

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = form

    const actionLabel = id ? comicDetailsUpdateTitle : comicDetailsCreateTitle

    const createOrUpdateComic = async (data: IComicDetailsForm): Promise<void> => {
        if (comicId) {
            await updateComic(comicId, data)
        } else {
            await createComic(data)
        }
    }

    return (
        <div className={styles.comicDetails}>
            <h1>{actionLabel}</h1>
            <form className={styles.form} onSubmit={handleSubmit(createOrUpdateComic)}>
                <Controller
                    name={ComicDetailsFormField.Title}
                    control={control}
                    render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
                        <AppInput
                            name={name}
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            disabled={loading}
                            error={error?.message}
                            label="Title"
                        />
                    )}
                />
                <Controller
                    name={ComicDetailsFormField.ReleaseDate}
                    control={control}
                    render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
                        <AppDatepicker
                            name={name}
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            disabled={loading}
                            error={error?.message}
                            label="Release Date"
                        />
                    )}
                />
                <Controller
                    name={ComicDetailsFormField.Creators}
                    control={control}
                    render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
                        <AppInput
                            name={name}
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            disabled={loading}
                            error={error?.message}
                            placeholder="John Doe, Jane Doe"
                            label="Creators"
                        />
                    )}
                />
                <Controller
                    name={ComicDetailsFormField.Description}
                    control={control}
                    render={({ field: { value, onChange, onBlur, name }, fieldState: { error } }) => (
                        <AppTextarea
                            name={name}
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            disabled={loading}
                            error={error?.message}
                            label="Description"
                        />
                    )}
                />
                <section className={styles.buttons}>
                    <AppButton label="Cancel" onClick={goBack} disabled={isSubmitting} />
                    <AppButton label="Submit" type="submit" loading={isSubmitting} />
                </section>
            </form>
        </div>
    )
}
