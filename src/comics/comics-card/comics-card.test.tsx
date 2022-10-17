import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ComicsCard } from './comics-card'
import { globalConstants } from '../../core/constants'
import { ComicCreatorRole, IComicCreator } from '../comics.types'
import { defineCreatorsLabel } from './comics-card.utils'
import { formatDate } from '../../core/utils'

const title = 'Spider Man'
const uri = globalConstants.externalLinks.marvelWebsite

describe('ComicsCard', () => {
    it('should render the correct title', () => {
        render(<ComicsCard id={1} title={title} uri={uri} thumbnail="" releaseDate="" creators={[]} />)
        const linkElement = screen.getByRole('link')
        expect(linkElement).toHaveTextContent(title)
        expect(linkElement).toHaveAttribute('href', uri)
    })

    it('should render the correct image', () => {
        const thumbnail = 'image.jpg'
        render(<ComicsCard id={1} title={title} uri={uri} thumbnail={thumbnail} releaseDate="" creators={[]} />)
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

        render(<ComicsCard id={1} title={title} uri={uri} thumbnail="" releaseDate={date} creators={creators} />)

        expect(screen.getByTestId('comics-card-creators')).toHaveTextContent(defineCreatorsLabel(creators))
        expect(screen.getByTestId('comics-card-date')).toHaveTextContent(formatDate(date))
    })
})
