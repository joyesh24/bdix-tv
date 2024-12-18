import { Card, CardContent } from '@/components/ui/card'

const categories = [
  { id: 1, name: "News", icon: "📰" },
  { id: 2, name: "Sports", icon: "⚽" },
  { id: 3, name: "Movies", icon: "🎬" },
  { id: 4, name: "Kids", icon: "🧸" },
  { id: 5, name: "Lifestyle", icon: "🏡" },
  { id: 6, name: "Music", icon: "🎵" },
  { id: 7, name: "Documentary", icon: "🌍" },
  { id: 8, name: "Comedy", icon: "😂" },
]

export default function Categories() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Card key={category.id} className="bg-gray-800 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 cursor-pointer">
          <CardContent className="p-4 flex flex-col items-center justify-center h-32">
            <span className="text-4xl mb-2">{category.icon}</span>
            <h3 className="text-lg font-semibold">{category.name}</h3>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

