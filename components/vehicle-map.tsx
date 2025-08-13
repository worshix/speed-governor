"use client"

import { MapPin } from "lucide-react"

export function VehicleMap() {
  return (
    <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
      {/* Map placeholder - you'll integrate your actual map here */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
        {/* Grid pattern to simulate map */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 grid-rows-6 h-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-gray-300"></div>
            ))}
          </div>
        </div>

        {/* Roads simulation */}
        <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-400 transform -translate-y-1/2"></div>
        <div className="absolute top-0 bottom-0 left-1/3 w-2 bg-gray-400"></div>

        {/* Vehicle marker */}
        <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <MapPin className="h-8 w-8 text-red-600 drop-shadow-lg" />
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              Vehicle Location
            </div>
          </div>
        </div>

        {/* Coordinates display */}
        <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 px-3 py-2 rounded-lg shadow">
          <div className="text-sm font-medium text-gray-900">GPS Coordinates</div>
          <div className="text-xs text-gray-600">Lat: 40.7128° N</div>
          <div className="text-xs text-gray-600">Lng: 74.0060° W</div>
        </div>
      </div>

      {/* Map controls placeholder */}
      <div className="absolute top-4 right-4 space-y-2">
        <button className="bg-white shadow-md rounded p-2 hover:bg-gray-50">
          <span className="text-lg">+</span>
        </button>
        <button className="bg-white shadow-md rounded p-2 hover:bg-gray-50">
          <span className="text-lg">−</span>
        </button>
      </div>
    </div>
  )
}
