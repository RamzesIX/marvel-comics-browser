import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { AppMain } from './main'

// TODO update me
describe('AppMain', () => {
    it('should render the content', () => {
        render(<AppMain />)
        expect(screen.getByRole('main')).toBeInTheDocument()
    })
})
