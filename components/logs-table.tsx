"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data - you'll replace this with your actual log data
const mockLogs = [
  {
    id: 1,
    time: "14:30:25",
    date: "2024-01-15",
    location: "Main Street, Downtown",
    speed: 75,
    speedLimit: 60,
  },
  {
    id: 2,
    time: "14:29:45",
    date: "2024-01-15",
    location: "Oak Avenue, Midtown",
    speed: 45,
    speedLimit: 50,
  },
  {
    id: 3,
    time: "14:28:12",
    date: "2024-01-15",
    location: "Highway 101, North",
    speed: 95,
    speedLimit: 80,
  },
  {
    id: 4,
    time: "14:27:33",
    date: "2024-01-15",
    location: "Park Road, Central",
    speed: 35,
    speedLimit: 40,
  },
  {
    id: 5,
    time: "14:26:58",
    date: "2024-01-15",
    location: "School Zone, East",
    speed: 25,
    speedLimit: 25,
  },
  {
    id: 6,
    time: "14:25:41",
    date: "2024-01-15",
    location: "Industrial Blvd, West",
    speed: 88,
    speedLimit: 70,
  },
  {
    id: 7,
    time: "14:24:19",
    date: "2024-01-15",
    location: "Residential Ave, South",
    speed: 42,
    speedLimit: 45,
  },
  {
    id: 8,
    time: "14:23:07",
    date: "2024-01-15",
    location: "Business District, Center",
    speed: 55,
    speedLimit: 50,
  },
]

export function LogsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Speed Monitoring Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Speed (km/h)</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLogs.map((log) => {
                const isOverLimit = log.speed > log.speedLimit
                return (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono">{log.time}</TableCell>
                    <TableCell>{log.date}</TableCell>
                    <TableCell>{log.location}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className={isOverLimit ? "text-red-600 font-semibold" : "text-gray-900"}>
                          {log.speed}
                        </span>
                        <span className="text-gray-500 text-sm">/ {log.speedLimit}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={isOverLimit ? "destructive" : "secondary"}
                        className={isOverLimit ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}
                      >
                        {isOverLimit ? "Over Limit" : "Within Limit"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
