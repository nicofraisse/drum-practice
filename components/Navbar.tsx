import Link from 'next/link'
import { Home } from 'react-feather'

const Navbar = () => {
  return (
    <div className="p-4 bg-gray-900 border-b border-gray-500 cursor-pointer hover:transform">
      <Link href="/">
        <Home
          className="text-white hover:opacity-80 transition duration-150"
          size={32}
        />
      </Link>
    </div>
  )
}

export default Navbar
