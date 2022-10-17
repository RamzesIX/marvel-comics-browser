import { IPaginationParams, IPaginationResponse, IResponse } from '../core/types'
import { ComicDateType, ComicTextObjectType, ComicUrlType, IComic, ICreateComicPayload, IUpdateComicPayload } from './comics.types'
import { HttpClient, IHttpClient } from '../core/services/http-client/http-client'
import { globalConstants } from '../core/constants'
import { delay } from '../core/utils'

export interface IComicsService {
    getAll(params: IPaginationParams): Promise<IPaginationResponse<IComic>>
    get(id: number): Promise<IComic>
    create(payload: ICreateComicPayload): Promise<void>
    update(payload: IUpdateComicPayload): Promise<void>
    delete(id: number): Promise<void>
}

class ComicsServiceImpl implements IComicsService {
    private createdItems: Map<number, IComic> = new Map<number, IComic>()
    private updatedItems: Map<number, IComic> = new Map<number, IComic>()
    private deletedItems: Set<number> = new Set<number>()

    constructor(private readonly httpClient: IHttpClient) {}

    public async getAll(params: IPaginationParams): Promise<IPaginationResponse<IComic>> {
        const {
            data: {
                data: { results, offset, limit, total },
            },
        } = await this.httpClient.get<IResponse<IComic>>('/comics', { params })

        const processedData: IComic[] = [...this.createdItems.values()]

        for (const comic of results) {
            if (this.deletedItems.has(comic.id)) {
                continue
            }
            if (this.updatedItems.has(comic.id)) {
                processedData.push(this.updatedItems.get(comic.id) as IComic)
            } else {
                processedData.push(comic)
            }
        }

        return {
            data: processedData,
            meta: {
                offset,
                limit,
                total,
            },
        }
    }

    public async get(id: number): Promise<IComic> {
        if (this.createdItems.has(id)) {
            return this.createdItems.get(id) as IComic
        }

        if (this.updatedItems.has(id)) {
            return this.updatedItems.get(id) as IComic
        }
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

    public async create(payload: ICreateComicPayload): Promise<void> {
        await delay(2000)
        const comic = this.getComicFromPayload(Date.now(), payload)
        this.createdItems.set(comic.id, comic)
    }

    public async update({ id, ...payload }: IUpdateComicPayload): Promise<void> {
        await delay(2000)
        const comic = this.getComicFromPayload(id, payload)
        this.updatedItems.set(comic.id, comic)
    }

    public async delete(id: number): Promise<void> {
        await delay(2000)
        this.deletedItems.add(id)
        this.createdItems.delete(id)
        this.updatedItems.delete(id)
    }

    private getComicFromPayload(id: number, { title, thumbnail, creators, description, releaseDate }: ICreateComicPayload): IComic {
        return {
            id,
            title,
            resourceURI: '',
            thumbnail,
            dates: [
                {
                    date: releaseDate.toISOString(),
                    type: ComicDateType.OnSaleDate,
                },
            ],
            textObjects: [
                {
                    text: description,
                    language: 'en-us',
                    type: ComicTextObjectType.IssueSolicitText,
                },
            ],
            creators: {
                available: creators.length,
                items: creators,
                returned: creators.length,
                collectionURI: '',
            },
            urls: [
                {
                    url: globalConstants.externalLinks.marvelWebsite,
                    type: ComicUrlType.Detail,
                },
            ],
        }
    }
}

export const ComicsService = new ComicsServiceImpl(HttpClient)
