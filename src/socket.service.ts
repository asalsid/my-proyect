import { Injectable, signal } from '@angular/core';
import { io, Socket } from 'socket.io-client';

interface ServiceTocken {
  alt: string;
  path: string;
  position: { x: number; y: number };
}

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket: Socket;
  positions = signal<{ [id: number]: ServiceTocken }>({});

  constructor() {
    this.socket = io('http://localhost:3000');
    this.socket.on('init', (data) => this.positions.set(data));
    this.socket.on('add', (id: number, tocken: ServiceTocken) => {
      console.log('Cargo', id);
      this.positions.update(pos => ({ ...pos, [id]: tocken }));
    });
    this.socket.on('move', ({ id, x, y }) => {
      this.positions.update(pos => {
        const tocken = pos[id];
        if (tocken) {
          return { ...pos, [id]: { ...tocken, position: { x, y } } };
        }
        return pos;
      });
    });
  }

  addComponent(id: number, tocken: ServiceTocken) {
    console.log('Me llega el add');
    this.socket.emit('add', { id, ...tocken });
  }

  moveComponent(id: number, x: number, y: number) {
    this.socket.emit('move', { id, x, y });
  }
}