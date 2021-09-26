import classNames from 'classnames'
import { Field as FormikField, Form as FormikForm, Formik } from 'formik'
import { capitalize } from 'lodash'
import { createContext } from 'react'

export const FormContext = createContext()

export const Form = ({
  children,
  className,
  id,
  validationSchema,
  ...props
}) => {
  return (
    <FormContext.Provider value={{ id, validationSchema }}>
      <Formik {...props} validationSchema={validationSchema}>
        {({ handleSubmit, ...props }) => {
          return (
            <FormikForm className={className} onSubmit={handleSubmit}>
              {children(props)}
            </FormikForm>
          )
        }}
      </Formik>
    </FormContext.Provider>
  )
}

export const FormInput = ({ className, value, type, ...props }) => {
  return (
    <input
      type={type}
      value={value || ''}
      className={classNames('border rounded px-2 py-1', className)}
      {...props}
    />
  )
}

export const Field = ({
  name,
  type = 'text',
  className,
  control,
  ...props
}) => {
  const Input = control || FormInput

  return (
    <FormikField name={name}>
      {({ field }) => {
        return (
          <div className={classNames(className, 'mb-2')}>
            <label htmlFor={name} className="block">
              {capitalize(name)}
            </label>

            <Input type={type} id={name} {...field} {...props} />
          </div>
        )
      }}
    </FormikField>
  )
}
