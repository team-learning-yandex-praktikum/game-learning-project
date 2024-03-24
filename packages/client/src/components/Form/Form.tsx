import { useId } from 'react'
import { NavLink } from 'react-router-dom'
import Title from '@components/Title'
import TextField from '@components/TextField'
import Button from '@components/Button'
import styles from './form.module.css'
import { FormProps } from './types'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

const Form = <Values extends FieldValues = FieldValues>({
    title,
    fields,
    onSubmit,
    disabled: externalDisabled = false,
    defaultValues,
    TitleProps,
    SubmitButtonProps,
    CancelButtonProps,
    LinkProps,
}: FormProps<Values>) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid, disabled },
    } = useForm({
        mode: 'onTouched',
        disabled: externalDisabled,
        values: defaultValues,
    })

    const FORM_ID = useId()

    return (
        <div className={styles.container}>
            {title && (
                <Title {...TitleProps} className={styles.title}>
                    {title}
                </Title>
            )}
            <form
                id={FORM_ID}
                className={styles.fields}
                onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
            >
                {Object.values(fields).map(({ options, ...config }) => (
                    <TextField
                        key={config.name}
                        {...config}
                        {...register(config.name, options)}
                        readOnly={disabled}
                        error={errors[config.name]}
                    />
                ))}
            </form>
            {(SubmitButtonProps || CancelButtonProps || LinkProps) && (
                <div className={styles.actions}>
                    {SubmitButtonProps && (
                        <Button
                            {...SubmitButtonProps}
                            type={'submit'}
                            form={FORM_ID}
                            className={styles.button}
                            disabled={SubmitButtonProps.disabled ?? !isValid}
                            onClick={e => SubmitButtonProps?.onClick?.(e)}
                        />
                    )}
                    {CancelButtonProps && (
                        <Button
                            variant={'outlined'}
                            {...CancelButtonProps}
                            onClick={e => {
                                reset()
                                CancelButtonProps?.onClick?.(e)
                            }}
                            className={styles.button}
                        />
                    )}
                    {LinkProps && (
                        <NavLink {...LinkProps} className={styles.link} />
                    )}
                </div>
            )}
        </div>
    )
}

export default Form
