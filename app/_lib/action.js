'use server'

import { revalidatePath } from 'next/cache'
import { auth, signIn, signOut } from './auth'
import { supabase } from './supabase'
import { getBookings } from './data-service'
import { redirect } from 'next/navigation'

export async function SignInAction() {
  await signIn('google', { redirectTo: '/account' })
}

export async function SignOutAction() {
  await signOut({ redirectTo: '/' })
}

export async function UpdateGuest(formData) {
  const session = await auth()

  if (!session) throw new Error('You must be logged in')

  const [nationality, countryFlag] = formData.get('nationality').split('%')
  const nationalID = formData.get('nationalID')

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error('Please provide a valid national ID')
  }

  const updatedFields = {
    nationality,
    countryFlag,
    nationalID,
  }

  const { data, error } = await supabase
    .from('guests')
    .update(updatedFields)
    .eq('id', session.user.guestId)

  if (error) {
    throw new Error('Guest could not be updated')
  }

  revalidatePath('/account/profile')
}

export async function DeleteBooking(bookingId) {
  const session = await auth()

  if (!session) throw new Error('You must be logged in')

  const guestBookings = await getBookings(session.user.guestId)
  const guestBookingIds = guestBookings.map((booking) => booking.id)

  if (!guestBookingIds.includes(bookingId))
    throw new Error('You are not authorized to delete this booking')

  const { error } = await supabase.from('bookings').delete().eq('id', bookingId)

  if (error) {
    throw new Error('Booking could not be deleted')
  }

  revalidatePath('/account/reservations')
}

export async function UpdateBooking(formData) {
  const session = await auth()

  if (!session) throw new Error('You must be logged in')

  const guestBookings = await getBookings(session.user.guestId)
  const guestBookingIds = guestBookings.map((booking) => booking.id)

  const id = formData.get('bookingId')

  if (!guestBookingIds.includes(+id))
    throw new Error('You are not authorized to update this booking')

  const numGuests = formData.get('numGuests')
  const observations = formData.get('observations').slice(0, 1000)

  const updatedFields = {
    numGuests,
    observations,
  }

  const { error } = await supabase
    .from('bookings')
    .update(updatedFields)
    .eq('id', +id)

  if (error) {
    throw new Error('Booking could not be updated')
  }

  revalidatePath('/account/reservations')
  revalidatePath(`/account/reservations/edit/${id}`)
  redirect('/account/reservations')
}

export async function createBooking(bookingData, formData) {
  const session = await auth()

  if (!session) throw new Error('You must be logged in')

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get('numGuests')),
    observations: formData.get('observations').slice(0, 1000),
    extraPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: 'unconfirmed',
  }

  const { error } = await supabase.from('bookings').insert([newBooking])

  if (error) {
    throw new Error('Booking could not be created')
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`)
  redirect('/thanks')
}
