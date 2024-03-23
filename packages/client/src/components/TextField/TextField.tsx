import { forwardRef } from 'react'
import styles from './textField.module.css'
import { InputProps, TextFieldProps } from './types'
import { clsx } from 'clsx'
import { isMultiline } from './utils'

const TextField = forwardRef<HTMLDivElement, TextFieldProps>(
    (
        { error, label, className, disableErrorText = false, ...restProps },
        ref
    ) => {
        const errorMessage = typeof error === 'string' ? error : error?.message

        return (
            <div
                ref={ref}
                className={clsx(styles.textField, className)}
                data-error={Boolean(error)}
            >
                <div
                    className={clsx(
                        styles.field,
                        restProps.multiline && styles.multiline
                    )}
                >
                    {label && (
                        <label
                            className={styles.label}
                            htmlFor={restProps.name}
                        >
                            {label}
                        </label>
                    )}
                    {isMultiline(restProps) ? (
                        <textarea
                            rows={3}
                            id={restProps.name}
                            {...restProps}
                            className={styles.input}
                        />
                    ) : (
                        <input
                            id={restProps.name}
                            {...(restProps as InputProps)}
                            className={styles.input}
                        />
                    )}
                </div>
                {!disableErrorText && (
                    <div className={styles.errorLine}>{errorMessage}</div>
                )}
            </div>
        )
    }
)

export default TextField
