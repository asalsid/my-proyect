import express from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';

interface ServiceTocken {
  alt: string;
  path: string;
  position: { x: number; y: number };
}

const PORT = process.env['PORT'] || 3000;
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

let positions: Record<number, ServiceTocken> = {};

app.use(express.static('src'));

wss.on('connection', (ws: WebSocket) => {
  console.log('A user connected');
  ws.send(JSON.stringify({ type: 'init', data: positions }));

  ws.on('message', (message) => {
    try {
      const msg = JSON.parse(message.toString());
      if (msg.type === 'add') {
        const { id, alt, path, position } = msg;
        if (!positions[id]) {
          positions[id] = { alt, path, position };
          wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ type: 'add', id, tocken: positions[id] }));
            }
          });
        }
      } else if (msg.type === 'move') {
        const { id, x, y } = msg;
        if (positions[id]) {
          positions[id].position = { x, y };
          wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ type: 'move', id, x, y }));
            }
          });
        }
      }
    } catch (err) {
      console.error('Error parsing message', err);
    }
  });

  ws.on('close', () => {
    console.log('A user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`WebSocket server running on http://localhost:${PORT}`);
});
