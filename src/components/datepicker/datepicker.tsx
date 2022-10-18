import { FC } from 'react'
import DatePicker from 'react-datepicker'
import * as styles from './datepicker.module.scss'
import { cls } from '../../core/utils'

export interface IAppDatepickerProps {
    disabled?: boolean
    name: string
    value: Date | null
    label: string
    error?: string
    className?: string
    onChange(value: Date | null): void
    onBlur(): void
}

export const AppDatepicker: FC<IAppDatepickerProps> = ({ value, disabled = false, label, name, onBlur, onChange, error, className }) => {
    return (
        <div className={cls(styles.appDatepicker, className)}>
            <label htmlFor={name} className={cls(styles.label, error ? styles.labelInvalid : '')}>
                {label}
            </label>
            <DatePicker
                name={name}
                id={name}
                selected={value}
                onBlur={onBlur}
                onChange={onChange}
                onCalendarClose={onBlur}
                disabled={disabled}
                className={cls(styles.control, error ? styles.controlInvalid : '')}
            />
            <p hidden={!error} className="app-control-error" role="alert">
                {error}
            </p>
        </div>
    )
}
