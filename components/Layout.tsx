import Navbar from 'components/Navbar'
import Metronome from 'components/Metronome'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="bg-gray-900 flex-1">{children}</main>
      <div className="absolute bottom-10 right-10 bg-gray-800 p-8 rounded-xl">
        <Metronome />
      </div>
    </div>
  )
}

export default Layout
