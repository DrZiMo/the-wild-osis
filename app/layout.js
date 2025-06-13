import Logo from './_components/Logo'
import Navigation from './_components/Navigation'
import './globals.css'

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
      <body cz-shortcut-listen='true'>
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>{children}</main>
        <footer>Copyright by The Wild Osis</footer>
      </body>
    </html>
  )
}
