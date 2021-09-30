import classNames from 'classnames'
import Input from 'components/Input'
import { Field as FormikField } from 'formik'
import { startCase } from 'lodash'

const Field = ({
  name,
  type = 'text',
  className,
  control,
  label,
  ...props
}) => {
  return (
    <FormikField name={name}>
      {({ field }) => {
        return (
          <div className={classNames(className, 'mb-2')}>
            <label htmlFor={name} className="block">
              {label || startCase(name)}
            </label>

            {control || <Input type={type} id={name} {...field} {...props} />}
          </div>
        )
      }}
    </FormikField>
  )
}

export default Field
