import { FC } from 'react'
import { Toaster } from 'react-hot-toast'
import { AppMain } from './layout/main/main'

export const App: FC = () => {
    return (
        <>
            <AppMain />
            <Toaster />
        </>
    )
}
