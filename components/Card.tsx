import classNames from 'classnames'

const Card = ({ children, className }) => {
  return (
    <div className={classNames('shadow bg-white p-4 mb-4', className)}>
      {children}
    </div>
  )
}

export default Card
