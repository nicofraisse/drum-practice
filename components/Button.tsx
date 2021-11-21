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
          'flex items-center px-6 py-2 text-lg bg-blue-200 hover:bg-gray-200 rounded-lg text-gray-600 hover:text-gray-700',
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
