import classNames from 'classnames'

const Container = ({ children, className }) => {
  return (
    <div className={classNames('mx-auto max-w-lg pt-5', className)}>
      {children}
    </div>
  )
}

export default Container
