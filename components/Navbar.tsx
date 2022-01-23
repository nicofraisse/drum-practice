import Link from 'next/link'
import { Home, Tool, X } from 'react-feather'
import { useModal } from 'lib/ModalContext'
import { useSidebar } from 'lib/SidebarContext'
import { useEffect, useState } from 'react'

const Navbar = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const { editMode, setEditMode } = useSidebar()

  const Modal = ({ open, close }) => {
    if (!open) return null
    return (
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded shadow relative">
          <input
            type="checkbox"
            className="mr-2 cursor-pointer"
            checked={editMode}
            onClick={() => setEditMode(!editMode)}
          />
          Edit mode
          <X
            onClick={close}
            className="absolute top-[4px] right-[4px] cursot-pointer"
          />
        </div>
      </div>
    )
  }

  useEffect(() => {
    console.log({ editMode })
  }, [editMode])

  return (
    <div className="bg-gray-900 p-4 border-b border-gray-700 flex justify-between items-center">
      <Modal open={modalOpen} close={() => setModalOpen(false)} />
      <Link href="/">
        <Home
          className="text-white hover:opacity-80 transition duration-150 cursor-pointer"
          size={32}
        />
      </Link>

      <Tool
        className="text-white hover:opacity-80 transition duration-150 cursor-pointer"
        size={32}
        onClick={() => setModalOpen(true)}
      />
    </div>
  )
}

export default Navbar
