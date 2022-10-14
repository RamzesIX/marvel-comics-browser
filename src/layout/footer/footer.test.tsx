import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { AppFooter } from './footer'
import { globalConstants } from '../../core/constants'

describe('Footer', () => {
    beforeEach(() => render(<AppFooter />))

    it('should render attribution label', () => {
        expect(screen.getByLabelText('Marvel Attribution')).toBeInTheDocument()
    })

    it('should render the link with all required attributes', () => {
        const linkElement = screen.getByRole('link')
        expect(linkElement).toBeInTheDocument()
        expect(linkElement).toHaveAttribute('href', globalConstants.externalLinks.marvelWebsite)
        expect(linkElement).toHaveAttribute('target', '_blank')
        expect(linkElement).toHaveAttribute('rel', 'noreferrer')
    })
})
