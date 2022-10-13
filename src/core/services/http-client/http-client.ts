import axios from 'axios'
import { httpClientConstants } from './http-client.constants'
import { httpClientRequestErrorInterceptor, httpClientRequestFulfillInterceptor } from './http-client-request-interceptor'

// HttpClient is used as the wrapper for Axios instance.
// It also adds abstraction (we may decide to replace Axios with another library but the interface will stay the same)
// and comes with already preconfigured base API url and interceptors.
export const HttpClient = axios.create({
    baseURL: httpClientConstants.baseUrl,
})

HttpClient.interceptors.request.use(httpClientRequestFulfillInterceptor, httpClientRequestErrorInterceptor)

// TODO use an interface that is not bound to Axios api
export type IHttpClient = typeof HttpClient
