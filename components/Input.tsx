import classNames from 'classnames'

export type InputProps = {
  className?: string
  value: string
  type: string
}

const Input: React.FC<InputProps> = ({ className, value, type, ...props }) => {
  if (type === 'textarea') {
    return (
      <textarea
        value={value || ''}
        className={classNames('border rounded px-2 py-1', className)}
        {...props}
      />
    )
  }
  return (
    <input
      type={type}
      value={value || ''}
      className={classNames('border rounded px-2 py-1', className)}
      {...props}
    />
  )
}

export default Input
