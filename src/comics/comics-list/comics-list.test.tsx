import { act, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ComicsList } from './comics-list'
import { ComicRoutingAction } from '../comics.types'
import { globalConstants } from '../../core/constants'

const getAllMock = jest.fn().mockResolvedValue({ data: [], meta: { total: 0, offset: 0, limit: 10 } })

jest.mock<typeof import('../comics.service')>('../comics.service', () => ({
    ComicsService: {
        ...jest.requireActual('../comics.service').ComicsService,
        getAll: (params) => getAllMock(params),
    },
}))

const navigateMock = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => navigateMock,
}))

describe('ComicsList', () => {
    beforeEach(async () => {
        const route = `/comics`
        await act(() => {
            render(
                <MemoryRouter initialEntries={[route]}>
                    <Routes>
                        <Route path={route} element={<ComicsList />} />
                    </Routes>
                </MemoryRouter>
            )
        })
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should render the title', () => {
        expect(screen.getByRole('heading', { name: 'Comics' })).toBeInTheDocument()
    })

    it('should request data on init', () => {
        expect(getAllMock).toHaveBeenCalledWith({ offset: 0, limit: globalConstants.paginationLimit })
    })

    it('should redirect to Create Comic page', () => {
        fireEvent.click(screen.getByRole('button', { name: 'Create New' }))
        expect(navigateMock).toHaveBeenCalledWith(`/comics/${ComicRoutingAction.Create}`)
    })
})
