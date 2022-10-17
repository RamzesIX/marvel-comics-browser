export interface IComic {
    id: number
    title: string
    resourceURI: string
    thumbnail: IComicThumbnail
    dates: IComicDate[]
    textObjects: IComicTextObject[]
    creators: IComicCreators
    urls: IComicUrl[]
}

export interface IComicThumbnail {
    path: string
    extension: string
}

export interface IComicDate {
    type: ComicDateType
    date: string
}

export enum ComicDateType {
    OnSaleDate = 'onsaleDate',
    FocDate = 'focDate',
}

export interface IComicCreators {
    available: number
    returned: number
    collectionURI: string
    items: IComicCreator[]
}

// TODO comlete me
export enum ComicCreatorRole {
    Writer = 'writer',
    Penciller = 'penciller',
    Letterer = 'letterer',
    Inker = 'inker',
    Colorist = 'colorist',
}

export interface IComicCreator {
    resourceURI: string
    name: string
    role: ComicCreatorRole
}

// TODO complete me
export enum ComicTextObjectType {
    IssueSolicitText = 'issue_solicit_text',
}

export interface IComicTextObject {
    type: ComicTextObjectType
    text: string
    language: string
}

export enum ComicUrlType {
    Detail = 'detail',
    Purchase = 'purchase',
}

export interface IComicUrl {
    type: ComicUrlType
    url: string
}

export enum ComicRoutingAction {
    Create = 'create',
    Update = 'update',
}

export interface ICreateComicPayload {
    creators: IComicCreator[]
    title: string
    thumbnail: IComicThumbnail
    description: string
    releaseDate: Date
}

export interface IUpdateComicPayload extends ICreateComicPayload {
    id: number
}
