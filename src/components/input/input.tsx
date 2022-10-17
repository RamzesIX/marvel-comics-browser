import { FC } from 'react'
import * as styles from './input.module.scss'
import { cls } from '../../core/utils'

export interface IAppInputProps {
    disabled?: boolean
    type?: 'text' | 'number' | 'email' | 'tel' // TODO support other
    value: string
    label: string
    name: string
    placeholder?: string
    error?: string
    className?: string
    onChange(value: string): void
    onBlur(): void
}

export const AppInput: FC<IAppInputProps> = ({
    value,
    disabled = false,
    label,
    placeholder,
    name,
    onBlur,
    onChange,
    type = 'text',
    error,
    className,
}) => {
    return (
        <div className={cls(styles.appInput, className)}>
            <label htmlFor={name} className={cls(styles.label, error ? styles.labelInvalid : '')}>
                {label}
            </label>
            <input
                disabled={disabled}
                id={name}
                name={name}
                type={type}
                aria-invalid={!!error}
                className={cls(styles.control, error ? styles.controlInvalid : '')}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                onBlur={onBlur}
                placeholder={placeholder}
            />
            <p hidden={!error} className="app-control-error" role="alert">
                {error}
            </p>
        </div>
    )
}
