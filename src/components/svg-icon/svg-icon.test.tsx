import { render, screen } from '@testing-library/react'
import { SvgIcon } from './svg-icon'
import { IconId } from './svg-icon.types'
import '@testing-library/jest-dom'
import { getPathToIcon } from './svg-icon.utils'

describe('SvgIcon', () => {
    it('should render Iron Man icon with the correct aria-label and className applied', () => {
        const ariaLabel = 'Iron Man Icon'
        const className = 'test-class'
        render(<SvgIcon iconId={IconId.IronMan} aria-label={ariaLabel} className={className} />)
        const svg = screen.getByTestId('svg-icon')
        expect(svg).toBeInTheDocument()
        expect(svg).toHaveAttribute('aria-label', ariaLabel)
        expect(svg).toHaveClass(className)
        expect(screen.getByTestId('svg-icon-use')).toHaveAttribute('xlink:href', getPathToIcon(IconId.IronMan))
    })

    it('should hide an icon', () => {
        render(<SvgIcon iconId={IconId.IronMan} hidden />)
        const svg = screen.getByTestId('svg-icon')
        expect(svg).toHaveClass('svgIconHidden')
    })
})
