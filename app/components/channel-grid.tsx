'use client'

import Image from 'next/image'
import { useState } from 'react'
import VideoPlayer from './video-player'
import { toast } from 'react-hot-toast'
import { Tv } from 'lucide-react'

const channels = [
  {
    id: 'sony-yay',
    name: 'Sony YAY!',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/channels4_profile.jpg-FhqK2IsbMoQVZbVCHAUNVcN6UpTKx8.jpeg',
  },
  {
    id: 'sony-aath',
    name: 'Sony Aath',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AathLogo-WLc56RI0ZddKdMkFDNNLOomCcQ9jNu.png',
  },
  {
    id: 'sony-max',
    name: 'Sony MAX',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/সনি_ম্যাক্সের_নতুন_রূপে_লোগো-A9rPPCY6lMvrVgWfROUxLmtoQSFM7s.png',
  },
  {
    id: 'sony-pix',
    name: 'Sony PIX',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sony_Pix_new-Wm2YStQwTNJ7NRCnmJcNjTgc9dtnDB.png',
  },
  {
    id: 'discovery-bangla',
    name: 'Discovery Bangla',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/discovery-2ZPx0Do0bci72JYRx3kIFz3oXRb3MM.png',
  },
]

export default function ChannelGrid() {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null)
  const [streamUrl, setStreamUrl] = useState<string | null>(null)

  const handleChannelClick = async (channelId: string) => {
    try {
      const response = await fetch(`/api/stream/${channelId}`)
    
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    
      const data = await response.json()

      if (!data.url) {
        throw new Error('No stream URL returned from server')
      }
    
      setStreamUrl(data.url)
      setSelectedChannel(channelId)
      
      const channel = channels.find(c => c.id === channelId)
      toast.success(
        <div className="flex items-center gap-2">
          <Tv className="w-5 h-5" />
          <div>
            <p className="font-medium">{channel?.name}</p>
            <p className="text-sm text-muted-foreground">Channel loaded successfully! Enjoy watching.</p>
          </div>
        </div>,
        {
          duration: 3000,
          style: {
            background: 'linear-gradient(to right, #1e40af, #3b82f6)',
            color: 'white',
            padding: '16px',
          },
        }
      )
    } catch (error) {
      console.error('Error fetching stream URL:', error)
      toast.error(
        <div className="flex items-center gap-2">
          <Tv className="w-5 h-5" />
          <div>
            <p className="font-medium">Channel Error</p>
            <p className="text-sm">Unable to load channel. Please try again.</p>
          </div>
        </div>,
        {
          duration: 3000,
        }
      )
    }
  }

  return (
    <div className="space-y-8">
      {selectedChannel && streamUrl && (
        <div className="mb-8">
          <VideoPlayer url={streamUrl} />
        </div>
      )}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {channels.map((channel) => (
          <button
            key={channel.id}
            onClick={() => handleChannelClick(channel.id)}
            className={`relative aspect-square rounded-lg overflow-hidden border-4 ${
              selectedChannel === channel.id ? 'border-red-600 shadow-lg shadow-red-600/20' : 'border-blue-400'
            } hover:border-red-600 hover:shadow-lg hover:shadow-red-600/20 transition-all duration-300 bg-black/50`}
          >
            <Image
              src={channel.logo}
              alt={channel.name}
              fill
              className="object-contain p-2"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

