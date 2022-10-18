export enum ComicDetailsFormField {
    Title = 'title',
    ReleaseDate = 'releaseDate',
    Creators = 'creators',
    Description = 'description',
}

export interface IComicDetailsForm {
    [ComicDetailsFormField.Title]: string
    [ComicDetailsFormField.ReleaseDate]: Date
    [ComicDetailsFormField.Creators]: string // TODO update me
    [ComicDetailsFormField.Description]: string
}
