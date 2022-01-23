import { createContext, useContext, useState } from 'react'
import { X } from 'react-feather'

const ModalContext = createContext({})

const ModalProvider = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState(null)

  const closeModal = () => {
    setModalOpen(false)
    setModalContent(null)
  }
  return (
    <ModalContext.Provider
      value={{
        modalOpen,
        setModalOpen,
        setModalContent,
        closeModal
      }}
    >
      {modalOpen && (
        <div
          className="bg-black bg-opacity-60 fixed w-full h-full flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-10 text-xl relative rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <X
              className="absolute"
              style={{ top: 8, right: 8 }}
              onClick={() => setModalOpen(false)}
            />
            {modalContent}
          </div>
        </div>
      )}
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  return useContext(ModalContext)
}

export default ModalProvider
