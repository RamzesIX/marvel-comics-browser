export interface IExternalLinks {
    marvelWebsite: string
}

export interface IGlobalConstants {
    externalLinks: IExternalLinks
    toastDuration: number
}

export const globalConstants: IGlobalConstants = {
    toastDuration: 4000,
    externalLinks: {
        marvelWebsite: 'https://marvel.com',
    },
}
