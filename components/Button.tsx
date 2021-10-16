import classNames from 'classnames'
import ConditionalWrapper from 'components/ConditionalWrapper'
import Link from 'next/link'

const Button = ({ children, className, href, icon, ...props }) => {
  const Icon = icon
  return (
    <ConditionalWrapper
      condition={href}
      wrapper={(children) => <Link href={href}>{children}</Link>}
    >
      <button
        className={classNames(
          'flex items-center py-1 px-3 bg-gray-100 hover:bg-gray-200 border rounded text-gray-600 hover:text-gray-700',
          className
        )}
        {...props}
      >
        {icon && <Icon size={18} className="mr-1" />}
        {children}
      </button>
    </ConditionalWrapper>
  )
}

export default Button
