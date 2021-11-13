import { createContext, useContext, useState } from 'react'

const InfotainmentContext = createContext({})

const InfotainmentProvider = ({ children }) => {
  const [infoText, setInfoText] = useState('Welcome !!')
  return (
    <InfotainmentContext.Provider
      value={{
        infoText,
        setInfoText
      }}
    >
      {children}
    </InfotainmentContext.Provider>
  )
}

export const useInfotainment = () => {
  return useContext(InfotainmentContext)
}

export default InfotainmentProvider
