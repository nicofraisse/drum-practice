import classNames from 'classnames'
import { X } from 'react-feather'

const Modal = ({ open, close, children }) => {
  if (!open) return null
  return (
    <div className="absolute bg-black bg-opacity-50 top-0 left-0 h-screen w-screen z-40 flex items-center justify-center">
      <div className="bg-blue-900 rounded shadow-xl p-5 relative max-w-[600px]">
        <X
          className="absolute top-2 right-2 cursor-pointer hover:opacity-60 transition duration-200"
          onClick={close}
        />
        {children}
      </div>
    </div>
  )
}

export default Modal
