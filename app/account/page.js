import { auth } from '../_lib/auth'

export const metadata = {
  title: 'Account',
}

export default async function Page() {
  const session = await auth()
  return (
    <h2 className='font-semibold text-2xl text-accent-400'>
      Welcome, {session.user.name.split(' ')[0]}
    </h2>
  )
}
