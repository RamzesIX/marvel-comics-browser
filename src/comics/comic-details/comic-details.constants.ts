import { ComicDetailsFormField, IComicDetailsForm } from './comic-details.types'
import { IComicThumbnail } from '../comics.types'

export const defaultComicDetailsFormValues: IComicDetailsForm = {
    [ComicDetailsFormField.Title]: '',
    [ComicDetailsFormField.ReleaseDate]: new Date(),
    [ComicDetailsFormField.Creators]: '',
    [ComicDetailsFormField.Description]: '',
}

export const defaultThumbnail: IComicThumbnail = {
    path: 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available',
    extension: 'jpg',
}

export const comicDetailsCreateTitle = 'Comic Create'
export const comicDetailsUpdateTitle = 'Comic Update'
