import React from "react";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background video */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/3i3Iv0ULVs0?autoplay=1&loop=1&mute=1&controls=0&playlist=3i3Iv0ULVs0"
            frameBorder="0"
            allow="autoplay; loop; fullscreen"
            allowFullScreen
            title="Hero Background Video"
          />
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto mt-10 md:mt-20">
        <p className="tracking-[0.35em] text-sm sm:text-base md:text-lg font-semibold mb-3 uppercase">
          THIS FESTIVE SEASON
        </p>

        <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-lg">
          Handcrafted Soy Candles
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl mb-8">
          Luxury Scents for Every Mood
        </p>

        <button className="border border-white text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-white hover:text-black transition duration-300">
          SHOP NOW
        </button>
      </div>
    </section>
  );
};

export default Hero;
