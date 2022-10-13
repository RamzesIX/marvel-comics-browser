export interface IHttpClientConstants {
    baseUrl: string
    apiKey: string
}

export const httpClientConstants: IHttpClientConstants = {
    baseUrl: import.meta.env.VITE_API_BASE_URL ?? '',
    apiKey: import.meta.env.VITE_API_KEY ?? '',
}
