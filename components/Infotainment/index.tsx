import { useInfotainment } from 'lib/InfotainmentContext'
import { useTempo } from 'lib/TempoContext'
import React from 'react'

const index = () => {
  const { infoText } = useInfotainment()
  const { timer } = useTempo()
  return (
    <div className="bg-black rounded-t-lg font-mono p-3 w-full break-words h-48 flex items-center justify-center">
      {infoText}
      {timer}
    </div>
  )
}

export default index
