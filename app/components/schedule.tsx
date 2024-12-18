import { Card, CardContent } from '@/components/ui/card'

const scheduleData = [
  { id: 1, time: "08:00 AM", show: "Morning News", channel: "News 24/7" },
  { id: 2, time: "10:00 AM", show: "Cooking with Chef John", channel: "Lifestyle TV" },
  { id: 3, time: "12:00 PM", show: "Midday Sports Update", channel: "Sports Zone" },
  { id: 4, time: "02:00 PM", show: "Adventure Time", channel: "Kids Fun" },
  { id: 5, time: "04:00 PM", show: "Classic Movies Marathon", channel: "Movie Central" },
  { id: 6, time: "06:00 PM", show: "Evening News", channel: "News 24/7" },
]

export default function Schedule() {
  return (
    <div className="grid gap-4">
      {scheduleData.map((item) => (
        <Card key={item.id} className="bg-gray-800 hover:bg-gray-700 transition-colors">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-blue-400 font-semibold">{item.time}</span>
              <div>
                <h4 className="font-semibold">{item.show}</h4>
                <p className="text-sm text-gray-400">{item.channel}</p>
              </div>
            </div>
            <button className="text-blue-400 hover:text-blue-300 transition-colors">
              Set Reminder
            </button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

