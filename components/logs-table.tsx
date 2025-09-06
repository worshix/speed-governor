"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"


import { useEffect, useState } from 'react';

type Log = {
  id: number;
  latitude: number;
  longitude: number;
  speed: number;
  createdAt: string;
};


export function LogsTable() {
  const [logs, setLogs] = useState<Log[]>([]);
  const SPEED_LIMIT = 30;

  useEffect(() => {
    const fetchLogs = () => {
      fetch('/api/logs')
        .then((res) => res.json())
        .then((data) => setLogs(data));
    };

    fetchLogs();
    const interval = setInterval(fetchLogs, 2000);

    return () => clearInterval(interval);
  }, []);

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
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Latitude</TableHead>
                <TableHead>Longitude</TableHead>
                <TableHead>Speed (m/s)</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => {
                const dateObj = new Date(log.createdAt);
                const date = dateObj.toLocaleDateString();
                const time = dateObj.toLocaleTimeString();
                const isOverLimit = log.speed > SPEED_LIMIT;
                return (
                  <TableRow key={log.id}>
                    <TableCell>{date}</TableCell>
                    <TableCell className="font-mono">{time}</TableCell>
                    <TableCell>{log.latitude.toFixed(5)}</TableCell>
                    <TableCell>{log.longitude.toFixed(5)}</TableCell>
                    <TableCell>
                      <span className={isOverLimit ? "text-red-600 font-semibold" : "text-gray-900"}>
                        {log.speed}
                      </span>
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
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
