import { Component, signal, output } from '@angular/core';
import { Pitch } from './pitch/pitch';
import { Menu } from './menu/menu';
import { AddTocken } from './menu/addToken/addTocken';
import { Tocken } from './pitch/tocken/tocken';

@Component({
  selector: 'app-table',
  imports: [Pitch, Menu, AddTocken],
  templateUrl: './table.html',
  styleUrl: './table.css'
})
export class Table {
  isAddTockenVisible = signal(false);
  tockens = signal<Tocken[]>([]);

  onRetrivingTockens(newTockens: Tocken[]) {
    this.tockens.update(tockens => [...tockens, ...newTockens]);
  }
}
