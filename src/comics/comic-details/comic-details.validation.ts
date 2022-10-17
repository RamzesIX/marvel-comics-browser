import * as yup from 'yup'
import { validationMessage } from '../../core/validation'
import { ComicDetailsFormField } from './comic-details.types'

export const comicDetailsValidation = yup.object({
    [ComicDetailsFormField.Title]: yup.string().required(validationMessage.isRequired),
    [ComicDetailsFormField.Description]: yup.string().optional(),
    [ComicDetailsFormField.ReleaseDate]: yup.date().typeError(validationMessage.isRequired).required(validationMessage.isRequired),
    [ComicDetailsFormField.Creators]: yup.string().required(validationMessage.isRequired),
})
