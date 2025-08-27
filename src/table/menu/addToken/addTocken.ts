import { Component, output, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Tocken } from '../../tocken/tocken';

@Component({
  selector: 'app-addTocken',
  imports: [NgOptimizedImage],
  templateUrl: './addTocken.html',
  styleUrl: './addTocken.css'
})
export class AddTocken {
  tockens: Tocken[] = [{
    path: 'widgets/burning-template.png',
    alt: 'Burning Template',
    position: { x: 100, y: 100 }
  }, {
    path: 'widgets/cover-template.png',
    alt: 'Cover Template',
    position: { x: 200, y: 100 }
  }, {
    path: 'widgets/poison-template.png',
    alt: 'Poison Template',
    position: { x: 300, y: 100 }
  }, {
    path: 'widgets/rough-ground-template.png',
    alt: 'Rough Ground Template',
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
