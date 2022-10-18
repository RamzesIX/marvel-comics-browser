import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { AppButton, appButtonSpinnerTestId } from './button'

describe('AppButton', () => {
    it('should render title', () => {
        const label = 'label'
        render(<AppButton label={label} onClick={jest.fn()} />)
        expect(screen.getByRole('button')).toHaveTextContent(label)
    })

    it('should show/hide spinner', () => {
        const onClick = jest.fn()
        const { rerender } = render(<AppButton label="label" onClick={onClick} />)
        // Spinner shouldn't be visible as the loading is set to "false" by default
        expect(screen.queryByTestId(appButtonSpinnerTestId)).toBeNull()
        rerender(<AppButton label="label" onClick={onClick} loading />)
        // Spinner should be visible as the loading property is set to "true"
        expect(screen.queryByTestId(appButtonSpinnerTestId)).toBeInTheDocument()
        // Spinner shouldn't be visible as the loading is set to "false"
        rerender(<AppButton label="label" onClick={onClick} loading={false} />)
        expect(screen.queryByTestId(appButtonSpinnerTestId)).toBeNull()
    })

    it('should invoke onClick handler', () => {
        const onClick = jest.fn()
        render(<AppButton label="label" onClick={onClick} />)
        fireEvent.click(screen.getByRole('button'))
        expect(onClick).toHaveBeenCalled()
    })

    it('should disable button', () => {
        const onClick = jest.fn()
        const { rerender } = render(<AppButton label="label" disabled onClick={onClick} />)
        // Checking that the button is disabled
        const button = screen.getByRole('button')
        expect(button).toBeDisabled()
        fireEvent.click(screen.getByRole('button'))
        expect(onClick).not.toHaveBeenCalled()

        // Checking that the button is enabled after we set "disabled" property to "false"
        rerender(<AppButton label="label" disabled={false} onClick={onClick} />)

        expect(button).not.toBeDisabled()
        fireEvent.click(screen.getByRole('button'))
        expect(onClick).toHaveBeenCalled()

        // Checking that the button is disabled if "loading" is set to true
        onClick.mockClear()
        rerender(<AppButton label="label" disabled={false} loading={true} onClick={onClick} />)

        expect(button).toBeDisabled()
        fireEvent.click(screen.getByRole('button'))
        expect(onClick).not.toHaveBeenCalled()
    })
})
