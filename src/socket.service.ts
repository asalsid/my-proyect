import { Injectable, signal } from '@angular/core';


interface ServiceTocken {
  alt: string;
  path: string;
  position: { x: number; y: number };
}

@Injectable({ providedIn: 'root' })
export class SocketService {
  private ws: WebSocket;
  positions = signal<{ [id: number]: ServiceTocken }>({});

  constructor() {
    this.ws = new WebSocket('ws://localhost:3000');
    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === 'init') {
        this.positions.set(msg.data);
      } else if (msg.type === 'add') {
        const { id, tocken } = msg;
        this.positions.update(pos => ({ ...pos, [id]: tocken }));
      } else if (msg.type === 'move') {
        const { id, x, y } = msg;
        this.positions.update(pos => {
          const tocken = pos[id];
          if (tocken) {
            return { ...pos, [id]: { ...tocken, position: { x, y } } };
          }
          return pos;
        });
      }
    };
  }

  addComponent(id: number, tocken: ServiceTocken) {
    this.ws.send(JSON.stringify({ type: 'add', id, ...tocken }));
  }

  moveComponent(id: number, x: number, y: number) {
    this.ws.send(JSON.stringify({ type: 'move', id, x, y }));
  }
}