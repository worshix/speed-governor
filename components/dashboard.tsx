"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SpeedGauge } from "@/components/speed-gauge"
import { VehicleMap } from "@/components/vehicle-map"
import { MapPin, Clock, AlertTriangle, Gauge } from "lucide-react"

export function Dashboard() {
  // Mock data - you'll replace this with your MQTT data
  const currentSpeed = 75 // km/h
  const speedLimit = 60 // km/h
  const location = "Main Street, Downtown"
  const lastUpdate = "2 seconds ago"

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
            <SpeedGauge currentSpeed={currentSpeed} speedLimit={speedLimit} />
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
            <VehicleMap />
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
                <p className="text-lg font-semibold">{location}</p>
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
                <p className="text-lg font-semibold">{speedLimit} km/h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className={`h-8 w-8 ${currentSpeed > speedLimit ? "text-red-600" : "text-green-600"}`} />
              <div>
                <p className="text-sm font-medium text-gray-600">Status</p>
                <p className={`text-lg font-semibold ${currentSpeed > speedLimit ? "text-red-600" : "text-green-600"}`}>
                  {currentSpeed > speedLimit ? "Over Limit" : "Within Limit"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
