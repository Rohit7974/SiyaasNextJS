import { Inter, Playfair_Display } from 'next/font/google'
import '../styles/globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MarqueeBar from '@/components/MarqueeBar'

const inter = Inter({ subsets: ['latin'] })
const playfairDisplay = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900']
})

export const metadata = {
  title: 'Siya - Handcrafted Soy Candles',
  description: 'Luxury Scents for Every Mood',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ '--font-main': 'var(--font-playfair)', '--font-sub': 'var(--font-inter)' }}>
      <body className={`${inter.className} ${playfairDisplay.className}`}>
        <MarqueeBar />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}