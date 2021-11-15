import Link from 'next/link'
import { Home, Tool } from 'react-feather'

const Navbar = () => {
  return (
    <div className="bg-gray-900 p-4 border-b border-gray-700 flex justify-between items-center">
      <Link href="/">
        <Home
          className="text-white hover:opacity-80 transition duration-150 cursor-pointer"
          size={32}
        />
      </Link>
      <Link href="/exercises/new">
        <Tool
          className="text-white hover:opacity-80 transition duration-150 cursor-pointer"
          size={32}
        />
      </Link>
    </div>
  )
}

export default Navbar
