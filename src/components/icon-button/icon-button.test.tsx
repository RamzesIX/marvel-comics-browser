import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { IconId } from '../svg-icon/svg-icon.types'
import { AppIconButton, appIconButtonSpinnerTestId } from './icon-button'
import { svgIconTestId } from '../svg-icon/svg-icon'

describe('AppIconButton', () => {
    it('should render icon', () => {
        render(<AppIconButton label="label" onClick={jest.fn()} icon={IconId.IronMan} />)
        expect(screen.getByTestId(svgIconTestId)).toBeInTheDocument()
    })

    it('should show/hide spinner', () => {
        const onClick = jest.fn()
        const { rerender } = render(<AppIconButton label="label" onClick={onClick} icon={IconId.IronMan} />)
        // Spinner shouldn't be visible as the loading is set to "false" by default
        expect(screen.queryByTestId(appIconButtonSpinnerTestId)).toBeNull()
        rerender(<AppIconButton label="label" onClick={onClick} loading icon={IconId.IronMan} />)
        // Spinner should be visible as the loading property is set to "true"
        expect(screen.queryByTestId(appIconButtonSpinnerTestId)).toBeInTheDocument()
        // Svg Icon should be hidden
        expect(screen.queryByTestId(svgIconTestId)).toBeNull()
        // Spinner shouldn't be visible as the loading is set to "false"
        rerender(<AppIconButton label="label" onClick={onClick} loading={false} icon={IconId.IronMan} />)
        expect(screen.queryByTestId(appIconButtonSpinnerTestId)).toBeNull()
    })

    it('should invoke onClick handler', () => {
        const onClick = jest.fn()
        render(<AppIconButton label="label" onClick={onClick} icon={IconId.IronMan} />)
        fireEvent.click(screen.getByRole('button'))
        expect(onClick).toHaveBeenCalled()
    })

    it('should disable button', () => {
        const onClick = jest.fn()
        const { rerender } = render(<AppIconButton icon={IconId.IronMan} label="label" disabled onClick={onClick} />)
        // Checking that the button is disabled
        const button = screen.getByRole('button')
        expect(button).toBeDisabled()
        fireEvent.click(screen.getByRole('button'))
        expect(onClick).not.toHaveBeenCalled()

        // Checking that the button is enabled after we set "disabled" property to "false"
        rerender(<AppIconButton label="label" icon={IconId.IronMan} disabled={false} onClick={onClick} />)

        expect(button).not.toBeDisabled()
        fireEvent.click(screen.getByRole('button'))
        expect(onClick).toHaveBeenCalled()

        // Checking that the button is disabled if "loading" is set to true
        onClick.mockClear()
        rerender(<AppIconButton label="label" icon={IconId.IronMan} disabled={false} loading={true} onClick={onClick} />)

        expect(button).toBeDisabled()
        fireEvent.click(screen.getByRole('button'))
        expect(onClick).not.toHaveBeenCalled()
    })
})
