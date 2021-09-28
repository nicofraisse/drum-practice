import Navbar from 'components/Navbar'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen border-gray-700 flex flex-col">
      <Navbar />
      <main className="bg-gray-50 flex-1">{children}</main>
    </div>
  )
}

export default Layout
