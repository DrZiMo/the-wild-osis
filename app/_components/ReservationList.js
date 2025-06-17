'use client'

import React, { useOptimistic } from 'react'
import ReservationCard from './ReservationCard'
import { DeleteBooking } from '../_lib/action'

export default function ReservationList({ bookings }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (currentBooking, bookingId) => {
      return currentBooking.filter((booking) => booking.id !== bookingId)
    }
  )

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId)
    await DeleteBooking(bookingId)
  }

  return (
    <ul className='space-y-6'>
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  )
}
