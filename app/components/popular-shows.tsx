'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

const shows = [
  { id: 1, title: "Stranger Things", image: "/placeholder.svg?height=400&width=300", rating: 4.8 },
  { id: 2, title: "The Crown", image: "/placeholder.svg?height=400&width=300", rating: 4.7 },
  { id: 3, title: "Money Heist", image: "/placeholder.svg?height=400&width=300", rating: 4.6 },
  { id: 4, title: "Black Mirror", image: "/placeholder.svg?height=400&width=300", rating: 4.5 },
  { id: 5, title: "The Witcher", image: "/placeholder.svg?height=400&width=300", rating: 4.4 },
  { id: 6, title: "Bridgerton", image: "/placeholder.svg?height=400&width=300", rating: 4.3 },
  { id: 7, title: "Ozark", image: "/placeholder.svg?height=400&width=300", rating: 4.2 },
  { id: 8, title: "The Mandalorian", image: "/placeholder.svg?height=400&width=300", rating: 4.1 },
]

export default function PopularShows() {
  const [startIndex, setStartIndex] = useState(0)

  const nextSlide = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % shows.length)
  }

  const prevSlide = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + shows.length) % shows.length)
  }

  return (
    <section className="relative">
      <h2 className="text-3xl font-bold mb-6">Popular Shows</h2>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${startIndex * (100 / 4)}%)` }}
        >
          {shows.map((show) => (
            <div key={show.id} className="w-1/4 flex-shrink-0 px-2">
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-0">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={show.image}
                      alt={show.title}
                      layout="fill"
                      objectFit="cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-semibold mb-2">{show.title}</h3>
                      <div className="flex items-center">
                        <Star className="text-yellow-400 w-5 h-5 mr-1" />
                        <span>{show.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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

