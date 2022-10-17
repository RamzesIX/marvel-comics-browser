import { FC } from 'react'
import { Toaster } from 'react-hot-toast'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AppMain } from './layout/main/main'
import { ComicsList } from './comics/comics-list/comics-list'

export const App: FC = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<AppMain />}>
                    <Route path="/" element={<Navigate replace to="/comics" />} />
                    <Route path="/comics" element={<ComicsList />} />
                </Route>
            </Routes>
            <Toaster />
        </>
    )
}
