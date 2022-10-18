import { ComicCreatorRole, ComicDateType, ComicTextObjectType, IComic } from '../comics.types'

export const comicMock: IComic = {
    id: 216,
    resourceURI: '',
    title: 'Venom (2003) #6',
    textObjects: [
        {
            type: ComicTextObjectType.IssueSolicitText,
            language: 'en-us',
            text: 'description',
        },
    ],
    urls: [],
    dates: [
        {
            type: ComicDateType.OnSaleDate,
            date: '2003-10-15T00:00:00-0400',
        },
    ],

    thumbnail: {
        path: 'http://i.annihil.us/u/prod/marvel/i/mg/7/40/5a397f745c77c',
        extension: 'jpg',
    },
    creators: {
        available: 2,
        returned: 2,
        collectionURI: 'http://gateway.marvel.com/v1/public/comics/216/creators',
        items: [
            {
                resourceURI: 'http://gateway.marvel.com/v1/public/creators/208',
                name: 'Paco Medina',
                role: ComicCreatorRole.Writer,
            },
            {
                resourceURI: 'http://gateway.marvel.com/v1/public/creators/413',
                name: 'Juan Vlasco',
                role: ComicCreatorRole.Inker,
            },
        ],
    },
}
