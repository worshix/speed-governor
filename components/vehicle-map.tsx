"use client"

import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import {useEffect, useState} from 'react'
// Custom icon for the marker

// Move L import and icon creation inside the dynamic import to avoid SSR errors


interface VehicleMapProps {
  latitude: number;
  longitude: number;
}


const Map = dynamic(
  () => import('react-leaflet').then(async mod => {
    // Import leaflet only on client
    const L = (await import('leaflet')).default;
    const vehicleIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      shadowSize: [41, 41]
    });
    const { MapContainer, TileLayer, Marker, Popup } = mod;
    return function MapComponent({ latitude, longitude }: VehicleMapProps) {
      const { MapContainer, TileLayer, Marker, Popup, useMap } = mod;
      function Recenter({ lat, lng }: { lat: number; lng: number }) {
        const map = useMap();
        useEffect(() => {
          map.setView([lat, lng]);
        }, [lat, lng, map]);
        return null;
      }
      return (
        <MapContainer
          center={[latitude, longitude] as [number, number]}
          zoom={15}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Recenter lat={latitude} lng={longitude} />
          <Marker position={[latitude, longitude] as [number, number]} icon={vehicleIcon}>
            <Popup>
              Vehicle Location<br />
              Lat: {latitude.toFixed(5)}<br />
              Lng: {longitude.toFixed(5)}
            </Popup>
          </Marker>
        </MapContainer>
      );
    };
  }),
  { ssr: false }
);

export function VehicleMap({ latitude, longitude }: VehicleMapProps) {
  return (
    <div className="relative w-full h-64 rounded-lg overflow-hidden">
      <Map latitude={latitude} longitude={longitude} />
    </div>
  );
}
