import Navbar from 'components/Navbar'
import Metronome from 'components/Metronome'
import Sidebar from 'components/Sidebar'
import Commands from 'components/Commands'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="bg-gray-900 flex-1 flex text-gray-200 w-full h-screen-minus-navbar">
        <Sidebar />
        <div className="w-full">{children}</div>
        {/* <Commands /> */}
      </main>
      <div className="absolute bottom-10 right-10 bg-gray-800 p-8 rounded-xl">
        <Metronome />
      </div>
    </div>
  )
}

export default Layout
