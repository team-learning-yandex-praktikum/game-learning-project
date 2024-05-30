import { useId } from 'react'
import Title from '@components/Title'
import TextField from '@components/TextField'
import Button from '@components/Button'
import styles from './form.module.css'
import { FormProps } from './types'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import sanitizeHtml, { IOptions } from 'sanitize-html'

const Form = <Values extends FieldValues = FieldValues>({
    title,
    fields,
    onSubmit,
    disabled: externalDisabled = false,
    defaultValues,
    actionArray,
    TitleProps,
    SubmitButtonProps,
    CancelButtonProps,
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

    const handleFormSubmit = (data: Values) => {
        const sanitizedData: Record<keyof Values, string> = {} as Record<
            keyof Values,
            string
        >
        Object.entries(data).forEach(([key, value]) => {
            sanitizedData[key as keyof Values] = sanitizeHtml(
                value,
                {} as IOptions
            )
        })
        onSubmit(sanitizedData as Values)
    }

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
                onSubmit={handleSubmit(
                    handleFormSubmit as SubmitHandler<FieldValues>
                )}
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
            {(SubmitButtonProps ||
                CancelButtonProps ||
                Boolean(actionArray?.length)) && (
                <div className={styles.actions}>
                    {SubmitButtonProps && (
                        <Button
                            {...SubmitButtonProps}
                            type={'submit'}
                            form={FORM_ID}
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
                        />
                    )}
                    {actionArray?.map(actionNode => actionNode)}
                </div>
            )}
        </div>
    )
}

export default Form
