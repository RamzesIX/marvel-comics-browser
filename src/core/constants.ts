export interface IExternalLinks {
    marvelWebsite: string
}

export interface IGlobalConstants {
    externalLinks: IExternalLinks
}

export const globalConstants: IGlobalConstants = {
    externalLinks: {
        marvelWebsite: 'https://marvel.com',
    },
}
