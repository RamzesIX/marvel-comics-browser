export enum ComicDetailsFormField {
    Title = 'title',
    ReleaseDate = 'releaseDate',
    Writers = 'writers',
    Description = 'description',
}

export interface IComicDetailsForm {
    [ComicDetailsFormField.Title]: string
    [ComicDetailsFormField.ReleaseDate]: Date
    [ComicDetailsFormField.Writers]: string // TODO update me
    [ComicDetailsFormField.Description]: string
}
