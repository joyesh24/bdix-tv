import { NextResponse } from 'next/server'

const STREAM_URLS: { [key: string]: string } = {
  'sony-yay': 'https://cdn-toffee.iptvbd.xyz/live.php?id=57bd9c2493c1&e=.m3u8',
  'sony-aath': 'https://cdn-toffee.iptvbd.xyz/live.php?id=7e00fee81848&e=.m3u8',
  'sony-max': 'https://cdn-toffee.iptvbd.xyz/live.php?id=b6192dbff21b&e=.m3u8',
  'sony-pix': 'https://cdn-toffee.iptvbd.xyz/live.php?id=ea02096b0fbc&e=.m3u8',
  'discovery-bangla': 'https://varun-iptv.netlify.app/m3u/discoverybengali.m3u8',
}

export async function GET(
  request: Request,
  { params }: { params: { channelId: string } }
) {
  try {
    const channelId = params.channelId
    const streamUrl = STREAM_URLS[channelId]
    
    if (!streamUrl) {
      return new NextResponse('Channel not found', { status: 404 })
    }

    return NextResponse.json({ url: streamUrl })
  } catch (error) {
    console.error('Stream API error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

