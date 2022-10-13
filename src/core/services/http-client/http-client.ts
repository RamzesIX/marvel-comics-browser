import axios from 'axios'
import { httpClientConstants } from './http-client.constants'
import { httpClientRequestErrorInterceptor, httpClientRequestFulfillInterceptor } from './http-client-request-interceptor'

// HttpClient is used for base API url encapsulation
export const HttpClient = axios.create({
    baseURL: httpClientConstants.baseUrl,
})

HttpClient.interceptors.request.use(httpClientRequestFulfillInterceptor, httpClientRequestErrorInterceptor)

// TODO use an interface that is not bound to Axios api
export type IHttpClient = typeof HttpClient
