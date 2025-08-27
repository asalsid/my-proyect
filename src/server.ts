import express from 'express';
import http from 'http';
import path from 'path'; 
import { Server as SocketIOServer } from 'socket.io';

interface ServiceTocken {
  alt: string;
  path: string;
  position: { x: number; y: number };
}

interface MovePayload {
  id: string;
  x: number;
  y: number;
}

const PORT = process.env['PORT'] || 3000;
// const browserDistFolder = path.join(import.meta.dirname, '../dist/my-proyect/browser');

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"]
  }
});

let positions: Record<string, ServiceTocken> = {};

app.use(express.static('src'));

io.on('connection', (socket: import('socket.io').Socket) => {
  console.log('A user connected:', socket.id);
  socket.emit('init', positions as Record<string, ServiceTocken>);

  socket.on('add', ({ id, alt, path, position }) => {
    if (!positions[id]) {
      positions[id] = { alt, path, position };
      socket.broadcast.emit('add', id, positions[id]);
    }
  });

  socket.on('move', ({ id, x, y }: MovePayload) => {
    if (positions[id]) {
      positions[id].position = { x, y };
      socket.broadcast.emit('move', { id, x, y });
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

// app.use(express.static(browserDistFolder));

// app.get(':splat', (req, res) => {
//   res.sendFile(path.join(browserDistFolder, 'index.html'));
// });

server.listen(PORT, () => {
  console.log(`Socket.IO server running on http://localhost:${PORT}`);
});
