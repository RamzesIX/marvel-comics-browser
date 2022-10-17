import { useNavigate } from 'react-router-dom'
import { ComicRoutingAction, IComic } from '../comics.types'
import { IPaginationHook } from '../../core/hooks/pagination/pagination.hook.types'
import { usePagination } from '../../core/hooks/pagination/pagination.hook'
import { ComicsService } from '../comics.service'

export interface IComicsListHook extends IPaginationHook<IComic> {
    createComics(): void
    updateComics(id: number): void
    deleteComics(id: number): void
    navigateToComicDetails(id: number | null): void
}

const loadDataFn = ComicsService.getAll.bind(ComicsService)

export function useComicsList(): IComicsListHook {
    const navigate = useNavigate()
    const state = usePagination<IComic>(loadDataFn)

    const createComics = () => {
        console.log('Create a comics here.')
    }

    const updateComics = (id: number) => {
        console.log('Update a comics here.', id)
    }

    const deleteComics = (id: number) => {
        console.log('Delete a comics here.', id)
    }

    const navigateToComicDetails = (id: number | null) => {
        const path = id ? `/comics/${ComicRoutingAction.Update}/${id}` : `/comics/${ComicRoutingAction.Create}`
        navigate(path)
    }

    return {
        ...state,
        createComics,
        updateComics,
        deleteComics,
        navigateToComicDetails,
    }
}
