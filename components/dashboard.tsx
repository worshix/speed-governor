"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { VehicleMap } from "@/components/vehicle-map"
import { MapPin, Clock, AlertTriangle, Gauge } from "lucide-react"
import useVehicleWebSocket from "@/hooks/use-vehicle-ws"
import { useEffect, useRef, useState } from "react"

// -17.828208524807525, 31.022180836051778
const DEFAULT_COORDS = { latitude: -17.828208524807525, longitude: 31.022180836051778, speed: 0 } // User default, speed 0
const SPEED_LIMIT = 60 // km/h

export function Dashboard() {
  const { data } = useVehicleWebSocket("ws://localhost:4000")
  const [lastUpdate, setLastUpdate] = useState<string>("-")
  const [logData, setLogData] = useState({ ...DEFAULT_COORDS })
  const [locationName, setLocationName] = useState<string>("");
  const lastSent = useRef<number>(0)

  useEffect(() => {
    if (data) {
      setLogData(data)
      setLastUpdate(new Date().toLocaleTimeString())
    }
  }, [data])

  // Fetch location name when coordinates change
  useEffect(() => {
    if (logData.latitude && logData.longitude) {
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${logData.latitude}&lon=${logData.longitude}`)
        .then(res => res.json())
        .then(data => setLocationName(data.display_name || ""));
    }
  }, [logData.latitude, logData.longitude]);

  // Send log to API every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (logData.latitude && logData.longitude && logData.speed) {
        fetch("/api/logs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(logData),
        })
        lastSent.current = Date.now()
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [logData])

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Vehicle Dashboard</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>Last update: {lastUpdate}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Speed Gauge */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Gauge className="h-5 w-5" />
              <span>Current Speed</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-full flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">0 km/h</span>
                <span className="text-sm text-gray-600">{SPEED_LIMIT} km/h</span>
              </div>
              <Progress value={Math.min((logData.speed / SPEED_LIMIT) * 100, 100)} className="h-4" />
              <div className="text-2xl font-bold text-center mt-2">{logData.speed.toFixed(1)} km/h</div>
            </div>
          </CardContent>
        </Card>

        {/* Map */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Vehicle Location</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <VehicleMap latitude={data?.latitude ?? logData.latitude} longitude={data?.longitude ?? logData.longitude} />
          </CardContent>
        </Card>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Current Location</p>
                <p className="text-xs text-gray-500 mb-1">{logData.latitude.toFixed(5)}, {logData.longitude.toFixed(5)}</p>
                <p className="text-lg font-semibold truncate max-w-xs">{locationName || '...'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Gauge className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Speed Limit</p>
                <p className="text-lg font-semibold">{SPEED_LIMIT} km/h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className={`h-8 w-8 ${logData.speed > SPEED_LIMIT ? "text-red-600" : "text-green-600"}`} />
              <div>
                <p className="text-sm font-medium text-gray-600">Status</p>
                <p className={`text-lg font-semibold ${logData.speed > SPEED_LIMIT ? "text-red-600" : "text-green-600"}`}>
                  {logData.speed > SPEED_LIMIT ? "Over Limit" : "Within Limit"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
