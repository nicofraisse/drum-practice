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
        <div className="bg-black bg-opacity-30 absolute w-screen h-screen flex items-center justify-center z-50">
          <div className="bg-white p-8 text-xl relative">
            <X
              className="absolute top-0 right-0"
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
