import classNames from 'classnames'
import ConditionalWrapper from 'components/ConditionalWrapper'
import Link from 'next/link'

const Button = ({ children, className, href, ...props }) => {
  console.log('href', href)
  return (
    <ConditionalWrapper
      condition={href}
      wrapper={(children) => <Link href={href}>{children}</Link>}
    >
      <button
        className={classNames(
          'py-1 px-3 bg-gray-100 hover:bg-gray-200 border rounded text-gray-600 hover:text-gray-700',
          className
        )}
        {...props}
      >
        {children}
      </button>
    </ConditionalWrapper>
  )
}

export default Button
