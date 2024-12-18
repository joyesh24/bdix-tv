'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlayCircle, ThumbsUp } from 'lucide-react'
import VideoPlayer from './video-player'

const channels = [
  { 
    id: 1, 
    name: "Sony YAY!", 
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/channels4_profile.jpg-FhqK2IsbMoQVZbVCHAUNVcN6UpTKx8.jpeg",
    currentShow: "Kids Entertainment", 
    viewers: "150K", 
    likes: "45K",
    url: "https://cdn-toffee.iptvbd.xyz/live.php?id=57bd9c2493c1&e=.m3u8"
  },
  { id: 2, name: "News 24/7", currentShow: "Breaking News", viewers: "105K", likes: "23K", url: "https://example.com/news247.m3u8" },
  { id: 3, name: "Sports Zone", currentShow: "Premier League Live", viewers: "250K", likes: "89K", url: "https://example.com/sportszone.m3u8" },
  { id: 4, name: "Movie Central", currentShow: "Blockbuster Premiere", viewers: "180K", likes: "56K", url: "https://example.com/moviecentral.m3u8" },
]

export default function LiveTVSection() {
  const [activeTab, setActiveTab] = useState(channels[0].name)

  return (
    <section className="bg-gray-900 rounded-lg p-6 shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-white">Live TV</h2>
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          {channels.map((channel) => (
            <TabsTrigger key={channel.id} value={channel.name} className="data-[state=active]:bg-blue-600">
              {channel.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {channels.map((channel) => (
          <TabsContent key={channel.id} value={channel.name} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <VideoPlayer url={channel.url} />
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  {channel.logo && (
                    <Image
                      src={channel.logo}
                      alt={channel.name}
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                  )}
                  <div>
                    <h3 className="text-2xl font-bold text-white">{channel.name}</h3>
                    <p className="text-blue-400">{channel.currentShow}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-gray-300">
                  <span className="flex items-center">
                    <PlayCircle className="w-5 h-5 mr-2 text-blue-400" />
                    {channel.viewers} viewers
                  </span>
                  <span className="flex items-center">
                    <ThumbsUp className="w-5 h-5 mr-2 text-blue-400" />
                    {channel.likes} likes
                  </span>
                </div>
                <p className="text-gray-400">
                  Enjoy the best of {channel.name} with our high-quality live stream. Never miss your favorite shows again!
                </p>
                <div className="flex space-x-4">
                  <Button className="bg-blue-600 hover:bg-blue-700">Add to Favorites</Button>
                  <Button variant="outline">Share</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}

