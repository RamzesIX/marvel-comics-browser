export interface IExternalLinks {
    marvelWebsite: string
}

export interface IGlobalConstants {
    externalLinks: IExternalLinks
    toastDuration: number
    paginationLimit: 20
}

export const globalConstants: IGlobalConstants = {
    toastDuration: 4000,
    paginationLimit: 20,
    externalLinks: {
        marvelWebsite: 'https://marvel.com',
    },
}
