import Hero from '@/components/Hero'
import Collection from '@/components/Collection'
import Products from '@/components/Products'
import About from '@/components/About'
import MarqueeBarBottom from '@/components/MarqueeBarBottom'
import TestimonialSlider from '@/components/TestimonialSlider'
import ReelProducts from '@/components/ReelProducts'

export default function Home() {
  return (
    <main>
      <Hero />
      <ReelProducts />
      <Collection />
      <Products />
      <TestimonialSlider />
      <About />
      {/* <MarqueeBarBottom /> */}
    </main>
  )
}