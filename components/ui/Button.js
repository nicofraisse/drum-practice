import classNames from 'classnames'

const Button = ({ children, className }) => {
  return (
    <button
      className={classNames(
        'py-1 px-3 bg-gray-100 hover:bg-gray-200 border rounded',
        className
      )}
    >
      {children}
    </button>
  )
}

export default Button
