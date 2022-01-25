import classNames from 'classnames'
import Infotainment from 'components/Infotainment'
import Metronome from 'components/Metronome'
import RecordCreate from 'components/Record/Create'
import { useModal } from 'lib/ModalContext'
import { useTempo } from 'lib/TempoContext'
import { useEffect } from 'react'

const index = () => {
  const { practiceMode, setPracticeMode, isRunning, done } = useTempo()
  const { setModalOpen, setModalContent } = useModal()

  useEffect(() => {
    if (done) {
      setModalOpen(true)
      setModalContent(<RecordCreate />)
    }
  }, [done])

  return (
    <div
      className="bg-white bg-opacity-10 p-3"
      style={{ minWidth: 300, maxWidth: 300 }}
    >
      <div className="border border-gray-700 rounded-lg">
        <Infotainment />
        <div className="flex w-full">
          <div
            onClick={() => setPracticeMode(true)}
            className={classNames(
              'p-3 flex transition duration-300 font-bold cursor-pointer justify-center w-2/5 bg-gray-900 border',
              {
                'bg-blue-500 border-blue-400 bg-opacity-30 text-white':
                  practiceMode,
                'text-gray-400 border-gray-900 hover:text-white': !practiceMode,
                'pointer-events-none opacity-50 cursor-not-allowed': isRunning
              }
            )}
          >
            Practice
          </div>
          <div
            onClick={() => setPracticeMode(false)}
            className={classNames(
              'bg-gray-900 p-3 flex transition duration-300 font-bold cursor-pointer justify-center w-3/5 border',
              {
                'bg-blue-500  border-blue-400 bg-opacity-30 text-white':
                  !practiceMode,
                'text-gray-400 border-gray-900 hover:text-white': practiceMode,
                'pointer-events-none opacity-50 cursor-not-allowed': isRunning
              }
            )}
          >
            Metronome only
          </div>
        </div>
        <div className="bg-blue-900 bg-opacity-10 p-6">
          <Metronome />
        </div>
      </div>
    </div>
  )
}

export default index
