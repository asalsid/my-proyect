import { Component, output, signal } from '@angular/core';
import { Tocken } from '../../pitch/tocken/tocken';

@Component({
  selector: 'app-addTocken',
  imports: [],
  templateUrl: './addTocken.html',
  styleUrl: './addTocken.css'
})
export class AddTocken {
  tockens: Tocken[] = [{
    path: 'terrain/barrier-1.png',
    alt: 'Barrier 1',
    position: { x: 100, y: 100 }
  }, {
    path: 'terrain/barrier-2.png',
    alt: 'Barrier 2',
    position: { x: 200, y: 100 }
  }, {
    path: 'terrain/barrier-3.png',
    alt: 'Barrier 3',
    position: { x: 300, y: 100 }
  }, {
    path: 'terrain/barrier-4.png',
    alt: 'Barrier 4',
    position: { x: 400, y: 100 }
  }];

  selectedTockens = signal<Tocken[]>([]);
  retrivingTockens = output<Tocken[]>();
  visibility = output<boolean>();

  get tockenRows() {
    const rows = [];
    for (let i = 0; i < 4; i++) {
      rows.push(this.tockens.slice(i * 4, i * 4 + 4));
    }
    return rows;
  }

  selectTocken(tocken: Tocken) {
    this.selectedTockens.update(tokens =>  [...tokens, tocken]);
  }

  closeDialog() {
    this.retrivingTockens.emit(this.selectedTockens());
    this.visibility.emit(false);
  }
}
