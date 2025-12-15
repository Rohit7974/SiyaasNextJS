import { Inter } from 'next/font/google'
import '../styles/globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MarqueeBar from '@/components/MarqueeBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Siya - Handcrafted Soy Candles',
  description: 'Luxury Scents for Every Mood',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MarqueeBar />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}