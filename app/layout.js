import Header from './_components/Header'
import Reservation from './_components/Reservation'
import { ReservationProvider } from './_components/ReservationContex'
import './globals.css'

import { Josefin_Sans } from 'next/font/google'

const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: {
    template: '%s - The Wild Osis',
    default: 'welcome - The Wild Osis',
  },
  description:
    'Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beutiful mountains and dark forests',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        cz-shortcut-listen='true'
        className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col`}
      >
        <Header />
        <div className='flex-1 px-8 py-12 grid'>
          <main className='max-w-7xl mx-auto w-full'>
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  )
}
