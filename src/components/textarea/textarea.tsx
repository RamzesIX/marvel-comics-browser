import { FC } from 'react'
import * as styles from './textarea.module.scss'
import { cls } from '../../core/utils'

export interface IAppTextareaProps {
    disabled?: boolean
    type?: 'text' | 'number' | 'email' | 'tel' // TODO support other
    value: string
    label: string
    name: string
    rows?: number
    placeholder?: string
    error?: string
    className?: string
    onChange(value: string): void
    onBlur(): void
}

export const AppTextarea: FC<IAppTextareaProps> = ({
    value,
    disabled = false,
    label,
    placeholder,
    name,
    onBlur,
    onChange,
    error,
    className,
    rows = 4,
}) => {
    return (
        <div className={cls(styles.appTextarea, className)}>
            <label htmlFor={name} className={cls(styles.label, error ? styles.labelInvalid : '')}>
                {label}
            </label>
            <textarea
                disabled={disabled}
                id={name}
                name={name}
                aria-invalid={!!error}
                className={cls(styles.control, error ? styles.controlInvalid : '')}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                onBlur={onBlur}
                placeholder={placeholder}
                rows={rows}
            />
            <p hidden={!error} className="app-control-error" role="alert">
                {error}
            </p>
        </div>
    )
}
