import classNames from 'classnames'
import { lowerCase } from 'lodash'

export type InputProps = {
  className?: string
  value: string
  type: string
}

const Input: React.FC<InputProps> = ({
  className,
  value,
  type,
  dark,
  ...props
}) => {
  const placeholder = props.placeholder || `Enter ${lowerCase(props.name)} here`
  if (type === 'textarea') {
    return (
      <textarea
        value={value || ''}
        className={classNames(
          'w-full rounded bg-black bg-opacity-60 p-2 rounded-sm mr-2 h-32',
          className
        )}
        placeholder={placeholder}
        {...props}
      />
    )
  }
  return (
    <input
      type={type}
      value={value || ''}
      className={classNames(
        'w-full rounded bg-black bg-opacity-60',
        className,
        {
          'px-3 py-1 rounded-sm mr-2': dark,
          'px-2 py-1': !dark
        }
      )}
      placeholder={placeholder}
      {...props}
    />
  )
}

export default Input
