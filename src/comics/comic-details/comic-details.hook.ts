import { useEffect, useRef, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { useForm, UseFormReturn } from 'react-hook-form'
import { IComicDetailsForm } from './comic-details.types'
import { defaultComicDetailsFormValues } from './comic-details.constants'
import { comicDetailsValidation } from './comic-details.validation'
import { ComicsService } from '../comics.service'
import { ErrorHandler } from '../../core/services/error-handler'
import { ToastService } from '../../core/services/toast.service'
import { convertFormDataToPayload, retrieveFormValues } from './comic-details.utils'
import { IComic } from '../comics.types'

interface IComicDetailsHookState {
    loading: boolean
    form: UseFormReturn<IComicDetailsForm>
}

export interface IComicDetailsHook extends IComicDetailsHookState {
    createComic(payload: IComicDetailsForm): void
    updateComic(id: number, payload: IComicDetailsForm): void
    goBack(): void
}

export function useComicDetails(id: number | null): IComicDetailsHook {
    const [loading, setLoading] = useState<boolean>(false)
    const comicRef = useRef<IComic | null>(null)
    const navigate = useNavigate()

    const form = useForm<IComicDetailsForm>({
        defaultValues: defaultComicDetailsFormValues,
        mode: 'onBlur',
        resolver: yupResolver(comicDetailsValidation),
    })

    const { reset } = form

    useEffect(() => {
        async function init(comicId: number): Promise<void> {
            try {
                setLoading(true)
                const comic = await ComicsService.get(comicId)
                comicRef.current = comic
                reset(retrieveFormValues(comic))
            } catch (e) {
                ErrorHandler.handleError(e)
            } finally {
                setLoading(false)
            }
        }

        // Requesting the comic by ID and resetting the form state
        if (id) {
            void init(id)
        }
    }, [id, reset])

    const goBack = (): void => {
        navigate('/comics')
    }

    const createComic = async (payload: IComicDetailsForm): Promise<void> => {
        try {
            await ComicsService.create(convertFormDataToPayload(payload))
            navigate('/comics')
            ToastService.showSuccess(`Comic ${payload.title} has been created.`)
        } catch (e) {
            ErrorHandler.handleError(e)
        }
    }

    const updateComic = async (id: number, payload: IComicDetailsForm): Promise<void> => {
        try {
            await ComicsService.update({ id, ...convertFormDataToPayload(payload, comicRef.current) })
            navigate('/comics')
            ToastService.showSuccess(`Comic ${payload.title} has been updated.`)
        } catch (e) {
            ErrorHandler.handleError(e)
        }
    }

    return {
        loading,
        form,
        createComic,
        updateComic,
        goBack,
    }
}
