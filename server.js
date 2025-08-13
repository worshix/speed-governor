// Simple WebSocket server for receiving and broadcasting vehicle data
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 4000 });

let latestData = null;

wss.on('connection', function connection(ws) {
  // Send latest data to new client
  if (latestData) ws.send(JSON.stringify(latestData));

  ws.on('message', function incoming(message) {
    try {
      const data = JSON.parse(message);
      // Validate data
      if (
        typeof data.latitude === 'number' &&
        typeof data.longitude === 'number' &&
        typeof data.speed === 'number'
      ) {
        latestData = data;
        // Broadcast to all clients
        wss.clients.forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
          }
        });
      }
    } catch (e) {
      // Ignore invalid JSON
    }
  });
});

console.log('WebSocket server running on ws://localhost:4000');
