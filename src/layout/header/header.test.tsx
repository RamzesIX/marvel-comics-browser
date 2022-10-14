import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { AppHeader } from './header'

describe('Header', () => {
    it('should render heading element that contains the title and logo', () => {
        render(<AppHeader />)
        expect(screen.getByRole('heading')).toHaveTextContent('Marvel Comics')
        expect(screen.getByLabelText('Logo')).toBeInTheDocument()
    })
})
