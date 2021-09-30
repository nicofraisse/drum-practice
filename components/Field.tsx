import classNames from 'classnames'
import Input from 'components/Input'
import { Field as FormikField } from 'formik'
import { capitalize } from 'lodash'

const Field = ({ name, type = 'text', className, control, ...props }) => {
  return (
    <FormikField name={name}>
      {({ field }) => {
        return (
          <div className={classNames(className, 'mb-2')}>
            <label htmlFor={name} className="block">
              {capitalize(name)}
            </label>

            {control || <Input type={type} id={name} {...field} {...props} />}
          </div>
        )
      }}
    </FormikField>
  )
}

export default Field
