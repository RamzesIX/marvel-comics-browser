import { IComicCreator } from '../comics.types'

export interface IComicsCardProps {
    id: number
    title: string
    uri: string
    thumbnail: string
    releaseDate: string
    description?: string
    creators: IComicCreator[]
}
