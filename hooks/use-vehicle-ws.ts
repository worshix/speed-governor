'use client';

import { useEffect, useRef, useState } from 'react';

export default function useVehicleWebSocket(url: string) {
  const ws = useRef<WebSocket | null>(null);
  const [data, setData] = useState<{
    latitude: number;
    longitude: number;
    speed: number; // m/s
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
            speed: msg.speed, // speed is already in m/s
          });
        }
      } catch {}
    };
    return () => {
      ws.current?.close();
    };
  }, [url]);

  // For sending data to the websocket
  const send = (payload: Record<string, unknown>) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(payload));
    }
  };

  return { data, send };
}
