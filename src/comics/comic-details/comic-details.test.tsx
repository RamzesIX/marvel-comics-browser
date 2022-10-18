import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ComicRoutingAction } from '../comics.types'
import { ComicDetails } from './comic-details'
import { comicDetailsCreateTitle, comicDetailsUpdateTitle, defaultComicDetailsFormValues } from './comic-details.constants'
import { ComicsService } from '../comics.service'
import { ComicDetailsFormField, IComicDetailsForm } from './comic-details.types'
import { formatDate } from '../../core/utils'
import { comicMock } from '../mocks/comic'
import { retrieveFormValues } from './comic-details.utils'

ComicsService.get = jest.fn().mockResolvedValue(comicMock)
ComicsService.update = jest.fn()
ComicsService.create = jest.fn()

const navigateMock = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => navigateMock,
}))

describe('ComicDetails.create', () => {
    beforeEach(() => {
        const createRoute = `/comics/${ComicRoutingAction.Create}`
        render(
            <MemoryRouter initialEntries={[createRoute]}>
                <Routes>
                    <Route path="/comics" element={<div />} />
                    <Route path={createRoute} element={<ComicDetails />} />
                </Routes>
            </MemoryRouter>
        )
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should render create page', () => {
        expect(screen.getByText(comicDetailsCreateTitle)).toBeInTheDocument()
    })

    it('should not request Comic data from the server', async () => {
        await waitFor(() => expect(ComicsService.get).not.toHaveBeenCalled())
    })

    it('should display required errors when the form is empty', async () => {
        fireEvent.submit(screen.getByRole('button', { name: 'Submit' }))

        // Title and Creators controls should be marked as Required as the Release Date has default value
        expect(await screen.findAllByRole('alert')).toHaveLength(2)
        expect(ComicsService.create).not.toHaveBeenCalled()
    })

    it('should init the form with default values', async () => {
        const [title, releaseDate, creators, description] = screen.getAllByRole<HTMLInputElement>('textbox')
        expect(title.value).toBe(defaultComicDetailsFormValues[ComicDetailsFormField.Title])

        const dateValue = formatDate(defaultComicDetailsFormValues[ComicDetailsFormField.ReleaseDate].toISOString())
        expect(releaseDate.value).toBe(dateValue)

        expect(description.value).toBe(defaultComicDetailsFormValues[ComicDetailsFormField.Description])

        expect(creators.value).toBe(defaultComicDetailsFormValues[ComicDetailsFormField.Creators])
    })

    it('should submit the form', async () => {
        const [title, releaseDate, creators, description] = screen.getAllByRole<HTMLInputElement>('textbox')

        const data: IComicDetailsForm = {
            title: 'title',
            creators: 'test1, test2',
            releaseDate: new Date(),
            description: 'description',
        }

        fireEvent.input(title, { target: { value: data[ComicDetailsFormField.Title] } })
        fireEvent.input(releaseDate, { target: { value: formatDate(data[ComicDetailsFormField.ReleaseDate].toISOString()) } })
        fireEvent.input(creators, { target: { value: data[ComicDetailsFormField.Creators] } })
        fireEvent.input(description, { target: { value: data[ComicDetailsFormField.Description] } })

        fireEvent.submit(screen.getByRole('button', { name: 'Submit' }))

        // No validation errors should occur
        expect(await screen.queryAllByRole('alert')).toHaveLength(0)

        // ComicsService.create should be called
        await waitFor(() => expect(ComicsService.create).toHaveBeenCalled())
    })

    it('should navigate on Comics List page', () => {
        fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))

        expect(navigateMock).toHaveBeenCalledWith('/comics')
    })
})

describe('ComicDetails.update', () => {
    beforeEach(async () => {
        const updateRoute = `/comics/${ComicRoutingAction.Update}/${comicMock.id}`
        await act(() => {
            render(
                <MemoryRouter initialEntries={[updateRoute]}>
                    <Routes>
                        <Route path="/comics" element={<div />} />
                        <Route path={`/comics/${ComicRoutingAction.Update}/:id`} element={<ComicDetails />} />
                    </Routes>
                </MemoryRouter>
            )
        })
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should render update page', () => {
        expect(screen.getByText(comicDetailsUpdateTitle)).toBeInTheDocument()
    })

    it('should request Comic data from the server and init the form', async () => {
        expect(ComicsService.get).toHaveBeenCalledWith(comicMock.id)
        const [title, releaseDate, creators, description] = screen.getAllByRole<HTMLInputElement>('textbox')

        const formState = retrieveFormValues(comicMock)

        expect(title.value).toBe(formState[ComicDetailsFormField.Title])

        const dateValue = formatDate(formState[ComicDetailsFormField.ReleaseDate].toISOString())
        expect(releaseDate.value).toBe(dateValue)
        expect(description.value).toBe(formState[ComicDetailsFormField.Description])
        expect(creators.value).toBe(formState[ComicDetailsFormField.Creators])
    })

    it('should display required error when a control becomes empty', async () => {
        const [title] = screen.getAllByRole<HTMLInputElement>('textbox')
        fireEvent.input(title, { target: { value: '' } })
        fireEvent.blur(title)
        expect(await screen.findAllByRole('alert')).toHaveLength(1)
    })

    it('should submit the form', async () => {
        fireEvent.submit(screen.getByRole('button', { name: 'Submit' }))
        // No validation errors should occur
        expect(await screen.queryAllByRole('alert')).toHaveLength(0)

        // ComicsService.create should be called
        await waitFor(() => expect(ComicsService.update).toHaveBeenCalled())
    })
})
