import { Component, effect, input, signal } from '@angular/core';
import { SocketService } from '../../../socket.service';
import { NgStyle } from '@angular/common';

export interface Tocken {
  alt: string;
  path: string;
  position: { x: number; y: number };
}

@Component({
  selector: 'app-tocken',
  imports: [NgStyle],
  templateUrl: './tocken.html',
  styleUrl: './tocken.css'
})
export class TockenComponent {
  id = input<number>(0);
  tocken = input<Tocken>({
    alt: '',
    path: '',
    position: { x: 0, y: 0 }
  });
  x = signal(0);
  y = signal(0);

  dragging = signal(false);
  private offset = { x: 0, y: 0 };

  constructor(private socket: SocketService) {
    effect(() => {
      const pos = this.socket.positions()[this.id()];
      if (pos && pos.x !== 0 && pos.y !== 0) {
        this.x.set(pos.x);
        this.y.set(pos.y);
      } else if (this.tocken() && this.tocken().position) {
        this.x.set(this.tocken().position.x);
        this.y.set(this.tocken().position.y);
      }
    });
  }

  startDrag(event: MouseEvent) {
    this.dragging.set(true);
    this.offset.x = event.clientX - this.x();
    this.offset.y = event.clientY - this.y();
    
    if (typeof window !== 'undefined') {
      document.onmousemove = (e) => this.onDrag(e);
      document.onmouseup = () => this.stopDrag();
    }
  }

  onDrag(event: MouseEvent) {
    if (this.dragging()) {
      this.x.set(event.clientX - this.offset.x);
      this.y.set(event.clientY - this.offset.y);
      this.socket.moveComponent(this.id(), this.x(), this.y());
    }
  }

  stopDrag() {
    this.dragging.set(false);
    if (typeof window !== 'undefined') {
      document.onmousemove = null;
      document.onmouseup = null;
    }
  }
}
