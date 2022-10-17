import { IComicCreator } from '../comics.types'

const maxCreatorsSize = 4

export function defineCreatorsLabel(creators: IComicCreator[]): string {
    return creators
        .slice(0, maxCreatorsSize)
        .map(({ name }) => name)
        .join(', ')
}
