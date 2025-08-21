import { Component, effect, Input, signal } from '@angular/core';
import { SocketService } from '../../socket.service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-tocken',
  imports: [NgStyle],
  templateUrl: './tocken.html',
  styleUrl: './tocken.css'
})
export class Tocken {
  @Input() id!: string;
  x = signal('50px');
  y = signal('50px');
  isTocken = signal(true);
  private dragging = false;
  private offset = { x: 0, y: 0 };

  constructor(private socket: SocketService) {
    effect(() => {
      const pos = this.socket.positions()[this.id];
      if (pos) {
        this.x.set(pos.x);
        this.y.set(pos.y);
      }
    });
  }

  startDrag(event: MouseEvent) {
    this.dragging = true;
    this.offset.x = event.clientX - parseInt(this.x());
    this.offset.y = event.clientY - parseInt(this.y());
    if (typeof window !== 'undefined') {
      document.onmousemove = (e) => this.onDrag(e);
      document.onmouseup = () => this.stopDrag();
    }
  }

  onDrag(event: MouseEvent) {
    if (this.dragging) {
      const newX = (event.clientX - this.offset.x) + 'px';
      const newY = (event.clientY - this.offset.y) + 'px';
      this.x.set(newX);
      this.y.set(newY);
      this.socket.moveComponent(this.id, newX, newY);
    }
  }

  stopDrag() {
    this.dragging = false;
    if (typeof window !== 'undefined') {
      document.onmousemove = null;
      document.onmouseup = null;
    }
  }
}
