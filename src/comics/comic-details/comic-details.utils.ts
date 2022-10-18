import { ComicCreatorRole, IComic, IComicCreator, ICreateComicPayload } from '../comics.types'
import { ComicDetailsFormField, IComicDetailsForm } from './comic-details.types'
import { getComicsDescription, getComicsReleaseDate } from '../comics.utils'
import { defaultThumbnail } from './comic-details.constants'

export function retrieveFormValues(comic: IComic): IComicDetailsForm {
    return {
        [ComicDetailsFormField.Title]: comic.title,
        [ComicDetailsFormField.ReleaseDate]: new Date(getComicsReleaseDate(comic)),
        [ComicDetailsFormField.Creators]: comic.creators.items.map(({ name }) => name).join(', '),
        [ComicDetailsFormField.Description]: getComicsDescription(comic),
    }
}

export function convertFormDataToPayload(data: IComicDetailsForm, comic: IComic | null = null): ICreateComicPayload {
    const creators: IComicCreator[] = data[ComicDetailsFormField.Creators].split(',').map((name) => ({
        resourceURI: '',
        role: ComicCreatorRole.Writer,
        name: name.trimStart().trimEnd(),
    }))

    return {
        description: data[ComicDetailsFormField.Description],
        title: data[ComicDetailsFormField.Title],
        releaseDate: data[ComicDetailsFormField.ReleaseDate],
        thumbnail: comic?.thumbnail ?? defaultThumbnail,
        creators,
    }
}
