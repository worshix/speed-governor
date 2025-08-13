'use client';

import { useEffect, useRef, useState } from 'react';

export default function useVehicleWebSocket(url: string) {
  const ws = useRef<WebSocket | null>(null);
  const [data, setData] = useState<{
    latitude: number;
    longitude: number;
    speed: number; // km/hr
  } | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(url);
    ws.current.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (
          typeof msg.latitude === 'number' &&
          typeof msg.longitude === 'number' &&
          typeof msg.speed === 'number'
        ) {
          setData({
            latitude: msg.latitude,
            longitude: msg.longitude,
            speed: msg.speed / 1000, // convert m/hr to km/hr
          });
        }
      } catch {}
    };
    return () => {
      ws.current?.close();
    };
  }, [url]);

  // For sending data to the websocket
  const send = (payload: any) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(payload));
    }
  };

  return { data, send };
}
