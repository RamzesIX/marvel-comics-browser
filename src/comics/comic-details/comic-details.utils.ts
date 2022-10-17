import { IComic } from '../comics.types'
import { ComicDetailsFormField, IComicDetailsForm } from './comic-details.types'
import { getComicsDescription, getComicsReleaseDate } from '../comics.utils'

export function retrieveFormValues(comic: IComic): IComicDetailsForm {
    return {
        [ComicDetailsFormField.Title]: comic.title,
        [ComicDetailsFormField.ReleaseDate]: new Date(getComicsReleaseDate(comic)),
        [ComicDetailsFormField.Writers]: '',
        [ComicDetailsFormField.Description]: getComicsDescription(comic),
    }
}
