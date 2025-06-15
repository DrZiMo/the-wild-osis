'use client'

import React, { createContext, useContext, useState } from 'react'

const ReservationContex = createContext()

const intialState = { from: undefined, to: undefined }

function ReservationProvider({ children }) {
  const [range, setRange] = useState(intialState)
  const resetRange = () => setRange(intialState)

  return (
    <ReservationContex.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContex.Provider>
  )
}

function useReservation() {
  const context = useContext(ReservationContex)

  if (context === undefined) {
    throw new Error('Context was used outside the provider')
  }

  return context
}

export { useReservation, ReservationProvider }
