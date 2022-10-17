import { ComicDetailsFormField, IComicDetailsForm } from './comic-details.types'

export const defaultComicDetailsFormValues: IComicDetailsForm = {
    [ComicDetailsFormField.Title]: '',
    [ComicDetailsFormField.ReleaseDate]: new Date(),
    [ComicDetailsFormField.Writers]: '',
    [ComicDetailsFormField.Description]: '',
}
