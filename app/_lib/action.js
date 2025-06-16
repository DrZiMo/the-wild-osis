'use server'

import { revalidatePath } from 'next/cache'
import { auth, signIn, signOut } from './auth'
import { supabase } from './supabase'

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
  return { success: true }
}
