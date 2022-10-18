import { useNavigate } from 'react-router-dom'
import { ComicRoutingAction, IComic } from '../comics.types'
import { IPaginationHook } from '../../core/hooks/pagination/pagination.hook.types'
import { usePagination } from '../../core/hooks/pagination/pagination.hook'
import { ComicsService } from '../comics.service'
import { ErrorHandler } from '../../core/services/error-handler'
import { ToastService } from '../../core/services/toast.service'

export interface IComicsListHook extends IPaginationHook<IComic> {
    deleteComics(id: number): Promise<void>
    navigateToComicDetails(id: number | null): void
}

const loadDataFn = ComicsService.getAll.bind(ComicsService)

export function useComicsList(): IComicsListHook {
    const navigate = useNavigate()
    const state = usePagination<IComic>(loadDataFn)

    const { getData, setData } = state

    const deleteComics = async (id: number) => {
        try {
            await ComicsService.delete(id)
            const data = getData().filter(({ id: comicId }) => id !== comicId)
            setData(data)
            ToastService.showSuccess('Comic has been deleted.')
        } catch (e) {
            ErrorHandler.handleError(e)
        }
    }

    const navigateToComicDetails = (id: number | null) => {
        const path = id ? `/comics/${ComicRoutingAction.Update}/${id}` : `/comics/${ComicRoutingAction.Create}`
        navigate(path)
    }

    return {
        ...state,
        deleteComics,
        navigateToComicDetails,
    }
}
