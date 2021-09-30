import classNames from 'classnames'

const Container = ({ children, width, className }) => {
  return (
    <div className={classNames('mx-auto pt-5', width || 'max-w-lg', className)}>
      {children}
    </div>
  )
}

export default Container
