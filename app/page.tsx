import Header from './components/header'
import ChannelGrid from './components/channel-grid'
import { Suspense } from 'react'
import { Toaster } from 'react-hot-toast'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-red-900 text-white">
      <Toaster position="top-center" />
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-red-400">ALL CHANNELS</h1>
        <section className="bg-black/30 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 border-b-2 border-red-600 pb-2 inline-block">LIVE</h2>
          <Suspense fallback={<div className="text-center">Loading channels...</div>}>
            <ChannelGrid />
          </Suspense>
        </section>
        <section className="mt-12 bg-black/30 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 border-b-2 border-red-600 pb-2 inline-block">SPORTS CHANNEL</h2>
          {/* Sports channels will be added when provided */}
        </section>
      </main>
    </div>
  )
}

