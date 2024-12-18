'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { PlayCircle } from 'lucide-react'

const heroContent = [
  {
    title: "Welcome to BDIX TV",
    description: "Your ultimate streaming destination for live TV, movies, and shows.",
    bgImage: "/hero-bg-1.jpg"
  },
  {
    title: "Watch Anytime, Anywhere",
    description: "Enjoy your favorite content on any device with our flexible streaming options.",
    bgImage: "/hero-bg-2.jpg"
  },
  {
    title: "Discover New Favorites",
    description: "Explore a vast library of content across various genres and languages.",
    bgImage: "/hero-bg-3.jpg"
  }
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % heroContent.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-[70vh] overflow-hidden rounded-2xl">
      {heroContent.map((content, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${content.bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-6 max-w-4xl mx-auto px-4">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight animate-fade-in-up">
                {content.title}
              </h1>
              <p className="text-xl md:text-2xl animate-fade-in-up animation-delay-300">
                {content.description}
              </p>
              <div className="flex justify-center space-x-4 animate-fade-in-up animation-delay-600">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">Start Watching</Button>
                <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20">
                  <PlayCircle className="mr-2 h-5 w-5" /> Watch Trailer
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroContent.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? 'bg-blue-500' : 'bg-gray-400'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  )
}

