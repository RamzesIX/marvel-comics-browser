import { AppMode } from './types'

export interface IGlobalConstants {
    mode: AppMode
}

export const globalConstants: IGlobalConstants = {
    mode: import.meta.env.MODE as AppMode,
}
