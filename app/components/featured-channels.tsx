'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

const channels = [
  { id: 1, name: "News 24/7", logo: "/placeholder.svg?height=100&width=100" },
  { id: 2, name: "Sports Zone", logo: "/placeholder.svg?height=100&width=100" },
  { id: 3, name: "Movie Central", logo: "/placeholder.svg?height=100&width=100" },
  { id: 4, name: "Kids Fun", logo: "/placeholder.svg?height=100&width=100" },
  { id: 5, name: "Lifestyle TV", logo: "/placeholder.svg?height=100&width=100" },
  { id: 6, name: "Music Hits", logo: "/placeholder.svg?height=100&width=100" },
  { id: 7, name: "Tech Talk", logo: "/placeholder.svg?height=100&width=100" },
  { id: 8, name: "Food Network", logo: "/placeholder.svg?height=100&width=100" },
]

export default function FeaturedChannels() {
  const [startIndex, setStartIndex] = useState(0)

  const nextSlide = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % channels.length)
  }

  const prevSlide = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + channels.length) % channels.length)
  }

  return (
    <section className="relative">
      <h2 className="text-3xl font-bold mb-6">Featured Channels</h2>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${startIndex * (100 / 6)}%)` }}
        >
          {channels.map((channel) => (
            <div key={channel.id} className="w-1/6 flex-shrink-0 px-2">
              <div className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <div className="p-4 flex flex-col items-center">
                  <div className="relative w-16 h-16 mb-4">
                    <Image
                      src={channel.logo}
                      alt={channel.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-center mb-2">{channel.name}</h3>
                  <Button variant="outline" size="sm">Watch Now</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-0 top-1/2 transform -translate-y-1/2"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 top-1/2 transform -translate-y-1/2"
        onClick={nextSlide}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>
    </section>
  )
}

