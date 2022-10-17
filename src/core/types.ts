export enum AppMode {
    Development = 'development',
    Production = 'production',
}

export interface IResponse<TData> {
    code: number
    status: string
    data: IResponseData<TData>
}

export interface IResponseData<TData> extends IPaginationMeta {
    results: TData[]
}

export interface IPaginationParams {
    offset: number
    limit: number
}

export interface IPaginationMeta {
    offset: number
    limit: number
    total: number
}

export interface IPaginationResponse<TData> {
    data: TData[]
    meta: IPaginationMeta
}
