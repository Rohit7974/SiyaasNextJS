
import React from "react"

const About = () => {
  return (
    <section id="about" className="py-16 bg-[#CFA36F]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          About Siyaas
        </h2>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            At Siyaas, we believe in creating moments of tranquility through the art of candle making. 
            Each candle is handcrafted with love using 100% natural soy wax and premium essential oils.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our mission is to bring luxury scents into every home, creating an atmosphere of warmth, 
            relaxation, and pure bliss. Experience the Siyaas difference today.
          </p>
        </div>
      </div>
    </section>
  )
}

export default About