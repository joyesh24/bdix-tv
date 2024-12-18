'use client'

import Link from 'next/link'
import { Menu, Share2, Bookmark, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-purple-900 py-4 px-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="text-white hover:text-blue-300">
          <Menu className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" className="text-white hover:text-blue-300">
          <svg 
            viewBox="0 0 24 24" 
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </Button>
      </div>
      <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-red-400">BDIX IPTV HUB</h1>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="text-white hover:text-blue-300">
          <Share2 className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" className="text-white hover:text-blue-300">
          <Bookmark className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" className="text-white hover:text-blue-300">
          <MoreVertical className="h-6 w-6" />
        </Button>
      </div>
    </header>
  )
}

