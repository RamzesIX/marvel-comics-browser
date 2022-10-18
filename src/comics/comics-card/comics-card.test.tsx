import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ComicsCard, comicsCardDeleteButtonLabel, comicsCardSpinnerTestId, comicsCardUpdateButtonLabel } from './comics-card'
import { globalConstants } from '../../core/constants'
import { ComicCreatorRole, IComicCreator } from '../comics.types'
import { defineCreatorsLabel } from './comics-card.utils'
import { formatDate } from '../../core/utils'
import { IComicsCardProps } from './comics-card.types'

const id = 1
const title = 'Spider Man'
const uri = globalConstants.externalLinks.marvelWebsite

function renderCard(
    title: string,
    uri: string,
    thumbnail: string = '',
    creators: IComicCreator[] = [],
    date: string = new Date().toISOString(),
    onUpdate: IComicsCardProps['onUpdate'] = jest.fn(),
    onDelete: IComicsCardProps['onDelete'] = jest.fn()
): void {
    render(
        <ComicsCard
            id={id}
            title={title}
            uri={uri}
            thumbnail={thumbnail}
            releaseDate={date}
            creators={creators}
            onUpdate={onUpdate}
            onDelete={onDelete}
        />
    )
}

describe('ComicsCard', () => {
    it('should render the correct title', () => {
        renderCard(title, uri)
        const linkElement = screen.getByRole('link')
        expect(linkElement).toHaveTextContent(title)
        expect(linkElement).toHaveAttribute('href', uri)
    })

    it('should render the correct image', () => {
        const thumbnail = 'image.jpg'
        renderCard(title, uri, thumbnail)
        expect(screen.getByRole('img')).toHaveAttribute('src', thumbnail)
    })

    it('should render the correct list of creators and release date', () => {
        const creators: IComicCreator[] = [
            {
                role: ComicCreatorRole.Writer,
                name: 'Writer',
                resourceURI: '',
            },
            {
                role: ComicCreatorRole.Inker,
                name: 'Inker',
                resourceURI: '',
            },
        ]
        const date = new Date().toISOString()

        renderCard(title, uri, '', creators, date)

        expect(screen.getByTestId('comics-card-creators')).toHaveTextContent(defineCreatorsLabel(creators))
        expect(screen.getByTestId('comics-card-date')).toHaveTextContent(formatDate(date))
    })

    it('should handle update action', async () => {
        const onUpdate = jest.fn()
        renderCard(title, uri, '', undefined, undefined, onUpdate)
        const updateButton = screen.getByTitle(comicsCardUpdateButtonLabel)

        console.log(updateButton.id)
        // Checking that update event handler is triggered
        fireEvent.click(updateButton)
        expect(onUpdate).toHaveBeenCalledWith(id)
        await waitFor(() => expect(screen.getByTestId(comicsCardSpinnerTestId)).toBeInTheDocument())
    })

    it('should handle delete action', async () => {
        const onDelete = jest.fn()
        renderCard(title, uri, '', undefined, undefined, undefined, onDelete)
        const deleteButton = screen.getByTitle(comicsCardDeleteButtonLabel)

        // Checking that delete event handler is triggered as well as the spinner is shown after that
        fireEvent.click(deleteButton)
        expect(onDelete).toHaveBeenCalledWith(id)
        await waitFor(() => expect(screen.getByTestId(comicsCardSpinnerTestId)).toBeInTheDocument())
    })
})
