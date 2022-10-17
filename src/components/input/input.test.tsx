import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { AppInput } from './input'

describe('AppInput', () => {
    it('should render input element', function () {
        const label = 'label'
        const name = 'name'
        render(<AppInput value="" label={label} name={name} onChange={jest.fn()} onBlur={jest.fn()} />)
        const input = screen.getByRole('textbox')
        expect(input).toBeInTheDocument()
        expect(input).toHaveAttribute('name', name)
        expect(screen.getByText(label)).toBeInTheDocument()
    })

    it('should render/hide error', function () {
        const label = 'label'
        const name = 'name'
        const error = 'error'
        const { rerender } = render(<AppInput value="" label={label} name={name} onChange={jest.fn()} onBlur={jest.fn()} />)
        const input = screen.getByRole('textbox')
        //Checking initial state: no error element or corresponding attributes should be presented
        expect(input).toHaveAttribute('aria-invalid', 'false')
        expect(screen.queryByRole('alert')).toBeNull()

        // Setting the error
        rerender(<AppInput value="" error={error} label={label} name={name} onChange={jest.fn()} onBlur={jest.fn()} />)
        expect(input).toHaveAttribute('aria-invalid', 'true')
        expect(screen.queryByRole('alert')).toHaveTextContent(error)

        // Hiding the error
        rerender(<AppInput value="" label={label} name={name} onChange={jest.fn()} onBlur={jest.fn()} />)
        expect(input).toHaveAttribute('aria-invalid', 'false')
        expect(screen.queryByRole('alert')).toBeNull()
    })

    it('should react on value property changes', () => {
        let value = 'test'
        const { rerender } = render(<AppInput value={value} label="" name="name" onChange={jest.fn()} onBlur={jest.fn()} />)
        const input: HTMLInputElement = screen.getByRole('textbox')

        expect(input.value).toBe(value)
        value = 'test2'
        rerender(<AppInput value={value} label="" name="name" onChange={jest.fn()} onBlur={jest.fn()} />)
        expect(input.value).toBe(value)
    })

    it('should invoke onChange and onBlur handlers', () => {
        const onChange = jest.fn()
        const onBlur = jest.fn()
        render(<AppInput value="" label="" name="name" onChange={onChange} onBlur={onBlur} />)
        const input: HTMLInputElement = screen.getByRole('textbox')
        // Checking onChange event
        fireEvent.change(input, { target: { value: '1' } })
        expect(onChange).toHaveBeenCalledWith('1')
        // Checking onBlur event
        fireEvent.blur(input)
        expect(onBlur).toHaveBeenCalled()
    })

    it('should disable input element', function () {
        const label = 'label'
        const name = 'name'
        const { rerender } = render(<AppInput value="" disabled label={label} name={name} onChange={jest.fn()} onBlur={jest.fn()} />)
        const input = screen.getByRole('textbox')
        // Checking that the input is disabled if the disabled property is set to "true"
        expect(input).toBeDisabled()

        rerender(<AppInput value="" disabled={false} label={label} name={name} onChange={jest.fn()} onBlur={jest.fn()} />)

        // Checking that the input is disabled if the disabled property is set to "false"
        expect(input).not.toBeDisabled()
    })
})
