import { Injectable, signal } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket: Socket;
  positions = signal<{ [id: number]: { x: number, y: number } }>({});

  constructor() {
    this.socket = io('http://localhost:3000');
    this.socket.on('init', (data) => this.positions.set(data));
    this.socket.on('move', ({ id, x, y }) => {
      this.positions.update(pos => ({ ...pos, [id]: { x, y } }));
    });
  }

  moveComponent(id: number, x: number, y: number) {
    this.socket.emit('move', { id, x, y });
  }
}