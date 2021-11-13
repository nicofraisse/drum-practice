import Link from 'next/link'
import { Home } from 'react-feather'

const Navbar = () => {
  return (
    <div className="bg-gray-900 p-4 border-b border-gray-700">
      <Link href="/">
        <Home
          className="text-white hover:opacity-80 transition duration-150 cursor-pointer"
          size={32}
        />
      </Link>
    </div>
  )
}

export default Navbar
