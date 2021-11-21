import Link from 'next/link'
import { Home, Tool } from 'react-feather'
import { useModal } from 'lib/ModalContext'

const Navbar = () => {
  const { setModalOpen, setModalContent } = useModal()
  const handleOpenModal = () => {
    setModalOpen(true)
    setModalContent(
      <div>
        <input type="checkbox" className="mr-2" />
        Edit mode
      </div>
    )
  }
  return (
    <div className="bg-gray-900 p-4 border-b border-gray-700 flex justify-between items-center">
      <Link href="/">
        <Home
          className="text-white hover:opacity-80 transition duration-150 cursor-pointer"
          size={32}
        />
      </Link>

      <Tool
        className="text-white hover:opacity-80 transition duration-150 cursor-pointer"
        size={32}
        onClick={handleOpenModal}
      />
    </div>
  )
}

export default Navbar
