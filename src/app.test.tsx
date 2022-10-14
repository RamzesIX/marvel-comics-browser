import { render, screen } from '@testing-library/react'
import { App } from './app'
import '@testing-library/jest-dom'

describe('App', () => {
    it('should render the title', () => {
        render(<App />)
        expect(screen.getByText('Marvel Comics')).toBeInTheDocument()
    })
})
