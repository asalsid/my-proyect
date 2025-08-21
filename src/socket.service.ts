import { Injectable, signal } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket: Socket;
  positions = signal<{ [id: string]: { x: string, y: string } }>({});

  constructor() {
    this.socket = io('http://localhost:3000');
    this.socket.on('init', (data) => this.positions.set(data));
    this.socket.on('move', ({ id, x, y }) => {
      this.positions.update(pos => ({ ...pos, [id]: { x, y } }));
    });
  }

  moveComponent(id: string, x: string, y: string) {
    this.socket.emit('move', { id, x, y });
  }
}