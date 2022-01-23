import { useSidebar } from 'lib/SidebarContext'
import Link from 'next/link'
import { Home } from 'react-feather'

const Navbar = () => {
  const { editMode, setEditMode } = useSidebar()

  return (
    <div className="bg-gray-900 p-4 border-b border-gray-700 flex justify-between items-center">
      <Link href="/">
        <Home
          className="text-white hover:opacity-80 transition duration-150 cursor-pointer"
          size={32}
        />
      </Link>

      <div className="text-gray-300 bg-gray-700 p-1 px-3 rounded">
        <input
          type="checkbox"
          className="mr-3 cursor-pointer transform scale-150"
          checked={editMode}
          onClick={() => setEditMode(!editMode)}
        />
        Edit mode
      </div>
    </div>
  )
}

export default Navbar
