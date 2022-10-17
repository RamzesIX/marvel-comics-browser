import { ComicDateType, ComicTextObjectType, ComicUrlType, IComic } from './comics.types'
import { globalConstants } from '../core/constants'

export function getComicsThumbnailUri({ thumbnail }: IComic): string {
    return thumbnail.path && thumbnail.extension ? `${thumbnail.path}.${thumbnail.extension}` : ''
}

export function getComicsReleaseDate({ dates }: IComic): string {
    const date = dates.find(({ type }) => type === ComicDateType.OnSaleDate)
    return date?.date ?? new Date().toISOString()
}

export function getComicsDescription({ textObjects }: IComic): string {
    const date = textObjects.find(({ type }) => type === ComicTextObjectType.IssueSolicitText)
    return date?.text ?? ''
}

export function getComicsUrl({ urls }: IComic): string {
    const date = urls.find(({ type }) => type === ComicUrlType.Detail)
    return date?.url ?? globalConstants.externalLinks.marvelWebsite
}
