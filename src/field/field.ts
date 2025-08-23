import { Component, signal, output } from '@angular/core';
import { Pitch } from './pitch/pitch';
import { Menu } from './menu/menu';
import { AddTocken } from './menu/addToken/addTocken';
import { Tocken } from './pitch/tocken/tocken';

@Component({
  selector: 'app-field',
  imports: [Pitch, Menu, AddTocken],
  templateUrl: './field.html',
  styleUrl: './field.css'
})
export class Field {
  isAddTockenVisible = signal(false);
  tockens = signal<Tocken[]>([]);

  onRetrivingTockens(newTockens: Tocken[]) {
    this.tockens.update(tockens => [...tockens, ...newTockens]);
  }
}
