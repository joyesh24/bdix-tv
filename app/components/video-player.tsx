'use client'

import { useState, useRef, useEffect } from 'react'
import Hls from 'hls.js'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, RotateCcw, RotateCw, Loader2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { toast } from 'react-hot-toast'

interface VideoPlayerProps {
  url: string
}

export default function VideoPlayer({ url }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [volume, setVolume] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [qualities, setQualities] = useState<{ height: number; bitrate: number }[]>([])
  const [currentQuality, setCurrentQuality] = useState<number>(-1)
  const [audioTracks, setAudioTracks] = useState<{ id: number; name: string }[]>([])
  const [currentAudioTrack, setCurrentAudioTrack] = useState<number>(-1)
  const videoRef = useRef<HTMLVideoElement>(null)
  const hlsRef = useRef<Hls | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    setIsLoading(true)

    if (Hls.isSupported()) {
      const hls = new Hls({
        maxBufferSize: 0,
        maxBufferLength: 30,
        liveSyncDuration: 3,
        liveMaxLatencyDuration: 10,
        liveDurationInfinity: true,
        highBufferWatchdogPeriod: 2,
        enableWorker: true,
      })

      hlsRef.current = hls

      hls.loadSource(url)
      hls.attachMedia(video)

      hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
        const availableQualities = data.levels.map((level, index) => ({
          height: level.height,
          bitrate: level.bitrate,
          index: index,
        }))
        setQualities(availableQualities)
        setCurrentQuality(hls.currentLevel)
        setIsLoading(false)
        video.play().catch(() => setIsPlaying(false))
      })

      hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
        setCurrentQuality(data.level)
      })

      hls.on(Hls.Events.AUDIO_TRACK_LOADED, () => {
        const audioTracksAvailable = hls.audioTracks.map((track, index) => ({
          id: index,
          name: track.name || `Audio ${index + 1}`,
        }))
        setAudioTracks(audioTracksAvailable)
        setCurrentAudioTrack(hls.audioTrack)
      })

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.log('Network error, trying to recover...')
              hls.startLoad()
              break
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.log('Media error, trying to recover...')
              hls.recoverMediaError()
              break
            default:
              console.log('Unrecoverable error, destroying HLS instance...')
              hls.destroy()
              break
          }
        }
      })

      return () => {
        hls.destroy()
      }
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url
      video.addEventListener('loadedmetadata', () => {
        setIsLoading(false)
        video.play().catch(() => setIsPlaying(false))
      })
    }
  }, [url])

  const handlePlayPause = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleVolumeChange = (newVolume: number[]) => {
    const video = videoRef.current
    if (!video) return

    const volumeValue = newVolume[0]
    video.volume = volumeValue
    setVolume(volumeValue)
  }

  const handleSeek = (newTime: number[]) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = newTime[0]
  }

  const handleQualityChange = (qualityIndex: number) => {
    const hls = hlsRef.current
    if (!hls) return

    hls.currentLevel = qualityIndex
    setCurrentQuality(qualityIndex)
    toast.success(`Quality changed to ${qualities[qualityIndex].height}p`)
  }

  const handleAudioTrackChange = (trackId: number) => {
    const hls = hlsRef.current
    if (!hls) return

    hls.audioTrack = trackId
    setCurrentAudioTrack(trackId)
    toast.success(`Audio track changed to ${audioTracks[trackId].name}`)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const formatBitrate = (bitrate: number) => {
    return `${(bitrate / 1000000).toFixed(2)} Mbps`
  }

  return (
    <div className="relative bg-black rounded-lg overflow-hidden shadow-xl">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <Loader2 className="w-12 h-12 text-white animate-spin" />
        </div>
      )}
      <video
        ref={videoRef}
        className="w-full aspect-video"
        onClick={handlePlayPause}
        onTimeUpdate={() => {
          setDuration(videoRef.current?.duration || 0);
          setCurrentTime(videoRef.current?.currentTime || 0);
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
        <Slider
          value={[currentTime]}
          max={duration}
          step={1}
          onValueChange={handleSeek}
          className="mb-4"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={handlePlayPause} className="text-white hover:text-blue-400 transition-colors">
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleSeek([Math.max(currentTime - 10, 0)])} className="text-white hover:text-blue-400 transition-colors">
              <RotateCcw className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleSeek([Math.min(currentTime + 10, duration)])} className="text-white hover:text-blue-400 transition-colors">
              <RotateCw className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleVolumeChange([volume === 0 ? 1 : 0])}
                className="text-white hover:text-blue-400 transition-colors"
              >
                {volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
              <Slider
                value={[volume]}
                max={1}
                step={0.1}
                onValueChange={handleVolumeChange}
                className="w-24"
              />
            </div>
            <span className="text-sm text-white">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:text-blue-400 transition-colors">
                  <Settings className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem disabled className="text-sm font-semibold">
                  Quality
                </DropdownMenuItem>
                {qualities.map((quality, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => handleQualityChange(index)}
                    className={currentQuality === index ? 'bg-accent' : ''}
                  >
                    {quality.height}p ({formatBitrate(quality.bitrate)})
                  </DropdownMenuItem>
                ))}
                {audioTracks.length > 0 && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem disabled className="text-sm font-semibold">
                      Audio Track
                    </DropdownMenuItem>
                    {audioTracks.map((track) => (
                      <DropdownMenuItem
                        key={track.id}
                        onClick={() => handleAudioTrackChange(track.id)}
                        className={currentAudioTrack === track.id ? 'bg-accent' : ''}
                      >
                        {track.name}
                      </DropdownMenuItem>
                    ))}
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => {
                const video = videoRef.current
                if (!video) return

                if (document.fullscreenElement) {
                  document.exitFullscreen()
                } else {
                  video.requestFullscreen()
                }
              }}
              className="text-white hover:text-blue-400 transition-colors"
            >
              <Maximize className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

