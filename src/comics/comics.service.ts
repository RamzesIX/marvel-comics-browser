import { IPaginationParams, IPaginationResponse, IResponse } from '../core/types'
import { IComic } from './comics.types'
import { HttpClient, IHttpClient } from '../core/services/http-client/http-client'

export interface IComicsService {
    getAll(params: IPaginationParams): Promise<IPaginationResponse<IComic>>
    get(id: number): Promise<IComic>
}

class ComicsServiceImpl implements IComicsService {
    constructor(private readonly httpClient: IHttpClient) {}

    public async getAll(params: IPaginationParams): Promise<IPaginationResponse<IComic>> {
        const {
            data: {
                data: { results, offset, limit, total },
            },
        } = await this.httpClient.get<IResponse<IComic>>('/comics', { params })

        return {
            data: results,
            meta: {
                offset,
                limit,
                total,
            },
        }
    }

    public async get(id: number): Promise<IComic> {
        const {
            data: {
                data: { results },
            },
        } = await this.httpClient.get<IResponse<IComic>>(`/comics/${id}`)

        if (!Array.isArray(results) || !results.length) {
            throw new Error(`Comics with Id:${id} is not found.`)
        }
        return results[0]
    }
}

export const ComicsService = new ComicsServiceImpl(HttpClient)
