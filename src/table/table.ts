import { Component, signal, effect } from '@angular/core';
import { Menu } from './menu/menu';
import { AddTocken } from './menu/addToken/addTocken';
import { Tocken, TockenComponent } from './tocken/tocken';
import { ActionBar } from './action-bar/action-bar';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-table',
  imports: [Menu, TockenComponent, AddTocken, ActionBar],
  templateUrl: './table.html',
  styleUrl: './table.css'
})
export class Table {
  pitch = signal({path: 'pitches/grass.jpg', alt: 'Grass Pitch'});
  tockens = signal<Tocken[]>([]);
  
  isAddTockenVisible = signal(false);
  selected = signal<number>(-1);

  constructor(private socket: SocketService) {
    effect(() => {
      const pos = this.socket.positions();

      this.tockens().forEach((tocken, index) => {
        if (!pos[index]) {
          this.socket.addComponent(index, tocken);
        }
      });

      const posIds = Object.keys(pos).map(id => Number(id));
      posIds.forEach(id => {
        if (!this.tockens()[id]) {
          this.tockens.update(tockens => [...tockens, pos[id]]);
        }
      });
    });
  }

  onRetrivingTockens(newTockens: Tocken[]) {
    this.tockens.update(tockens => [...tockens, ...newTockens]);
  }
}
