import { AxiosRequestConfig } from 'axios'
import { httpClientConstants } from './http-client.constants'

export function httpClientRequestFulfillInterceptor(config: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig> {
    const { params } = config

    // Setting up the public API key for every request
    params.apikey ??= httpClientConstants.apiKey

    return config
}

export function httpClientRequestErrorInterceptor(error: Error): Promise<string> {
    return Promise.reject(error)
}
